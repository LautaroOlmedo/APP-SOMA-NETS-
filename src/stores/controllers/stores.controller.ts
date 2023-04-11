import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { StoresService } from '../services/stores.service';
import { StoreDTO, StoreUpdateDTO } from '../dto/store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get('all')
  async getAllStores() {
    return await this.storesService.findAllStores();
  }

  @Get(':id')
  async getStoreById(@Param('id') id: string) {
    return await this.storesService.findOneStore(id);
  }

  @Post('register')
  public async registerStore(@Body() body: StoreDTO) {
    const { storeName, emails, phones, brand } = body;
    return await this.storesService.createStore(
      storeName,
      brand,
      emails,
      phones,
    );
  }

  @Put('edit/:id')
  public async updateStore(
    @Param('id') id: string,
    @Body() body: StoreUpdateDTO,
  ) {
    console.log(id);
    return await this.storesService.updateStore(id, body);
  }

  @Delete('delete/:id')
  public async deleteStore(@Param('id') id: string) {
    console.log(id);

    return await this.storesService.deleteStore(id);
  }
}
