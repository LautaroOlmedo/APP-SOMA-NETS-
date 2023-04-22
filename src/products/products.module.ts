import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '.././categories/entities/catogory.entity';
import { PurchaseProductsEntity } from '.././purchases/entities/purchase-product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      PurchaseProductsEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],

  exports: [TypeOrmModule, ProductService],
})
export class ProductsModule {}
