// ---------- ---------- ---------- ---------- ----------

import { BrandEntity } from '.././brands/entities/brand.entity';
import { StoreWalletsEntity } from '.././stores/entities/store-wallets.entity';

export interface WallletInterface {
  walletName: string;
  availableBalance: number;
  storesIncludes: StoreWalletsEntity[];
  brand?: BrandEntity;
}
