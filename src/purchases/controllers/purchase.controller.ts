import { Body, Post, Controller } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseService } from '../services/purchase.service';
import { PurchaseDTO } from '../dto/purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchasesService: PurchaseService) {}

  public async getAllPurchases() {
    return await this.purchasesService.findAllPurchases();
  }

  @Post('register')
  public async createPurchase(@Body() body: PurchaseDTO) {
    const { user, client, purchaseProduct, paymentMethod, status } = body;
    return await this.purchasesService.createPurchase(
      user,
      client,
      paymentMethod,
      status,
    );
  }
}
