import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { FinancesControllerController } from './controllers/finances.controller.controller';
import { FinancesServicesService } from './services/finances.services.service';
import { MovementOutEntity } from './entities/movement-out.entity';
import { MovementInEntity } from './entities/movement-in.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';
import { WalletEntity } from './entities/wallet.entity';
import { BrandEntity } from '.././brands/entities/brand.entity';
import { WalletService } from './services/wallet.service';
import { WalletController } from './controllers/wallet.controller';
import { StoreWalletsEntity } from 'src/stores/entities/store-wallet.entity';
import { StoresService } from '.././stores/services/stores.service';
import { BrandsService } from '.././brands/services/brands.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WalletEntity,
      MovementOutEntity,
      MovementInEntity,
      PurchaseEntity,
      BrandEntity,
      StoreWalletsEntity,
    ]),
  ],
  controllers: [FinancesControllerController, WalletController],
  providers: [
    FinancesServicesService,
    WalletService,
    BrandsService,
    StoresService,
  ],
  exports: [TypeOrmModule],
})
export class FinancesModule {}
