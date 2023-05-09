import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { StoreEntity } from '../../stores/entities/store.entity';

@Entity({ name: 'emails' })
export class EmailsEntity extends BaseEntity {
  @Column()
  email: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => UserEntity, (user) => user.emails)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.emails)
  @JoinColumn({ name: 'store_id' })
  store?: StoreEntity;

  @ManyToOne(() => ClientEntity, (client) => client.emails)
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;
}
