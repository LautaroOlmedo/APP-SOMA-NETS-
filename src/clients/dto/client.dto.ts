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

  @Expose()
  country: CountryEntity;

  @Expose()
  province: ProvinceEntity;

  @Expose()
  department: DepartmentEntity;

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
