import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { CategoryEntity } from './entities/catogory.entity';
import { ProductEntity } from '.././products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
