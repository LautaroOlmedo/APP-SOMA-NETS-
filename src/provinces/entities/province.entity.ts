import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------
import { BaseEntity } from '../../config/base.entity';
import { IProvince } from '../../interfaces/province.interface';
import { UserEntity } from '../../users/entities/user.entity';
import { CountryEntity } from '../../countries/entities/country.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity({ name: 'provinces' })
export class ProvinceEntity extends BaseEntity implements IProvince {
  @Column()
  provinceKey!: number;

  @Column()
  provinceName!: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => UserEntity, (users) => users.province)
  users?: UserEntity[];

  @OneToMany(() => ClientEntity, (clients) => clients.province)
  clients?: ClientEntity[];

  @OneToMany(() => DepartmentEntity, (departments) => departments.province)
  departments?: DepartmentEntity[];

  @ManyToOne(() => CountryEntity, (country) => country.provinces)
  @JoinColumn({ name: 'country_id' })
  country?: CountryEntity;
}
