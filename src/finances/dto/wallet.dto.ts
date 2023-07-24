import { Expose } from 'class-transformer';

// ---------- ---------- ---------- ---------- ----------

import { BrandEntity } from '../../brands/entities/brand.entity';
import { wallet_type } from 'src/constants/enums';
import { IsDecimal, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { StoreWalletsEntity } from 'src/stores/entities/store-wallet.entity';

export class WalletDTO {
  @IsNotEmpty()
  @IsEnum(wallet_type)
  walletType: wallet_type;

  @IsOptional()
  @IsDecimal()
  totalAcount: number;

  @Expose()
  brand: BrandEntity;

  @Expose()
  storesIncludes: StoreWalletsEntity[];
}
