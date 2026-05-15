import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { generateFoundedPetTemplate } from './templates/found-pets.template';
import { FoundPetCDto } from 'src/core/interfaces/found-pets.interface';
import { env } from 'process';
import { envs } from 'src/config/envs';
import { logger } from 'src/config/logger';
import Redis from 'ioredis';
import { CacheService } from 'src/cache/cache.service';

const CACHE_KEY_ALL_FOUNDED = 'founded:all'

@Injectable()
export class FoundPetsService {

  constructor(
    @InjectRepository(FoundPet)
    private readonly foundedRepository : Repository<FoundPet>,
    @InjectRepository(LostPet)
    private readonly lostPetRepository : Repository<LostPet>,
    private readonly emailService: EmailService,
    private readonly cacheService : CacheService
  ){}
  private readonly redis= new Redis({
    host:envs.REDIS_HOST,
    port:envs.REDIS_PORT
  })

  async getAll(): Promise<FoundPet[]> {
    try{
      logger.info("[Found-pets.service] Consultando mascotas encontradas en cache")
      const data = await this.cacheService.get<FoundPet[]>(CACHE_KEY_ALL_FOUNDED);
      
      if (data && data.length > 0){
        logger.info("[Found-pets.service] Mascotas encontradas en cahce")
        return data;
      }
      
      logger.info("[Found-pets.service] Trayendo a todos las mascotas encontradas...")
      const founds = await this.foundedRepository.find();
      logger.info("[Found-pets.service] Guardando mascotas encontradas en cahce")
      const foundedsString = JSON.stringify(founds)
      this.redis.set(CACHE_KEY_ALL_FOUNDED, foundedsString)
      logger.info(`[Found-pets.service] Se obtuvieron ${founds.length}`)
      return founds;
    }catch(error){
        console.error("[Found-pets.service] Error al traer las mascotas encontradas")
        console.error(error);
        return []
    }
  }

  async create(founded:FoundPetCDto) : Promise<Boolean>{
    
    const newFound = this.foundedRepository.create({
        ...founded
    });
    logger.info("Creando FoundPet");
    await this.foundedRepository.save(newFound);
    await this.cacheService.delete(CACHE_KEY_ALL_FOUNDED);

    const [lng, lat] = founded.location.coordinates;
    logger.info(`[Found-pets.service] Buscando mascotas perdidas en radio de 500m desde [${lng}, ${lat}]`);
    const nearbyLostPets = await this.lostPetRepository
      .createQueryBuilder('lp')
      .where('lp.is_active = true')
      .andWhere(
        'ST_DWithin(lp.location::geography, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, 500)',
        { lng, lat },
      )
      .getMany();
    logger.info(`[Found-pets.service] Se encontraron ${nearbyLostPets.length} mascota(s) perdida(s) cercana(s)`);

    logger.info("Mandando correo");
    const template = generateFoundedPetTemplate(founded);
    const options: EmailOptions = {
        to: envs.MAILER_EMAIL,
        subject: founded.description,
        html: template
    }

    const result = await this.emailService.sendEmail(options);

    return result;
  }

}