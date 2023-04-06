import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ProvinceEntity } from './entities/province.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { StoreEntity } from 'src/stores/entities/store.entity';
import { ProvincesService } from './services/provinces.service';
import { ProvincesController } from './controllers/provinces.controller';
import { CountryEntity } from '.././countries/entities/country.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { ClientEntity } from '.././clients/entities/client.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProvinceEntity,
      CountryEntity,
      UserEntity,
      ClientEntity,
      StoreEntity,
      DepartmentEntity,
    ]),
  ],
  providers: [ProvincesService],
  controllers: [ProvincesController],
  exports: [TypeOrmModule, ProvincesService],
})
export class ProvincesModule {}
