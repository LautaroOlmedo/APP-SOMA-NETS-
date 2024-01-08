// ---------- ---------- ---------- ----------

import { StoreEntity } from '../stores/entities/store.entity';
import { WalletEntity } from '../finances/entities/wallet.entity';
import { UserEntity } from '../users/entities/user.entity';
import { PurchaseEntity } from '../purchases/entities/purchase.entity';

export interface MovmentInInterface {
  type: string; // ---> ENUM?
  description: string;
  amount: number;
  user: UserEntity;
  store?: StoreEntity;
  wallet?: WalletEntity;
  purchase?: PurchaseEntity;
}
