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
    const { productName, price, description, code, size, category, stock } =
      body;

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
      await this.relationToStock(newProduct, stockInDB);

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

  private async validateProductAndStock(
    product: ProductEntity,
    stock: StockEntity,
  ): Promise<boolean> {
    try {
      const findStock: StockEntity | ErrorManager =
        await this.stocksSerive.findOneStock(stock.id);
      if (findStock instanceof StockEntity) {
        // MEJORAR ESTA VALIDACION
        await this.productRepository.save(product);
        await this.relationToStock(product, stock);
        return true;
      } else {
        return false;
      }
    } catch (e) {}
    return false;
  }

  public async addProductStock(id: string, newQuantity: number) {
    // -----> CAMBIAR NOMBRE CON ACTUALIZA CANTIDAD (EN INGLES)
    try {
      //   const prod: ProductEntity = await this.productRepository
      //     .createQueryBuilder('prod')
      //     .where({ id })
      //     .getOne();
      //   prod.quantity += newQuantity;
      //   await this.productRepository.save(prod);
      return false;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  async actualizarCantidad(id: string, newQuantity: number) {
    // const prod: ProductEntity = await this.productRepository
    //   .createQueryBuilder('prod')
    //   .where({ id })
    //   .getOne();
    // prod.quantity = newQuantity;
    // await this.productRepository.update({ id: id }, { quantity: newQuantity });
    return false;
  }

  async agregaCantidad(id: string, newQuantity: number) {
    //   const prod: ProductEntity = await this.productRepository  // --------> INNECESARIO? REUTILIZACIÓN DE ACTUALIZA CANTIDAD?
    //     .createQueryBuilder('prod')
    //     .where({ id })
    //     .getOne();
    //   prod.quantity = newQuantity;
    //   await this.productRepository.save(prod);
    return false;
  }

  // ---------- ---------- EXCEL ---------- ----------

  async generateExcelFile(productsCount: number) {
    // Crear el nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();

    // Crear una hoja de trabajo y establecer su nombre
    const worksheet = workbook.addWorksheet('Cantidad de productos');

    // Agregar los datos a la hoja de trabajo
    worksheet.addRow(['Cantidad de productos']);
    worksheet.addRow([productsCount]);

    // Escribir el libro en un archivo
    await workbook.xlsx.writeFile('cantidad_productos.xlsx');
  }

  // ---------- ----------  RELATIONS  ---------- ----------

  public async relationToStock(product: ProductEntity, stock: StockEntity) {
    try {
      const productInStock = this.stockProductsRepository.create({
        product,
        stock,
      });
      if (!productInStock) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo guardar el producto',
        });
      }
      return await this.stockProductsRepository.save(productInStock);
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
