import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { PurchaseEntity } from '../../purchases/entities/purchase.entity';
import { WalletEntity } from './wallet.entity';

@Entity({ name: 'movment_in' })
export class MovmentInEntity extends BaseEntity {
  @Column()
  reason: string;

  @Column()
  total: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToOne(() => PurchaseEntity, (purchase) => purchase.movmentIn)
  purchase?: PurchaseEntity;

  @OneToOne(() => WalletEntity, (wallet) => wallet.movmentIn)
  @JoinColumn({ name: 'wallet_id' })
  wallet?: WalletEntity;
}
