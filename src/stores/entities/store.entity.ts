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
import { StoreInterface } from '../../interfaces/store.interface';
import { StoreUsersEntity } from './store-users.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';
import { EmailsEntity } from '../../emails/entities/emails.entity';
import { StoreClientsEntity } from './store-clients.entity';
import { PhonesEntity } from '../../phones/entities/phones.entity';
import { StockEntity } from '../../stocks/entities/stock.entity';
import { PurchaseEntity } from '../../purchases/entities/purchase.entity';
import { StoreSuppliersEntity } from './store-suppliers.entity';
import { StoreWalletsEntity } from './store-wallets.entity';

@Entity({ name: 'stores' })
export class StoreEntity extends BaseEntity implements StoreInterface {
  @Column()
  storeName: string;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToMany(() => StoreUsersEntity, (storesUsers) => storesUsers.store)
  usersIncludes: StoreUsersEntity[];

  @OneToMany(() => StoreClientsEntity, (storesClients) => storesClients.store)
  clientsIncludes: StoreClientsEntity[];

  @OneToMany(() => StoreWalletsEntity, (storesWallets) => storesWallets.store)
  walletsIncludes: StoreWalletsEntity[];

  @OneToMany(
    () => StoreSuppliersEntity,
    (storesSupplier) => storesSupplier.store,
  )
  suppliersIncludes: StoreSuppliersEntity[];

  @OneToMany(() => EmailsEntity, (emails) => emails.store)
  emails?: EmailsEntity[];

  @OneToMany(() => PhonesEntity, (phones) => phones.store)
  phones?: PhonesEntity[];

  @OneToMany(() => StockEntity, (stock) => stock.store)
  stockIncludes?: StockEntity[];

  @OneToOne(() => PurchaseEntity, (purchases) => purchases.store)
  purchases: PurchaseEntity[];

  /*@ManyToOne(() => StoreDirectionsEntity, (direction) => direction.stores)
  @JoinColumn({ name: 'direction_id' })
  direction?: StoreDirectionsEntity;*/

  @ManyToOne(() => BrandEntity, (brand) => brand.stores)
  @JoinColumn({ name: 'brand_id' })
  brand!: BrandEntity;
}
