import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { BrandEntity } from 'src/brands/entities/brand.entity';
import { StoreWalletsEntity } from 'src/stores/entities/store-wallet.entity';

@Entity({ name: 'wallets' })
export class WalletEntity extends BaseEntity {
  @Column()
  walletName: string;

  @Column({type: 'float', default: 0.00})
  totalAcount: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToMany(() => StoreWalletsEntity, (storesWallet) => storesWallet.wallet)
  storesIncludes: StoreWalletsEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.wallets)
  @JoinColumn({ name: 'brand_id' })
  brand!: BrandEntity;

  
}
