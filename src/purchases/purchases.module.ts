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
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseEntity,
      PurchaseProductsEntity,
      UserEntity,
      ClientEntity,
      ProductEntity,
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, PurchaseProductService],
  exports: [TypeOrmModule],
})
export class PurchasesModule {}
