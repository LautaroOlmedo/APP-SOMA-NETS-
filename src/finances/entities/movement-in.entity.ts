import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { PurchaseEntity } from '../../purchases/entities/purchase.entity';
import { WalletEntity } from './wallet.entity';
import { StoreEntity } from '../../stores/entities/store.entity';

@Entity({ name: 'movment_in' })
export class MovmentInEntity extends BaseEntity {
  @Column()
  reason: string;

  @Column({ default: 0.0 })
  total: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToOne(() => PurchaseEntity, (purchase) => purchase.movmentIn)
  purchase?: PurchaseEntity;

  @OneToOne(() => WalletEntity, (wallet) => wallet.movmentIn)
  @JoinColumn({ name: 'wallet_id' })
  wallet?: WalletEntity;

  @ManyToOne(() => StoreEntity, (store) => store.movmentsIn)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;
}
