import { Column, Entity, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { IBrand } from '../../interfaces/brand.interface';
import { UserEntity } from '../../users/entities/user.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { WalletEntity } from '../../finances/entities/wallet.entity';

@Entity({ name: 'brands' })
export class BrandEntity extends BaseEntity implements IBrand {
  @Column({ unique: true })
  brandName: string;

  @Column()
  webSite: string;

  @Column()
  image: string;

  // ---------- ---------- RELATIONS ---------- ----------
  @OneToMany(() => UserEntity, (users) => users.brand)
  users?: UserEntity[];

  @OneToMany(() => WalletEntity, (wallets) => wallets.brand)
  wallets?: WalletEntity[];

  @OneToMany(() => StoreEntity, (stores) => stores.brand)
  stores?: StoreEntity[];
}
