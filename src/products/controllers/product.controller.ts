import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { ProductService } from '../services/product.service';
import { ProductDTO, UpdateProductDTO } from '../dto/product.dto';
import { size, talle } from 'src/constants/enums';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get('all')
  public async getAllPeroducts() {
    return await this.productsService.findAllProducts();
  }
  @Post('register')
  public async registerProduct(@Body() body: ProductDTO) {
    const { productName, price, description, category, quantity, size, talle } =
      body;

    let newSize: size;
    let newTalle: talle;
    size ? (newSize = size) : null;

    talle ? (newTalle = talle) : null;
    if (newSize && newTalle) {
      return {
        httpStatus: HttpStatus.CONFLICT,
        msg: 'No puedes cargar propiedades de 2 productos distintos en uno',
      };
    } else {
      return await this.productsService.create(
        price,
        productName,
        description,
        category,
        size,
        talle,
        quantity,
      );
    }
  }

  @Put('add-stock/:id')
  public async addStock(
    @Param('id') id: string,
    @Body() body: UpdateProductDTO,
  ) {
    try {
      const { quantity } = body;
      return await this.productsService.addProductStock(id, quantity);
    } catch (error) {
      return {
        msg: 'ERROR',
      };
    }
  }
}
