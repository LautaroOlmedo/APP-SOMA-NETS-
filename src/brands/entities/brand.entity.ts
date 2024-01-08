import { Column, Entity, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { BrandInterface } from '../../interfaces/brand.interface';
import { UserEntity } from '../../users/entities/user.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { WalletEntity } from '../../finances/entities/wallet.entity';

@Entity({ name: 'brands' })
export class BrandEntity extends BaseEntity implements BrandInterface {
  @Column({ unique: true })
  brandName: string;

  @Column()
  webSite: string;

  @Column()
  image: string;

  // ---------- ---------- RELATIONS ---------- ----------
  @OneToMany(() => UserEntity, (users) => users.brand)
  usersIncludes?: UserEntity[];

  @OneToMany(() => WalletEntity, (wallets) => wallets.brand)
  wallets?: WalletEntity[];

  @OneToMany(() => StoreEntity, (stores) => stores.brand)
  storesIncludes?: StoreEntity[];
}
