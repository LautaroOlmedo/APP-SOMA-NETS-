import { WalletEntity } from '.././finances/entities/wallet.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { UserEntity } from '.././users/entities/user.entity';

export interface BrandInterface {
  brandName: string;
  webSite: string;
  image: string;
  users?: UserEntity[];
  wallets?: WalletEntity[];
  stores?: StoreEntity[];
}
