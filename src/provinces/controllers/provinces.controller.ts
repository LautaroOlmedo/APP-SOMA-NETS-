import { Controller, Get } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { ProvincesService } from '../services/provinces.service';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}
  @Get('all')
  public async getProvinces() {
    return await this.provincesService.loadProvinceDB();
  }
}
