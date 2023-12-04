import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { WalletEntity } from './entities/wallet.entity';
import { StoreWalletsEntity } from '../stores/entities/store-wallets.entity';

import { FinancesServicesService } from './services/finances.services.service';

import { WalletService } from './services/wallet.service';

import { WalletController } from './controllers/wallet.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, StoreWalletsEntity])],
  controllers: [WalletController],
  providers: [FinancesServicesService, WalletService],
  exports: [TypeOrmModule, WalletService],
})
export class FinancesModule {}
