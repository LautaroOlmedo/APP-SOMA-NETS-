import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { CategoryEntity } from '../entities/catogory.entity';
@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categorieRepository: Repository<CategoryEntity>,
  ) {}

  public async findAllCategories(): Promise<CategoryEntity[]> {
    return await this.categorieRepository.find();
  }
  public async createCategory(body: any) {
    return await this.categorieRepository.save(body);
  }
}
