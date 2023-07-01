import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { StocksService } from '../services/stocks.service';
import { StockDTO } from '../dto/stock.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('/:id')
  public async getUserById(@Param('id') id: string) {
    // A CHECKEAR EL PARSE
    return await this.stocksService.findOneStock(id);
  }

  @Post('register')
  public async createStore(@Body() body: StockDTO) {
    try {
      const { quantity, store } = body;
      const newStore = await this.stocksService.createStock(quantity, store);
      return newStore;
    } catch (e) {
      console.log(e);
    }
  }
}
