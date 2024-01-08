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
import { UserInterface } from '../../interfaces/user.interface';
import { ROLES } from '../../constants/roles';
import { StoreUsersEntity } from '../../stores/entities/store-users.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';
import { CountryEntity } from '../../countries/entities/country.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { EmailsEntity } from '../../emails/entities/emails.entity';
import { DirectionsEntity } from '../../directions/entities/directions.entity';
import { PhonesEntity } from 'src/phones/entities/phones.entity';
import { PurchaseEntity } from '../../purchases/entities/purchase.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserInterface {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
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

  @OneToMany(() => EmailsEntity, (emails) => emails.user)
  emails?: EmailsEntity[];

  @OneToMany(() => PhonesEntity, (phones) => phones.user)
  phones?: PhonesEntity[];

  @OneToMany(() => PurchaseEntity, (purchases) => purchases.user)
  purchases?: PurchaseEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.users)
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @ManyToOne(() => DirectionsEntity, (direction) => direction.users)
  @JoinColumn({ name: 'direction_id' })
  direction!: DirectionsEntity;

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
