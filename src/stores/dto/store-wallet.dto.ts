import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Expose } from 'class-transformer';

// ---------- ---------- ---------- ---------- ----------

import { WalletEntity } from '../../finances/entities/wallet.entity';
import { StoreEntity } from '../entities/store.entity';

export class WalletToStoreDTO {
  @IsNotEmpty()
  @IsUUID()
  wallet: WalletEntity;

  @IsNotEmpty()
  @IsUUID()
  store: StoreEntity;
}
