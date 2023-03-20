import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { IStore } from '../../interfaces/store.interface';
import { StoreUsersEntity } from './store-users.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';
import { StoreDirectionsEntity } from '../../direction/entities/store-directions.entity';
import { StoreEmailsEntity } from '../../emails/entities/store-emails.entity';

@Entity({ name: 'stores' })
export class StoreEntity extends BaseEntity implements IStore {
  @Column()
  storeName: string;

  // ---------- ---------- RELATIONS ---------- ----------
  @OneToMany(() => StoreUsersEntity, (storesUsers) => storesUsers.store)
  usersIncludes: StoreUsersEntity[];

  @ManyToOne(() => StoreDirectionsEntity, (direction) => direction.stores)
  @JoinColumn({ name: 'direction_id' })
  direction?: StoreDirectionsEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.stores)
  @JoinColumn({ name: 'brand_id' })
  brand!: BrandEntity;

  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => StoreEmailsEntity, (emails) => emails.store)
  emails?: StoreEmailsEntity[];
}
