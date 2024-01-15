import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { Response } from 'express';
import { ClientToStoreDTO } from '../dto/store-client.dto';
import { StoreClientsService } from '../services/store-clients.service';

@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly storeUsersService: StoreUsersService,
    private readonly storeClientsService: StoreClientsService,
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
  public async registerStore(@Body() body: StoreDTO, res: Response) {
    const storeAlreadyExists = await this.storesService.findByUniqueValues(
      body,
    );
    if (!storeAlreadyExists) {
      res.json({
        msg: 'El nombre de la tienda está en uso',
        status: res.status(HttpStatus.INTERNAL_SERVER_ERROR),
      });
    } else {
      return await this.storesService.createStore(body);
    }
  }

  @Post('add-to-store')
  public async addUserToStore(@Body() body: UserToStoreDTO) {
    return await this.storeUsersService.relationToStore(body);
  }

  @Post('add-client-to-store')
  public async addClientToStore(@Body() body: ClientToStoreDTO) {
    return await this.storeClientsService.relationToStore(body);
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
