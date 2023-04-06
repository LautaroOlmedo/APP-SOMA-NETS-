import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoresController } from './controllers/stores.controller';
import { StoreUsersEntity } from './entities/store-users.entity';
import { StoreEntity } from './entities/store.entity';
import { StoresService } from './services/stores.service';
import { StoreEmailsEntity } from '.././emails/entities/store-emails.entity';
import { StoreClientsEntity } from './entities/store-clients.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEntity,
      StoreUsersEntity,
      StoreClientsEntity,
      StoreEmailsEntity,
    ]),
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [TypeOrmModule, StoresService],
})
export class StoresModule {}
