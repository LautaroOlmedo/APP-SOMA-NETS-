import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoresController } from './controllers/stores.controller';
import { StoreUsersEntity } from './entities/store-users.entity';
import { StoreEntity } from './entities/store.entity';
import { StoresService } from './services/stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity, StoreUsersEntity])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
