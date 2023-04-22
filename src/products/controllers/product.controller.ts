import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { ProductService } from '../services/product.service';
import { ProductDTO } from '../dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get('all')
  public async getAllPeroducts() {
    return await this.productsService.findAllProducts();
  }
  @Post('register')
  public async registerProduct(@Body() body: ProductDTO) {
    const { productName, price, description, category } = body;
    return await this.productsService.create(
      price,
      productName,
      description,
      category,
    );
  }
}
