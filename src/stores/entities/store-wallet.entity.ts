import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

import { StoreEntity } from './store.entity';

@Entity({ name: 'stores_wallets' })
export class StoreWalletsEntity extends BaseEntity {
  // ---------- ---------- RELATIONS ---------- ----------

  // @ManyToOne(() => WalletEntity, (wallet) => wallet.storesIncludes)
  // wallet: WalletEntity;

  @ManyToOne(() => StoreEntity, (store) => store.walletsIncludes)
  store: StoreEntity;
}
