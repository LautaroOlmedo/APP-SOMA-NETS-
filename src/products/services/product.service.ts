import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ProductEntity } from '../entities/product.entity';
import { ProductDTO } from '../dto/product.dto';
import { CategoryEntity } from 'src/categories/entities/catogory.entity';

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
  ): Promise<ProductEntity> {
    const newProduct = this.productRepository.create({
      price,
      description,
      product_name: productName,
      category,
    });
    return await this.productRepository.save(newProduct);
  }
}
