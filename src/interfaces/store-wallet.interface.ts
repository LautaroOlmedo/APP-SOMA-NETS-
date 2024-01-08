// ---------- ---------- ---------- ---------- ----------

import { WalletEntity } from '../finances/entities/wallet.entity';
import { StoreEntity } from '../stores/entities/store.entity';

export interface StoreWalletInterface {
  wallet: WalletEntity;
  store: StoreEntity;
}
