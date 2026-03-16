import { Body, Controller, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';
import type { LostPetCDto } from 'src/core/interfaces/lost-pets.interface';

@Controller('lost-pets')
export class LostPetsController {

  constructor(private readonly service: LostPetsService) {}

  @Post()
  async create(@Body() losted: LostPetCDto){
    const result = await this.service.create(losted);
    return result;
  }

}