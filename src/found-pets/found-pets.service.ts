import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { generateFoundedPetTemplate } from './templates/found-pets.template';
import { FoundPetCDto } from 'src/core/interfaces/found-pets.interface';

@Injectable()
export class FoundPetsService {

  constructor(
    @InjectRepository(FoundPet)
    private readonly foundedRepository : Repository<FoundPet>,
    private readonly emailService: EmailService
){}

  async create(founded:FoundPetCDto) : Promise<Boolean>{
    
    const newFound = this.foundedRepository.create({
        ...founded
    });
    await this.foundedRepository.save(newFound);
    
    const template = generateFoundedPetTemplate(founded);
    const options: EmailOptions = {
        to: "soniblast7@gmail.com",
        subject: founded.description,
        html: template
    }

    const result = await this.emailService.sendEmail(options);

    return result;
  }

}