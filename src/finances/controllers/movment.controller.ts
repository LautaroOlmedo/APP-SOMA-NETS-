import { Body, Controller, Get, Post } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { MovmentInService } from '../services/movment-in.service';
import { MovmentOutService } from '../services/movment-out.service';
import { MovmentInDTO } from '../dto/movment-in.dto';

@Controller('movments')
export class MovmentController {
  constructor(
    private readonly movmentInService: MovmentInService,
    private readonly movmentOutService: MovmentOutService,
  ) {}

  @Get('allInMovments')
  async getAllInMovments() {}

  @Get('allOutMovments')
  async getAllOutMovments() {}

  @Get('allInMovmentsByStore')
  async getAllInMovmentsByStore() {}

  @Get('allOutMovmentsByStore')
  async getAllOutMovmentsByStore() {}

  @Post('registerEntryMovment')
  async registerMovmentIn(@Body() body: MovmentInDTO) {
    try {
      return this.movmentInService.createMovment(body);
    } catch (e) {
      return {};
    }
  }

  @Post('registerOutputMovment')
  async registerMovmentOut() {}
}
