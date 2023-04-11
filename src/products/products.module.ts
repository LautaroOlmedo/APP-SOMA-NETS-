import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '.././categories/entities/catogory.entity';
import { PurchaseProductsEntity } from '.././purchases/entities/purchase-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      PurchaseProductsEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
