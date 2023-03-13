import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { IUser } from '../../interfaces/user.interface';
import { ROLES } from '../../constants/roles';
import { StoreUsersEntity } from '../../stores/entities/store-users.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column({ unique: true })
  username: string;

  @Column()
  dni: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @Column({ default: true })
  active: boolean;

  // ---------- ---------- RELATIONS ---------- ----------
  @OneToMany(() => StoreUsersEntity, (storesUsers) => storesUsers.user)
  storesIncludes: StoreUsersEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.users)
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;
}
