import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseProductsEntity } from '../entities/purchase-product.entity';
import { ProductService } from '../../products/services/product.service';
import { ProductEntity } from '../../products/entities/product.entity';
import { ErrorManager } from '../../utils/error.manager';
import { PurchaseEntity } from '../entities/purchase.entity';
import { StoresService } from '../../stores/services/stores.service';
import { StoreEntity } from '../../stores/entities/store.entity';
import { paymentMethod } from 'src/constants';

@Injectable()
export class PurchaseProductService {
  constructor(
    @InjectRepository(PurchaseProductsEntity)
    private readonly purchaseProductRepository: Repository<PurchaseProductsEntity>,
    private readonly productsService: ProductService,
    private readonly storesService: StoresService,

    private readonly dataSource: DataSource,
  ) {}

  public async findAllPP(): Promise<PurchaseProductsEntity[]> {
    try {
      const purchaseProducts: PurchaseProductsEntity[] =
        await this.purchaseProductRepository.find();
      return purchaseProducts;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  async createPurchaseProduct(
    quantityOfProducts: number,
    totalPaid: number,
    product: ProductEntity,
    purchase: PurchaseEntity,
  ): Promise<PurchaseProductsEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      const newPurchaseProduct = this.purchaseProductRepository.create({
        quantityOfProducts,
        totalPaid,
        product,
      });

      if (purchase.paymentMethod == paymentMethod.CASH) {
        // .---> ARMAR VERIFICACIÓN PARA MÉTODO DE PAGO Y MONEDA
        newPurchaseProduct.totalPrice =
          product!.effectivePrice * newPurchaseProduct.quantityOfProducts;
      } else {
        newPurchaseProduct.totalPrice =
          product!.dollarPrice * newPurchaseProduct.quantityOfProducts;
      }
      newPurchaseProduct.totalPrice =
        product!.effectivePrice * newPurchaseProduct.quantityOfProducts;

      newPurchaseProduct.purchase = purchase;
      await this.purchaseProductRepository.save(newPurchaseProduct);
      await queryRunner.commitTransaction();
      return newPurchaseProduct;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    } finally {
      queryRunner.release();
    }
  }
}
