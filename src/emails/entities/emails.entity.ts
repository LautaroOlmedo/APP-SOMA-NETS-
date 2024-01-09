import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { SupplierEntity } from '../../suppliers/entities/supplier.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';

@Entity({ name: 'emails' })
export class EmailsEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  email: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => BrandEntity, (brand) => brand.emails)
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @ManyToOne(() => UserEntity, (user) => user.emails)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.emails)
  @JoinColumn({ name: 'store_id' })
  store?: StoreEntity;

  @ManyToOne(() => ClientEntity, (client) => client.emails)
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.phones)
  @JoinColumn({ name: 'supplier_id' })
  supplier?: SupplierEntity;
}
