import {
  Body,
  Post,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseService } from '../services/purchase.service';
import { PurchaseDTO } from '../dto/purchase.dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchasesService: PurchaseService) {}

  @Get(':id')
  public async getAllPurchases(@Param('id', ParseUUIDPipe) id: string) {
    return await this.purchasesService.findAllPurchases(id);
  }

  @Post('register')
  public async createPurchase(@Body() body: PurchaseDTO) {
    return await this.purchasesService.createPurchase(body);
  }
}
