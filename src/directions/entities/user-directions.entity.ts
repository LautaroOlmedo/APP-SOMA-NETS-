import { UserEntity } from '../../users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';

@Entity({ name: 'users_directions' })
export class UserDirectionsEntity extends BaseEntity {
  @Column()
  direction: string;
  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => UserEntity, (users) => users.direction)
  users?: UserEntity[];

  @ManyToOne(() => DepartmentEntity, (department) => department.directions)
  @JoinColumn({ name: 'department_id' })
  department?: DepartmentEntity;
}
