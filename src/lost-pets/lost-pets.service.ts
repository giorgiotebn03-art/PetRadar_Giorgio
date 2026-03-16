import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { LostPetCDto } from 'src/core/interfaces/lost-pets.interface';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { generateLostedPetTemplate } from './templates/lost-pets.template';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { envs } from 'src/config/envs';

@Injectable()
export class LostPetsService {

  constructor(
    @InjectRepository(LostPet)
    private readonly lostedRepository: Repository<LostPet>,
    private readonly emailService: EmailService
  ) {}

  async create(losted: LostPetCDto) : Promise<Boolean> {

    const newLost = this.lostedRepository.create({
      ...losted
    });
    await this.lostedRepository.save(newLost);

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