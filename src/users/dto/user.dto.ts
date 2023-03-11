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

// ---------- ---------- ---------- ---------- ----------

import { ACCESS_LEVEL, ROLES } from 'src/constants/roles';
import { StoreEntity } from 'src/stores/entities/store.entity';
import { UserEntity } from '../entities/user.entity';

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
