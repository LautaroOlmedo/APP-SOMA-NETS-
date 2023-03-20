import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { IUser } from '../../interfaces/user.interface';
import { ROLES } from '../../constants/roles';
import { StoreUsersEntity } from '../../stores/entities/store-users.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';
import { CountryEntity } from '../../countries/entities/country.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { UserDirectionsEntity } from '../../direction/entities/user-directions.entity';
import { UserEmailsEntity } from '../../emails/entities/user-emails.entity';

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

  @OneToMany(() => UserEmailsEntity, (emails) => emails.user)
  emails?: UserEmailsEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.users)
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @ManyToOne(() => UserDirectionsEntity, (direction) => direction.users)
  @JoinColumn({ name: 'direction_id' })
  direction!: UserDirectionsEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.users)
  @JoinColumn({ name: 'department_id' })
  department!: DepartmentEntity;

  @ManyToOne(() => ProvinceEntity, (province) => province.users)
  @JoinColumn({ name: 'province_id' })
  province!: ProvinceEntity;

  @ManyToOne(() => CountryEntity, (country) => country.users)
  @JoinColumn({ name: 'country_id' })
  country!: CountryEntity;
}
