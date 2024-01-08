import { Entity, ManyToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { WalletEntity } from '../../finances/entities/wallet.entity';
import { StoreEntity } from './store.entity';
import { StoreWalletInterface } from '../../interfaces/store-wallet.interface';

@Entity({ name: 'stores_wallets' })
export class StoreWalletsEntity
  extends BaseEntity
  implements StoreWalletInterface
{
  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => WalletEntity, (wallet) => wallet.storesIncludes)
  wallet: WalletEntity;

  @ManyToOne(() => StoreEntity, (store) => store.walletsIncludes)
  store: StoreEntity;
}
