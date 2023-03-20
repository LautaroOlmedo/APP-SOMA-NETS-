import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';

@Entity({ name: 'stores_directions' })
export class StoreDirectionsEntity extends BaseEntity {
  @Column()
  direction: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => StoreEntity, (stores) => stores.direction)
  stores?: StoreEntity[];

  @ManyToOne(() => DepartmentEntity, (department) => department.storesDirection)
  @JoinColumn({ name: 'department_id' })
  department!: DepartmentEntity;
}
