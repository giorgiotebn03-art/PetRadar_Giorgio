import { Body, Controller, Get, Post } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';
import type { FoundPetCDto } from 'src/core/interfaces/found-pets.interface';

@Controller('found-pets')
export class FoundPetsController {
    
    constructor(private readonly service: FoundPetsService) {}

    @Get()
    async getAll() {
        return this.service.getAll();
    }

    @Post()
    async create(@Body() founded: FoundPetCDto){
        const result = await this.service.create(founded);
        return result;
    }


}
