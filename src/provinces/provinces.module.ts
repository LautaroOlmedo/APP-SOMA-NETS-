import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { ProvinceEntity } from './entities/province.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { StoreEntity } from 'src/stores/entities/store.entity';
import { ProvincesService } from './services/provinces.service';
import { ProvincesController } from './controllers/provinces.controller';
import { CountryEntity } from 'src/countries/entities/country.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProvinceEntity,
      CountryEntity,
      UserEntity,
      StoreEntity,
    ]),
  ],
  providers: [ProvincesService],
  controllers: [ProvincesController],
  exports: [TypeOrmModule, ProvincesService],
})
export class ProvincesModule {}
