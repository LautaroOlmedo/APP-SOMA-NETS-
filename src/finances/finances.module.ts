import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { WalletEntity } from './entities/wallet.entity';
import { StoreWalletsEntity } from '../stores/entities/store-wallets.entity';

import { FinancesServicesService } from './services/finances.services.service';

import { WalletService } from './services/wallet.service';

import { WalletController } from './controllers/wallet.controller';
import { MovmentInEntity } from './entities/movement-in.entity';
import { MovmentOutEntity } from './entities/movement-out.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      WalletEntity,
      StoreWalletsEntity,
      MovmentInEntity,
      MovmentOutEntity,
      PurchaseEntity,
    ]),
  ],
  controllers: [WalletController],
  providers: [FinancesServicesService, WalletService],
  exports: [TypeOrmModule, WalletService],
})
export class FinancesModule {}
