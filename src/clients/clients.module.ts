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
import { PhonesEntity } from '.././phones/entities/phones.entity';
import { EmailsEntity } from '.././emails/entities/emails.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      CountryEntity,
      DepartmentEntity,
      ProvinceEntity,
      StoreClientsEntity,
      PhonesEntity,
      EmailsEntity,
      PurchaseEntity,
    ]),
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [TypeOrmModule],
})
export class ClientsModule {}
