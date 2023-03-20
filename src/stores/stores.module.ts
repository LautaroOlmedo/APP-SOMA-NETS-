import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreDirectionsEntity } from 'src/direction/entities/store-directions.entity';
import { StoreEmailsEntity } from '.././emails/entities/store-emails.entity';

// ---------- ---------- ---------- ---------- ----------

import { StoresController } from './controllers/stores.controller';
import { StoreUsersEntity } from './entities/store-users.entity';
import { StoreEntity } from './entities/store.entity';
import { StoresService } from './services/stores.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEntity,
      StoreUsersEntity,
      StoreDirectionsEntity,
      StoreEmailsEntity,
    ]),
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [TypeOrmModule, StoresService],
})
export class StoresModule {}
