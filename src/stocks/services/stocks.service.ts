import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StockEntity } from '../entities/stock.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { StoreEntity } from 'src/stores/entities/store.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
  ) {}

  public async createStock(
    productId: ProductEntity,
    quantity: number,
  ): Promise<any> {
    try {
      const newStock = this.stockRepository.create({
        availableQuantity: quantity,
        product: productId,
      });
      if (!newStock) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo crear el stock',
        });
      }
      return await this.stockRepository.save(newStock);
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findOneStock(
    store: StoreEntity,
    product: ProductEntity,
  ): Promise<StockEntity> {
    try {
      // const stock: StockEntity = await this.stockRepository
      //   .createQueryBuilder('stock')
      //   .leftJoinAndSelect('stock.store', 'store')
      //   .leftJoinAndSelect('stock.product', 'product')
      //   .getOne();
      const stock: StockEntity = await this.stockRepository.findOne({
        where: { store, product },
      });
      if (!stock) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return stock;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
