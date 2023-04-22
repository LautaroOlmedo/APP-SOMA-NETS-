import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseProductsEntity } from '../entities/purchase-product.entity';
import { ProductService } from 'src/products/services/product.service';
import { ProductEntity } from 'src/products/entities/product.entity';

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
  ): Promise<PurchaseProductsEntity> {
    const newPP = this.purchaseProductRepository.create({
      product: product,
      quantity_products: quantity,
    });
    const prod = await this.productsService.findOne(newPP.product.id);
    newPP.total_price = prod!.price * newPP.quantity_products;
    return await this.purchaseProductRepository.save(newPP);
  }
}
