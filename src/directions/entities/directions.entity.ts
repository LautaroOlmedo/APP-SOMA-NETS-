import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { SupplierEntity } from 'src/suppliers/entities/supplier.entity';
import { StoreEntity } from 'src/stores/entities/store.entity';

@Entity({ name: 'directions' })
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
