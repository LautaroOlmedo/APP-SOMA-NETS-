import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DataSource } from 'typeorm';
import * as ExcelJS from 'exceljs';

// ---------- ---------- ---------- ---------- ----------

import { ProductEntity } from '../entities/product.entity';
import { ProductDTO, ProductToStockDTO } from '../dto/product.dto';
import { CategoryEntity } from '../../categories/entities/catogory.entity';
import { size, talle } from '../../constants/enums';
import { ErrorManager } from '../../utils/error.manager';
import { StockProductsEntity } from '../../stocks/entities/stock-products.entity';
import { StockEntity } from '../../stocks/entities/stock.entity';
import { StocksService } from '../../stocks/services/stocks.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(StockProductsEntity)
    private readonly stockProductsRepository: Repository<StockProductsEntity>,

    private readonly stocksSerive: StocksService,
    private readonly dataSource: DataSource,
  ) {}

  async findAllProducts(): Promise<ProductEntity[]> {
    const products: ProductEntity[] = await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.stocksIncludes', 'stocksIncludes')
      .leftJoinAndSelect('stocksIncludes.stock', 'stock')
      //.leftJoinAndSelect('productsIncludes.product', 'product')
      .getMany();
    return products;
  }

  async findOneProduct(id: string): Promise<ProductEntity | undefined> {
    /*const product = (await this.execRepository)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .where({ id })
      .getOne();
    return product;*/
    return await this.productRepository.findOneBy({ id });
  }

  async create(body: ProductDTO): Promise<ProductEntity | null> {
    const {
      productName,
      price,
      description,
      code,
      size,
      category,
      stock,
      quantity,
    } = body;

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const stockInDB: StockEntity | null =
        await this.stocksSerive.findOneStock(stock);
      queryRunner.connect();

      if (!stock) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró el stock',
        });
      }

      queryRunner.startTransaction();
      const newProduct = this.productRepository.create({
        productName,
        description,
        price,
        size,
        code,
        category,
      });
      await this.productRepository.save(newProduct);
      await this.relationToStock(newProduct, stockInDB, quantity);

      await queryRunner.commitTransaction();
      return newProduct;
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'No se pudo crear el producto',
      });
    } finally {
      await queryRunner.release();
    }
  }

  // ---------- ----------  RELATIONS  ---------- ----------

  private async relationToStock(
    product: ProductEntity,
    stock: StockEntity,
    quantity: number,
  ): Promise<StockProductsEntity | ErrorManager> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      const productInStock = this.stockProductsRepository.create({
        productInStock: quantity,
        product,
        stock,
      });
      if (!productInStock) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo guardar el producto',
        });
      }

      queryRunner.startTransaction();

      await this.stockProductsRepository.save(productInStock);
      await queryRunner.commitTransaction();
      return productInStock;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    } finally {
      await queryRunner.release();
    }
  }
}
