import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ClientEntity } from './entities/client.entity';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { CountryEntity } from '.././countries/entities/country.entity';
import { StoreClientsEntity } from '.././stores/entities/store-clients.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      CountryEntity,
      DepartmentEntity,
      ProvinceEntity,
      StoreClientsEntity,
    ]),
  ],
  providers: [ClientService],
  controllers: [ClientController],
  exports: [TypeOrmModule],
})
export class ClientsModule {}
