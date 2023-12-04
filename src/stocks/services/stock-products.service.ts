import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StockProductsEntity } from '../entities/stock-products.entity';
import { ErrorManager } from '../../utils/error.manager';
import { ProductToStockDTO } from '../dto/stock-products.dto';
import { ProductEntity } from '../../products/entities/product.entity';
import { StockEntity } from '../entities/stock.entity';

@Injectable()
export class StockProductsService {
  constructor(
    @InjectRepository(StockProductsEntity)
    private readonly StockProductsRepository: Repository<StockProductsEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async addProductToStock(
    quantity: number,
    product: ProductEntity,
    stock: StockEntity,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      queryRunner.connect();
      queryRunner.startTransaction();
      const newProductInStock = this.StockProductsRepository.create({
        quantity,
        product,
        stock,
      });
      await this.StockProductsRepository.save(newProductInStock);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Error al agregar un usuario a un stock',
      });
    } finally {
      queryRunner.release();
    }
  }
}
