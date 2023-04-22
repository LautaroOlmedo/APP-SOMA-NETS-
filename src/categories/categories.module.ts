import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { CategoryEntity } from './entities/catogory.entity';
import { ProductEntity } from '.././products/entities/product.entity';
import { CategorieController } from './controllers/categorie.controller';
import { CategorieService } from './services/categorie.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
  exports: [TypeOrmModule],
  controllers: [CategorieController],
  providers: [CategorieService],
})
export class CategoriesModule {}
