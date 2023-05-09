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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import * as xl from 'excel4node';

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
    const {
      productName,
      price,
      description,
      category,
      quantity,
      size,
      talle,
      code,
    } = body;

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
        code,
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

  @Get('cantidad_productos.xlsx')
  async descargarCantidadProductos(@Res() response: Response) {
    // Require library
    var xl = require('excel4node');

    // Create a new instance of a Workbook class
    var wb = new xl.Workbook();

    // Add Worksheets to the workbook
    var ws = wb.addWorksheet('Sheet 1');
    var ws2 = wb.addWorksheet('Sheet 2');

    // Create a reusable style
    var style = wb.createStyle({
      font: {
        color: '#FF0800',
        size: 12,
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    // Set value of cell A1 to 100 as a number type styled with paramaters of style
    ws.cell(1, 1).number(100).style(style);

    // Set value of cell B1 to 200 as a number type styled with paramaters of style
    ws.cell(1, 2).number(200).style(style);

    // Set value of cell C1 to a formula styled with paramaters of style
    ws.cell(1, 3).formula('A1 + B1').style(style);

    // Set value of cell A2 to 'string' styled with paramaters of style
    ws.cell(2, 1).string('string').style(style);

    // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
    ws.cell(3, 1)
      .bool(true)
      .style(style)
      .style({ font: { size: 14 } });

    wb.write('Excel.xlsx');
  }
}
