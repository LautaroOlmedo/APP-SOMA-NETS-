import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------

import { UserEntity } from 'src/users/entities/user.entity';
import { CountryEntity } from '../entities/country.entity';
import { ErrorManager } from '../../utils/error.manager';
import { CountryDTO } from '../dto/country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAllCountries(): Promise<CountryEntity[]> {
    try {
      const countries: CountryEntity[] = await this.countryRepository.find();
      if (countries.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return countries;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findOneCountry(id: string): Promise<CountryEntity> {
    try {
      const country: CountryEntity = await this.countryRepository.findOneBy({
        id,
      });
      if (!country) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return country;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
  public async createCountry(body: CountryDTO): Promise<CountryEntity> {
    try {
      return await this.countryRepository.save(body);
    } catch (e) {
      console.log(e);
    }
  }
}
