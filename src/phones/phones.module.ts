import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UserEntity } from '.././users/entities/user.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { ClientEntity } from '.././clients/entities/client.entity';
import { PhonesEntity } from './entities/phones.entity';
import { SupplierEntity } from '.././suppliers/entities/supplier.entity';
import { PhonesService } from './services/phones.service';

@Global()
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
  providers: [PhonesService],
  exports: [TypeOrmModule, PhonesService],
})
export class PhonesModule {}
