import { Body, Controller, Get, Post } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseProductService } from '../services/purchase-product.service';

@Controller('puchase-products')
export class PuchaseProductsController {
  constructor(
    private readonly purchaseProductsService: PurchaseProductService,
  ) {}

  @Get('all')
  public async getALlPP() {
    return await this.purchaseProductsService.findAllPP();
  }

  @Post('register')
  public async registerPP(@Body() body: any) {
    const { quantity, product } = body;
    return await this.purchaseProductsService.create(quantity, product);
  }
}
