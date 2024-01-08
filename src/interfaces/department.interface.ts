// ---------- ---------- ---------- ---------- ----------

import { ClientEntity } from '.././clients/entities/client.entity';
import { DirectionsEntity } from '.././directions/entities/directions.entity';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { UserEntity } from '.././users/entities/user.entity';

export interface DepartmentInterface {
  departmentKey: number;
  departmentName: string;
  users?: UserEntity[];
  clients?: ClientEntity[];
  directions?: DirectionsEntity[];
  province: ProvinceEntity;
}
