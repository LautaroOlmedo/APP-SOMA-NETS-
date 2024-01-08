import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { SupplierEntity } from 'src/suppliers/entities/supplier.entity';
import { StoreEntity } from 'src/stores/entities/store.entity';
import { DirectionInterface } from 'src/interfaces/direction.interface';

@Entity({ name: 'directions' })
export class DirectionsEntity extends BaseEntity implements DirectionInterface {
  @Column({ nullable: false }) // ---> unique?
  direction!: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @OneToMany(() => UserEntity, (users) => users.direction)
  users?: UserEntity[];

  @OneToMany(() => ClientEntity, (client) => client.direction)
  clients?: ClientEntity[];

  // @OneToMany(() => UserEntity, (users) => users.direction)
  // users?: UserEntity[];

  // @OneToMany(() => UserEntity, (users) => users.direction)
  // users?: UserEntity[];

  @ManyToOne(() => DepartmentEntity, (department) => department.directions)
  @JoinColumn({ name: 'department_id' })
  department?: DepartmentEntity;
}
