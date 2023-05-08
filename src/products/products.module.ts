import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '.././categories/entities/catogory.entity';
import { PurchaseProductsEntity } from '.././purchases/entities/purchase-product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { StockEntity } from '.././stocks/entities/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      PurchaseProductsEntity,
      StockEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],

  exports: [TypeOrmModule, ProductService],
})
export class ProductsModule {}
