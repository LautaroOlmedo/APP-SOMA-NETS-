import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '.././categories/entities/catogory.entity';
import { PurchaseProductsEntity } from '.././purchases/entities/purchase-product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { StockEntity } from '.././stocks/entities/stock.entity';
import { StocksService } from '.././stocks/services/stocks.service';
import { StockProductsEntity } from 'src/stocks/entities/stock-products.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      PurchaseProductsEntity,
      StockEntity,
      StockProductsEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, StocksService],

  exports: [TypeOrmModule, ProductService],
})
export class ProductsModule {}
