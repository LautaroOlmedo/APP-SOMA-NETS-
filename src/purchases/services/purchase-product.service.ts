import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseProductsEntity } from '../entities/purchase-product.entity';
import { ProductService } from 'src/products/services/product.service';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { PurchaseEntity } from '../entities/purchase.entity';

@Injectable()
export class PurchaseProductService {
  constructor(
    @InjectRepository(PurchaseProductsEntity)
    private readonly purchaseProductRepository: Repository<PurchaseProductsEntity>,
    private readonly productsService: ProductService,
  ) {}

  public async findAllPP(): Promise<PurchaseProductsEntity[]> {
    return await this.purchaseProductRepository.find();
  }

  async create(
    quantity: number,
    product: ProductEntity,
    purchase: PurchaseEntity,
  ): Promise<PurchaseProductsEntity> {
    try {
      const newPP = this.purchaseProductRepository.create({
        product: product,
        quantity_products: quantity,
        purchase: purchase,
      });
      const prod = await this.productsService.findOne(newPP.product.id);
      if (prod!.quantity < newPP.quantity_products) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'No hay suficiente stock',
        });
      }
      const newProductQuantity = (prod!.quantity =
        prod!.quantity - newPP.quantity_products);
      await this.productsService.actualizarCantidad(
        prod.id,
        newProductQuantity,
      );

      newPP.total_price = prod!.price * newPP.quantity_products;
      return await this.purchaseProductRepository.save(newPP);
    } catch (e) {
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    }
  }
}
