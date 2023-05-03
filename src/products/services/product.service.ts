import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as ExcelJS from 'exceljs';

// ---------- ---------- ---------- ---------- ----------

import { ProductEntity } from '../entities/product.entity';
import { ProductDTO } from '../dto/product.dto';
import { CategoryEntity } from 'src/categories/entities/catogory.entity';
import { size, talle } from 'src/constants/enums';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<ProductEntity | null> {
    /*const product = (await this.execRepository)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .where({ id })
      .getOne();
    return product;*/
    return await this.productRepository.findOneBy({ id });
  }

  async create(
    price: number,
    description: string,
    productName: string,
    category: CategoryEntity,
    size: size,
    talle: talle,
    quantity: number,
  ): Promise<ProductEntity> {
    console.log('SIZEEEEEEE1', size);
    let newProduct: ProductEntity;
    if (size) {
      console.log('SIZEEEEEEE2', size);

      newProduct = this.productRepository.create({
        price,
        description,
        product_name: productName,
        category,
        size: size,
        quantity: quantity,
      });
    } else {
      newProduct = this.productRepository.create({
        price,
        description,
        product_name: productName,
        category,
        talle: talle,
        quantity: quantity,
      });
    }
    return await this.productRepository.save(newProduct);
  }

  public async addProductStock(id: string, newQuantity: number) {
    // -----> CAMBIAR NOMBRE CON ACTUALIZA CANTIDAD (EN INGLES)
    try {
      const prod: ProductEntity = await this.productRepository
        .createQueryBuilder('prod')
        .where({ id })
        .getOne();
      prod.quantity += newQuantity;
      await this.productRepository.save(prod);
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  async actualizarCantidad(id: string, newQuantity: number) {
    const prod: ProductEntity = await this.productRepository
      .createQueryBuilder('prod')
      .where({ id })
      .getOne();
    prod.quantity = newQuantity;
    await this.productRepository.update({ id: id }, { quantity: newQuantity });
  }

  // async agregaCantidad(id: string, newQuantity: number) {
  //   const prod: ProductEntity = await this.productRepository  // --------> INNECESARIO? REUTILIZACIÓN DE ACTUALIZA CANTIDAD?
  //     .createQueryBuilder('prod')
  //     .where({ id })
  //     .getOne();
  //   prod.quantity = newQuantity;
  //   await this.productRepository.save(prod);
  // }

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
}
