import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { CountriesService } from './services/countries.service';
import { CountriesController } from './controllers/countries.controller';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { CountryEntity } from './entities/country.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { StoreEntity } from 'src/stores/entities/store.entity';
import { ProvinceEntity } from 'src/provinces/entities/province.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CountryEntity,
      UserEntity,
      StoreEntity,
      ProvinceEntity,
    ]),
  ],
  providers: [CountriesService, UsersService],
  controllers: [CountriesController],
  exports: [TypeOrmModule, CountriesService],
})
export class CountriesModule {}
