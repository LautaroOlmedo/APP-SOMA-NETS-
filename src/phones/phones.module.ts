import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UserEntity } from '.././users/entities/user.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { ClientEntity } from '.././clients/entities/client.entity';
import { PhonesEntity } from './entities/phones.entity';
import { SupplierEntity } from 'src/suppliers/entities/supplier.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PhonesEntity,
      UserEntity,
      StoreEntity,
      ClientEntity,
      SupplierEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class PhonesModule {}
