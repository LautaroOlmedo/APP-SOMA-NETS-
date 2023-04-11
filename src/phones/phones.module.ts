import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------
import { UserPhonesEntity } from './entities/user-phones.entity';
import { UserEntity } from '.././users/entities/user.entity';
import { StorePhonesEntity } from './entities/store-phones.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { ClientsPhonesEntity } from './entities/client-phones.entity';
import { ClientEntity } from '.././clients/entities/client.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserPhonesEntity,
      StorePhonesEntity,
      ClientsPhonesEntity,
      UserEntity,
      StoreEntity,
      ClientEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class PhonesModule {}
