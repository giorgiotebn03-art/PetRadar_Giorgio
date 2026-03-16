import { envs } from "src/config/envs";
import { FoundPet } from "./entities/found-pet.entity";
import { LostPet } from "./entities/lost-pet.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions : DataSourceOptions = {
      host: envs.DB_HOST,
      type: 'postgres',
      port: envs.DB_PORT,
      database: envs.DB_NAME,
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
      entities: [FoundPet,LostPet],
      synchronize: false,
      migrations: ["dist/core/db/migrations/*"]
};

export const AppDataSource = new DataSource(dataSourceOptions);