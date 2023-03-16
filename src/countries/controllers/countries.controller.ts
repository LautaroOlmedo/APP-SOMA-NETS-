import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { CountriesService } from '../services/countries.service';
import { CountryDTO } from '../dto/country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountriesService) {}

  @Get('all')
  async getAllCountries() {
    return await this.countryService.findAllCountries();
  }

  @Post('register')
  async createCountry(@Body() body: CountryDTO) {
    return await this.countryService.createCountry(body);
  }
}
