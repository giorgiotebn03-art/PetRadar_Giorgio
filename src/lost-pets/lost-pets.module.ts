import { Module } from '@nestjs/common';
import { LostPetsController } from './lost-pets.controller';
import { LostPetsService } from './lost-pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  
  imports: [TypeOrmModule.forFeature([LostPet]),
      EmailModule   
    ],
  controllers: [LostPetsController],
  providers: [LostPetsService]
})
export class LostPetsModule {}
