import { Body, Controller, Get, Post } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { CategorieService } from '../services/categorie.service';

@Controller('categories')
export class CategorieController {
  constructor(private readonly categoriesService: CategorieService) {}

  @Get('all')
  public async getAllCartegories() {
    return await this.categoriesService.findAllCategories();
  }

  @Post('register')
  public async registerCategory(@Body() body: any) {
    return await this.categoriesService.createCategory(body);
  }
}
