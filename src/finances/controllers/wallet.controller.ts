import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

// ---------- ---------- ---------- ---------- ----------

import { WalletService } from '../services/wallet.service';
import { StoreWalletDTO, WalletDTO } from '../dto/wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Get('all')
  public async getAllWallets() {
    return await this.walletService.findAllWallets();
  }

  @Post('register')
  public async registerProduct(@Body() body: WalletDTO) {
    const newWallet = await this.walletService.createWallet(body);
    if (newWallet) {
      return newWallet;
    } else {
      return new Error('ERROR');
    }
  }

  // ---------- ----------  RELATIONS  ---------- ----------

  @Post('storeWallet')
  public async addToStore(@Body() body: StoreWalletDTO) {
    return await this.walletService.relationToStore(body);
  }
}
