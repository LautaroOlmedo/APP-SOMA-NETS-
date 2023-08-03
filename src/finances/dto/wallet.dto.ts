import { Expose } from 'class-transformer';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

// ---------- ---------- ---------- ---------- ----------

import { BrandEntity } from '../../brands/entities/brand.entity';
import { wallet_type } from '../../constants/enums';
import { StoreWalletsEntity } from 'src/stores/entities/store-wallet.entity';
import { WalletEntity } from '../entities/wallet.entity';
import { StoreEntity } from 'src/stores/entities/store.entity';

export class WalletDTO {
  @IsNotEmpty()
  @IsEnum(wallet_type)
  walletType: wallet_type;

  @IsOptional()
  //@IsDecimal()
  totalAcount: number;

  @IsNotEmpty()
  //@IsString()
  @IsUUID()
  brand: BrandEntity;

  @Expose()
  //@IsUUID()
  storesIncludes: StoreEntity;
}

export class StoreWalletDTO {
  @IsNotEmpty()
  @IsUUID()
  wallet: WalletEntity;

  @IsNotEmpty()
  @IsUUID()
  store: StoreEntity;
}
