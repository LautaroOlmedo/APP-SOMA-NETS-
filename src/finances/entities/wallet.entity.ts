import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';
import { StoreWalletsEntity } from '../../stores/entities/store-wallets.entity';
import { WallletInterface } from 'src/interfaces/wallet.interface';
import { PurchaseProductsEntity } from '../../purchases/entities/purchase-product.entity';
import { MovmentInEntity } from './movement-in.entity';
import { MovmentOutEntity } from './movement-out.entity';

@Entity({ name: 'wallets' })
export class WalletEntity extends BaseEntity implements WallletInterface {
  @Column()
  walletName: string;

  @Column({ type: 'float' })
  availableBalance: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToMany(() => StoreWalletsEntity, (storesWallets) => storesWallets.wallet)
  storesIncludes: StoreWalletsEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.usersIncludes)
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @OneToOne(
    () => PurchaseProductsEntity,
    (purchaseProduct) => purchaseProduct.wallet,
  )
  purchaseProduct?: PurchaseProductsEntity;

  @OneToOne(() => MovmentInEntity, (movmentIn) => movmentIn.wallet)
  movmentIn?: MovmentInEntity;

  @OneToOne(() => MovmentOutEntity, (movmentOut) => movmentOut.wallet)
  movmentOut?: MovmentOutEntity;
}
