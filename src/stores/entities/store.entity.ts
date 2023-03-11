import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { IStore } from 'src/interfaces/store.interface';
import { StoreUsersEntity } from './store-users.entity';
import { BrandEntity } from 'src/brands/entities/brand.entity';

@Entity({ name: 'stores' })
export class StoreEntity extends BaseEntity implements IStore {
  @Column()
  storeName: string;

  // ---------- ---------- RELATIONS ---------- ----------
  @OneToMany(() => StoreUsersEntity, (storesUsers) => storesUsers.store)
  usersIncludes: StoreUsersEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.stores)
  @JoinColumn({ name: 'brand_id' })
  brand!: BrandEntity;
}
