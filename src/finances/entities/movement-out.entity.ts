import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { WalletEntity } from './wallet.entity';

@Entity({ name: 'movment_out' })
export class MovmentOutEntity extends BaseEntity {
  @Column()
  reason: string;

  @Column()
  total: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToOne(() => WalletEntity, (wallet) => wallet.movmentOut)
  @JoinColumn({ name: 'wallet_id' })
  wallet?: WalletEntity;
}
