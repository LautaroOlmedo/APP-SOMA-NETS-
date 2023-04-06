import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'users_phones' })
export class UserPhonesEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  phoneNumber: string;
  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => UserEntity, (user) => user.phones)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
