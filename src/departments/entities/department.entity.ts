import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserDirectionsEntity } from '../../direction/entities/user-directions.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { StoreDirectionsEntity } from '../../direction/entities/store-directions.entity';

@Entity({ name: 'departments' })
export class DepartmentEntity extends BaseEntity {
  @Column()
  departmentKey!: number;

  @Column()
  departmentName!: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => UserEntity, (users) => users.department)
  users?: UserEntity[];

  @OneToMany(() => UserDirectionsEntity, (directions) => directions.department)
  usersDirections?: UserDirectionsEntity[];

  @OneToMany(() => StoreDirectionsEntity, (stores) => stores.department)
  storesDirection?: StoreDirectionsEntity[];

  @ManyToOne(() => ProvinceEntity, (province) => province.departments)
  @JoinColumn({ name: 'province_id' })
  province!: ProvinceEntity;
}
