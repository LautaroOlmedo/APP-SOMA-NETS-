import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { StoreEntity } from '../../stores/entities/store.entity';

@Entity({ name: 'stores_emails' })
export class StoreEmailsEntity extends BaseEntity {
  @Column()
  phoneNumber: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => StoreEntity, (store) => store.emails)
  @JoinColumn({ name: 'store_id' })
  store!: StoreEntity;
}
