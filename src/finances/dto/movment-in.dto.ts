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

import { WalletEntity } from '../entities/wallet.entity';

export class MovmentInDTO {
  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsOptional()
  @IsNumber()
  total: number;

  @Expose()
  wallet: WalletEntity;
}
