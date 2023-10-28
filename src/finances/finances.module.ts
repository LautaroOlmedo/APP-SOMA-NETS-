import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { FinancesControllerController } from './controllers/finances.controller.controller';
import { FinancesServicesService } from './services/finances.services.service';

import { BrandEntity } from '.././brands/entities/brand.entity';
import { WalletService } from './services/wallet.service';

import { StoreWalletsEntity } from 'src/stores/entities/store-wallet.entity';
import { StoresService } from '.././stores/services/stores.service';
import { BrandsService } from '.././brands/services/brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity, StoreWalletsEntity])],
  controllers: [FinancesControllerController],
  providers: [FinancesServicesService, WalletService],
  exports: [TypeOrmModule],
})
export class FinancesModule {}
