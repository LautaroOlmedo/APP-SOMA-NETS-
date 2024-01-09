import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { SupplierEntity } from '../../suppliers/entities/supplier.entity';
import { PhoneInterface } from '../../interfaces/phone.interface';
import { BrandEntity } from '../../brands/entities/brand.entity';

@Entity({ name: 'phones' })
export class PhonesEntity extends BaseEntity implements PhoneInterface {
  @Column({ type: 'varchar' })
  phoneNumber: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => BrandEntity, (brand) => brand.phones)
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @ManyToOne(() => UserEntity, (user) => user.phones)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.phones)
  @JoinColumn({ name: 'store_id' })
  store?: StoreEntity;

  @ManyToOne(() => ClientEntity, (client) => client.phones)
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.phones)
  @JoinColumn({ name: 'supplier_id' })
  supplier?: SupplierEntity;
}
