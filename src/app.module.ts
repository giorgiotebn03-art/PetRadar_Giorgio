import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { FoundPetsModule } from './found-pets/found-pets.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';
import { FoundPet } from './core/db/entities/found-pet.entity';
import { LostPet } from './core/db/entities/lost-pet.entity';
import { dataSourceOptions } from './core/db/datasource';

@Module({
  imports: [LostPetsModule,
    FoundPetsModule, 
    EmailModule,
    TypeOrmModule.forRoot(dataSourceOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
