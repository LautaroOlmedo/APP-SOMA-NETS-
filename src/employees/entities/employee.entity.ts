import { Column, Entity } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'employees' })
export class EmployeeEntity extends BaseEntity {
  @Column()
  name: string;
}
