import { Module } from '@nestjs/common';
import { FoundPetsController } from './found-pets.controller';
import { FoundPetsService } from './found-pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoundPet]),
    EmailModule   
  ],
  controllers: [FoundPetsController],
  providers: [FoundPetsService]
})
export class FoundPetsModule {}
