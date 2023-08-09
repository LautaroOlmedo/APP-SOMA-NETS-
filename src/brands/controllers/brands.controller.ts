import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { BrandsService } from '../services/brands.service';
import { BrandDTO, BrandUpdateDTO } from '../dto/brand.dto';
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get('all')
  public async getAllBrands() {
    return await this.brandsService.findAllBrands();
  }

  @Get(':id')
  public async getBrandById(@Param('id') id: string) {
    return await this.brandsService.findOneBrand(id);
  }

  @Post('register')
  public async registerUser(@Body() body: BrandDTO) {
    return await this.brandsService.createBrand(body);
  }

  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: BrandUpdateDTO,
  ) {
    console.log(id);
    return await this.brandsService.updateBrand(id, body);
  }

  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    console.log(id);

    return await this.brandsService.deleteBrand(id);
  }
}
