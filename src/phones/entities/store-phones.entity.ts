import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { StoreEntity } from '../../stores/entities/store.entity';

@Entity({ name: 'stores_phones' })
export class StorePhonesEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  phoneNumber: string;
  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => StoreEntity, (store) => store.phones)
  @JoinColumn({ name: 'store_id' })
  store!: StoreEntity;
}
