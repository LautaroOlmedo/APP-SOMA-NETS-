import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { UserDirectionsEntity } from '../../directions/entities/user-directions.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity({ name: 'departments' })
export class DepartmentEntity extends BaseEntity {
  @Column()
  departmentKey!: number;

  @Column()
  departmentName!: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => UserEntity, (users) => users.department)
  users?: UserEntity[];

  @OneToMany(() => ClientEntity, (clients) => clients.department)
  clients?: ClientEntity[];

  @OneToMany(() => UserDirectionsEntity, (directions) => directions.department)
  directions?: UserDirectionsEntity[];

  /*@OneToMany(() => StoreDirectionsEntity, (stores) => stores.department)
  storesDirection?: StoreDirectionsEntity[];*/

  @ManyToOne(() => ProvinceEntity, (province) => province.departments)
  @JoinColumn({ name: 'province_id' })
  province!: ProvinceEntity;
}
