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
  // @Get('all')
  // public async getAllWallets() {
  //   return await this.walletService.findAllProducts();
  // }

  @Post('register')
  public async registerProduct(@Body() body: WalletDTO) {
    const newWallet = await this.walletService.createWallet(body);
    if (newWallet) {
      return newWallet;
    } else {
      return new Error('ERROR');
    }
  }

  @Post('relationStore')
  public async relationToStore(@Body() body: StoreWalletDTO) {
    const resp = await this.walletService.relationToStore(body);
    if (resp == null) {
      return HttpStatus.CREATED;
    } else {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
