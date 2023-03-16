import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------
import { BaseEntity } from '../../config/base.entity';
import { IProvince } from '../../interfaces/province.interface';
import { UserEntity } from '../../users/entities/user.entity';
import { CountryEntity } from '../../countries/entities/country.entity';

@Entity({ name: 'provinces' })
export class ProvinceEntity extends BaseEntity implements IProvince {
  @Column()
  provinceKey!: number;

  @Column()
  provinceName!: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => UserEntity, (users) => users.province)
  users?: UserEntity[];

  /*@OneToMany(() => StoreEntity, (stores) => stores.country)
  stores?: StoreEntity[];*/

  @ManyToOne(() => CountryEntity, (country) => country.provinces)
  @JoinColumn({ name: 'country_id' })
  country?: CountryEntity;
}
