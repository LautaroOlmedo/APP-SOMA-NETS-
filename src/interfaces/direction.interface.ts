// ---------- ---------- ---------- ---------- ----------

import { ClientEntity } from '.././clients/entities/client.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { UserEntity } from '.././users/entities/user.entity';

export interface DirectionInterface {
  direction: string;
  users?: UserEntity[];
  clients?: ClientEntity[];
  department?: DepartmentEntity;
}
