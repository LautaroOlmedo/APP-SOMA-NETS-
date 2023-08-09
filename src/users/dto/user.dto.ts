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

import { ACCESS_LEVEL, ROLES } from '../../constants/roles';
import { StoreEntity } from '../../stores/entities/store.entity';
import { UserEntity } from '../entities/user.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { CountryEntity } from '../../countries/entities/country.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';

import { PhonesEntity } from 'src/phones/entities/phones.entity';
import { StoreUsersEntity } from 'src/stores/entities/store-users.entity';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  direction: string;

  @Expose()
  brand: BrandEntity;

  @Expose()
  country: CountryEntity;

  @Expose()
  province: ProvinceEntity;

  @Expose()
  department: DepartmentEntity;

  @Expose()
  storesIncludes: StoreUsersEntity[];

  emails: string[];

  phones: string[];
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}

export class UserToStoreDTO {
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accesLevel: ACCESS_LEVEL;

  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;

  @IsNotEmpty()
  @IsUUID()
  store: StoreEntity;
}
