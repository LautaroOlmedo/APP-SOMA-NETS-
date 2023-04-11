import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { CountriesService } from '../../countries/services/countries.service';
import { ProvinceEntity } from '../entities/province.entity';
import { provincesData } from '../../utils/data/provinces.data';
import { CountryEntity } from '../../countries/entities/country.entity';
import { ErrorManager } from 'src/utils/error.manager';

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
        provinceKey: el.key,
      });
      country ? (newProvince.country = country) : null;
      await this.provinceRepository.save(newProvince);
    });
  }

  public async findOneProvince(id: string): Promise<ProvinceEntity> {
    try {
      const province: ProvinceEntity = await this.provinceRepository.findOneBy({
        id,
      });
      if (!province) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return province;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
