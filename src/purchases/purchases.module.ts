import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseEntity } from './entities/purchase.entity';
import { PurchaseProductsEntity } from './entities/purchase-product.entity';
import { UserEntity } from '.././users/entities/user.entity';
import { ClientEntity } from '.././clients/entities/client.entity';
import { PurchaseService } from './services/purchase.service';
import { PurchaseProductService } from './services/purchase-product.service';
import { PurchaseController } from './controllers/purchase.controller';
import { ProductEntity } from '.././products/entities/product.entity';
import { ProductService } from '.././products/services/product.service';
import { PuchaseProductsController } from './controllers/puchase-products.controller';
import { StoreEntity } from '.././stores/entities/store.entity';
import { StocksService } from 'src/stocks/services/stocks.service';
import { StoresService } from '.././stores/services/stores.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseEntity,
      PurchaseProductsEntity,
      UserEntity,
      ClientEntity,
      ProductEntity,
      StoreEntity,
    ]),
  ],
  controllers: [PurchaseController, PuchaseProductsController],
  providers: [
    PurchaseService,
    PurchaseProductService,
    ProductService,
    StocksService,
    StoresService,
  ],
  exports: [TypeOrmModule],
})
export class PurchasesModule {}
