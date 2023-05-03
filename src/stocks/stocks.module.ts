import { Module } from '@nestjs/common';
import { StocksController } from './controllers/stocks.controller';
import { StocksService } from './services/stocks.service';

@Module({
  controllers: [StocksController],
  providers: [StocksService]
})
export class StocksModule {}
