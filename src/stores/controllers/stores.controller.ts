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
import { UserToStoreDTO } from '../dto/store-user.dto';
import { StoreUsersService } from '../services/store-users.service';
import { StoreWalletsService } from '../services/store-wallets.service';
import { WalletToStoreDTO } from '../dto/store-wallet.dto';

@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly storeUsersService: StoreUsersService,
    private readonly storeWalletsService: StoreWalletsService,
  ) {}

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
    const storeAlreadyExists = await this.storesService.findByUniqueValues(
      body,
    );
    if (!storeAlreadyExists) {
      return storeAlreadyExists;
    } else {
      return await this.storesService.createStore(body);
    }
  }

  @Post('add-to-store')
  public async addToStore(@Body() body: UserToStoreDTO) {
    return await this.storeUsersService.relationToStore(body);
  }

  @Post('add-wallet-to-store')
  public async addWalletToStore(@Body() body: WalletToStoreDTO) {
    return await this.storeWalletsService.relationToStore(body);
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
