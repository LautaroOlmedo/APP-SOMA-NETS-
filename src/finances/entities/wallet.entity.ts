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
import { wallet_type } from 'src/constants/enums';
import { StoreWalletsEntity } from 'src/stores/entities/store-wallet.entity';

@Entity({ name: 'wallets' })
export class WalletEntity extends BaseEntity {
  @Column()
  walletType: string;

  @Column()
  totalAcount: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => BrandEntity, (brand) => brand.wallets)
  @JoinColumn({ name: 'brand_id' })
  brand!: BrandEntity;

  @OneToMany(() => StoreWalletsEntity, (storesWallet) => storesWallet.wallet)
  storesIncludes: StoreWalletsEntity[];
}
