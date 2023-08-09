import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StocksController } from './controllers/stocks.controller';
import { StocksService } from './services/stocks.service';

import { StockEntity } from './entities/stock.entity';
import { StockProductsEntity } from './entities/stock-products.entity';
import { ProductEntity } from '.././products/entities/product.entity';
import { StoreEntity } from '.././stores/entities/store.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockEntity,
      StockProductsEntity,
      ProductEntity,
      StoreEntity,
    ]),
  ],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [TypeOrmModule, StocksService],
})
export class StocksModule {}
