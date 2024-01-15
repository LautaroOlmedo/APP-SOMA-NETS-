import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoresController } from './controllers/stores.controller';
import { StoreUsersEntity } from './entities/store-users.entity';
import { StoreEntity } from './entities/store.entity';
import { StoresService } from './services/stores.service';
import { EmailsEntity } from '.././emails/entities/emails.entity';
import { StoreClientsEntity } from './entities/store-clients.entity';
import { PhonesEntity } from '.././phones/entities/phones.entity';
import { StockEntity } from '.././stocks/entities/stock.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';
import { StoreSuppliersEntity } from './entities/store-suppliers.entity';
import { SupplierEntity } from '.././suppliers/entities/supplier.entity';
import { StoreUsersService } from './services/store-users.service';
import { EmailService } from './../emails/services/email.service';
import { PhonesService } from './../phones/services/phones.service';
import { StoreWalletsService } from './services/store-wallets.service';
import { StoreClientsService } from './services/store-clients.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEntity,
      StoreUsersEntity,
      StoreClientsEntity,
      StoreSuppliersEntity,
      SupplierEntity,
      EmailsEntity,
      PhonesEntity,
      StockEntity,
      PurchaseEntity,
    ]),
  ],
  controllers: [StoresController],
  providers: [
    StoresService,
    StoreUsersService,
    EmailService,
    PhonesService,
    StoreWalletsService,
    StoreClientsService,
  ],
  exports: [
    TypeOrmModule,
    StoresService,
    StoreUsersService,
    StoreWalletsService,
  ],
})
export class StoresModule {}
