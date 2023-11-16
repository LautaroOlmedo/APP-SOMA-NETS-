import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { WalletDTO } from '../dto/wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletsService: WalletService) {}

  @Get('all')
  async getAllWallets() {
    return await this.walletsService.findAllWallets();
  }

  @Post('register')
  public async registerUser(@Body() body: WalletDTO) {}
}
