import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UserEntity } from '.././users/entities/user.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { ClientEntity } from '.././clients/entities/client.entity';
import { PhonesEntity } from './entities/phones.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PhonesEntity,
      UserEntity,
      StoreEntity,
      ClientEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class PhonesModule {}
