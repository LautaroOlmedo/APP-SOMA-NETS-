import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoresController } from './controllers/stores.controller';
import { StoreUsersEntity } from './entities/store-users.entity';
import { StoreEntity } from './entities/store.entity';
import { StoresService } from './services/stores.service';
import { EmailsEntity } from 'src/emails/entities/emails.entity';
import { StoreClientsEntity } from './entities/store-clients.entity';
import { PhonesEntity } from 'src/phones/entities/phones.entity';
import { StockEntity } from '.././stocks/entities/stock.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';
// import { PurchaseProductsEntity } from '.././purchases/entities/purchase-product.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEntity,
      StoreUsersEntity,
      StoreClientsEntity,
      EmailsEntity,
      PhonesEntity,
      StockEntity,
      PurchaseEntity,
    ]),
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [TypeOrmModule, StoresService],
})
export class StoresModule {}
