import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { CountriesService } from './services/countries.service';
import { CountriesController } from './controllers/countries.controller';
import { UsersService } from '.././users/services/users.service';
import { UsersModule } from '.././users/users.module';
import { CountryEntity } from './entities/country.entity';
import { UserEntity } from '.././users/entities/user.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { ClientEntity } from '.././clients/entities/client.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CountryEntity,
      UserEntity,
      ClientEntity,
      StoreEntity,
      ProvinceEntity,
    ]),
  ],
  providers: [CountriesService, UsersService],
  controllers: [CountriesController],
  exports: [TypeOrmModule, CountriesService],
})
export class CountriesModule {}
