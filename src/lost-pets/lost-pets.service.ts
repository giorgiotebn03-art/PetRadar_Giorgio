import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { LostPetCDto } from 'src/core/interfaces/lost-pets.interface';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { generateLostedPetTemplate } from './templates/lost-pets.template';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { envs } from 'src/config/envs';
import { logger } from 'src/config/logger';
import Redis from 'ioredis';
import { CacheService } from 'src/cache/cache.service';

const CACHE_KEY_ALL_LOSTED = 'losted:all'

@Injectable()
export class LostPetsService {

  constructor(
    @InjectRepository(LostPet)
    private readonly lostedRepository: Repository<LostPet>,
    private readonly emailService: EmailService,
    private readonly cacheService: CacheService
  ) {}
  private readonly redis = new Redis({
    host: envs.REDIS_HOST,
    port: envs.REDIS_PORT
  })

  async getAll(): Promise<LostPet[]> {
    try {
      logger.info("[Lost-pets.service] Consultando mascotas perdidas en cache")
      const data = await this.cacheService.get<LostPet[]>(CACHE_KEY_ALL_LOSTED);

      if (data && data.length > 0) {
        logger.info("[Lost-pets.service] Mascotas encontradas en cache")
        return data;
      }

      logger.info("[Lost-pets.service] Trayendo a todas las mascotas perdidas...")
      const losts = await this.lostedRepository.find();
      logger.info("[Lost-pets.service] Guardando mascotas perdidas en cache")
      const lostsString = JSON.stringify(losts)
      this.redis.set(CACHE_KEY_ALL_LOSTED, lostsString)
      logger.info(`[Lost-pets.service] Se obtuvieron ${losts.length}`)
      return losts;
    } catch (error) {
      console.error("[Lost-pets.service] Error al traer las mascotas perdidas")
      console.error(error);
      return []
    }
  }

  async create(losted: LostPetCDto) : Promise<Boolean> {

    const newLost = this.lostedRepository.create({
      ...losted
    });
    logger.info("Creando LostPet");
    await this.lostedRepository.save(newLost);
    await this.cacheService.delete(CACHE_KEY_ALL_LOSTED);

    logger.info("Mandando correo");
    const template = generateLostedPetTemplate(losted);
    const options: EmailOptions = {
            to: envs.MAILER_EMAIL,
            subject: losted.description,
            html: template
    }

    const result = await this.emailService.sendEmail(options);
    
    return result;
  }

}