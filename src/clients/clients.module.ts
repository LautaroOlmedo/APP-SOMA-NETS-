import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ClientEntity } from './entities/client.entity';
import { ClientsService } from './services/client.service';
import { ClientsController } from './controllers/client.controller';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { CountryEntity } from '.././countries/entities/country.entity';
import { StoreClientsEntity } from '.././stores/entities/store-clients.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { ClientsPhonesEntity } from '.././phones/entities/client-phones.entity';
import { ClientsEmailsEntity } from '.././emails/entities/client-emails.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      CountryEntity,
      DepartmentEntity,
      ProvinceEntity,
      StoreClientsEntity,
      ClientsPhonesEntity,
      ClientsEmailsEntity,
      PurchaseEntity,
    ]),
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [TypeOrmModule],
})
export class ClientsModule {}
