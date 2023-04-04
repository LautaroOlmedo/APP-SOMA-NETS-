import { Entity, JoinColumn, ManyToOne } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'user_phones' })
export class UserPhonesEntity extends BaseEntity {
  phoneNumber: string;
  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => UserEntity, (user) => user.phones)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
