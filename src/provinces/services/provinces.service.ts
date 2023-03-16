import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { CountriesService } from 'src/countries/services/countries.service';
import { Repository } from 'typeorm';
import { ProvinceEntity } from '../entities/province.entity';
import { provincesData } from '../../utils/data/provinces.data';
import { CountryEntity } from 'src/countries/entities/country.entity';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
    private readonly countriesServices: CountriesService,
  ) {}

  public async loadProvinceDB(): Promise<string | void> {
    let provinces: ProvinceEntity[] = await this.provinceRepository.find();
    const country: CountryEntity = await this.countriesServices.findOneCountry(
      '879ccb56-f2a2-4448-b026-b67b2798d663',
    );
    if (provinces.length > 0) return 'Provinces already exists';
    provincesData.map(async (el) => {
      const newProvince = this.provinceRepository.create({
        provinceName: el.name,
        provinceKey: el.countryKey,
      });
      country ? (newProvince.country = country) : null;
      await this.provinceRepository.save(newProvince);
    });
  }
}
