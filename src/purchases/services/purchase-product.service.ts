import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseProductsEntity } from '../entities/purchase-product.entity';
import { ProductService } from '../../products/services/product.service';
import { ProductEntity } from '../../products/entities/product.entity';
import { ErrorManager } from '../../utils/error.manager';
import { PurchaseEntity } from '../entities/purchase.entity';
import { StoresService } from '../../stores/services/stores.service';
import { StoreEntity } from '../../stores/entities/store.entity';

@Injectable()
export class PurchaseProductService {
  constructor(
    @InjectRepository(PurchaseProductsEntity)
    private readonly purchaseProductRepository: Repository<PurchaseProductsEntity>,
    private readonly productsService: ProductService,
    private readonly storesService: StoresService,
  ) {}

  public async findAllPP(): Promise<PurchaseProductsEntity[]> {
    try {
      const purchaseProducts: PurchaseProductsEntity[] =
        await this.purchaseProductRepository.find();
      if (purchaseProducts.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return purchaseProducts;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  async createPurchaseProduct(
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
      const prod: ProductEntity = await this.productsService.findOneProduct(
        newPP.product.id,
      );
      const store: StoreEntity = await this.storesService.findOneStore(
        newPP.purchase.store.id,
      );

      // if (stock.availableQuantity < newPP.quantity_products) {
      //   throw new ErrorManager({
      //     type: 'CONFLICT',
      //     message: 'No hay suficiente stock',
      //   });
      // }
      // const newProductQuantity = (prod!.quantity =
      //   prod!.quantity - newPP.quantity_products);
      // await this.productsService.actualizarCantidad(
      //   prod.id,
      //   newProductQuantity,
      // );

      newPP.total_price = prod!.effectivePrice * newPP.quantity_products;
      return await this.purchaseProductRepository.save(newPP);
    } catch (e) {
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    }
  }
}
