import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'users_emails' })
export class UserEmailsEntity extends BaseEntity {
  @Column()
  email: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => UserEntity, (user) => user.emails)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
