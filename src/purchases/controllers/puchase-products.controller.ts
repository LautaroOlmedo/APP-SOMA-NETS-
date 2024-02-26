import { Body, Controller, Get, Post, HttpStatus } from '@nestjs/common';

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
  public async registerPP() {}
  // public async registerPP(@Body() body: any) {
  //   try {
  //     const { quantity, product, purchase } = body;

  //     const newPP = await this.purchaseProductsService.createPurchaseProduct(
  //       quantity,
  //       product,
  //       purchase,
  //     );
  //     if (newPP) {
  //       return newPP;
  //     } else {
  //       return 'prueba';
  //     }
  //   } catch (e) {
  //     return {
  //       status: HttpStatus.BAD_REQUEST,
  //       msg: 'Error en el servidor',
  //     };
  //   }
  // }
}
