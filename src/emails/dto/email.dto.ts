import { Expose } from 'class-transformer';
import {
  IsDecimal,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ClientEntity } from '../../clients/entities/client.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { SupplierEntity } from '../../suppliers/entities/supplier.entity';
import { UserEntity } from '../../users/entities/user.entity';

// ---------- ---------- ---------- ---------- ----------

export class UserEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  user: UserEntity;
}

export class StoreEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  user: UserEntity;

  @IsOptional()
  clientID: string;

  @IsOptional()
  storeID: string;

  @IsOptional()
  supplierID: string;
}

export class ClientEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  user: UserEntity;

  @IsOptional()
  clientID: string;

  @IsOptional()
  storeID: string;

  @IsOptional()
  supplierID: string;
}
