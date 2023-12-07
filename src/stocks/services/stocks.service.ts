import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StockEntity } from '../entities/stock.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { StoreEntity } from '../../stores/entities/store.entity';
import { StockProductsEntity } from '../entities/stock-products.entity';
import { StockDTO } from '../dto/stock.dto';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async findOneStock(id: string): Promise<StockEntity | null> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      //queryRunner.connect();

      //const myStock = queryRunner.query(`SELECT * FROM stock where id=${id}`);

      //queryRunner.startTransaction();
      const stock: StockEntity = await this.stockRepository.findOneBy({ id });
      if (!stock) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo crear el stock',
        });
        // return null;
      }
      return stock;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async createStock(stock: StockDTO): Promise<any> {
    try {
      const { stockName, store } = stock;
      const newStock = this.stockRepository.create({
        //availableQuantity: quantity,
        stockName,
        store,
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
}

// public async createStock(
//   productId: ProductEntity,
//   quantity: number,
// ): Promise<any> {
//   try {
//     const newStock = this.stockRepository.create({
//       availableQuantity: quantity,
//     });
//     if (!newStock) {
//       throw new ErrorManager({
//         type: 'BAD_REQUEST',
//         message: 'No se pudo crear el stock',
//       });
//     }
//     return await this.stockRepository.save(newStock);
//   } catch (e) {
//     console.log(e);
//     throw ErrorManager.createSignatureError(e.message);
//   }
// }

// public async findOneStock(
//   store: StoreEntity,
//   product: ProductEntity,
// ): Promise<StockEntity> {
//   try {
//     // const stock: StockEntity = await this.stockRepository
//     //   .createQueryBuilder('stock')
//     //   .leftJoinAndSelect('stock.store', 'store')
//     //   .leftJoinAndSelect('stock.product', 'product')
//     //   .getOne();
//     const stock: StockEntity = await this.stockRepository.findOne({
//       where: { store },
//     });
//     if (!stock) {
//       throw new ErrorManager({
//         type: 'BAD_REQUEST',
//         message: 'No se encontró resultado',
//       });
//     }
//     return stock;
//   } catch (e) {
//     console.log(e);
//     throw ErrorManager.createSignatureError(e.message);
//   }
// }
