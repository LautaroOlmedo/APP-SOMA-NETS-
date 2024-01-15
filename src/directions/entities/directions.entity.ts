import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { SupplierEntity } from '../../suppliers/entities/supplier.entity';
import { DirectionInterface } from '../../interfaces/direction.interface';

@Entity({ name: 'directions' })
export class DirectionsEntity extends BaseEntity implements DirectionInterface {
  @Column({ nullable: false }) // ---> unique?
  direction!: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => UserEntity, (users) => users.direction)
  users?: UserEntity[];

  @OneToMany(() => ClientEntity, (clients) => clients.direction)
  clients?: ClientEntity[];

  @ManyToOne(() => DepartmentEntity, (department) => department.directions)
  @JoinColumn({ name: 'department_id' })
  department?: DepartmentEntity;
}
