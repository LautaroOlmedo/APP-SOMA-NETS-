import { Column, Entity, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { ICountry } from '../../interfaces/country.interface';
import { ProvinceEntity } from '../../provinces/entities/province.entity';

@Entity({ name: 'countries' })
export class CountryEntity extends BaseEntity implements ICountry {
  @Column()
  countryKey!: number;

  @Column()
  countryName!: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => UserEntity, (users) => users.country)
  users?: UserEntity[];

  /*@OneToMany(() => StoreEntity, (stores) => stores.country)
  stores?: StoreEntity[];*/

  @OneToMany(() => ProvinceEntity, (provinces) => provinces.country)
  provinces?: ProvinceEntity[];
}
