import {
  IsBoolean,
  isEnum,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Expose } from 'class-transformer';

// ---------- ---------- ---------- ---------- ----------

import { CountryEntity } from '../../countries/entities/country.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';

export class ClientDTO {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsNotEmpty()
  @IsString()
  direction: string;

  @Expose()
  country: CountryEntity;

  @Expose()
  province: ProvinceEntity;

  @Expose()
  department: DepartmentEntity;

  @Expose()
  brand: BrandEntity;

  emails: string[];

  phones: string[];
}

export class ClientUpdateDTO {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;
}
