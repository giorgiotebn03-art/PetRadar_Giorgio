import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LostPetsService {

  constructor(
    @InjectRepository(LostPet)
    private repo: Repository<LostPet>,
  ) {}

  async create(data: any) {

    const pet = this.repo.create({
      ...data,
      location: {
        type: "Point",
        coordinates: [data.lng, data.lat]
      }
    });

    return this.repo.save(pet);
  }

}