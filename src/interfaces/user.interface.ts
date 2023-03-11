import { StoreUsersEntity } from 'src/stores/entities/store-users.entity';

export interface IUser {
  firstname: string;
  lastname: string;
  age: number;
  username: string;
  dni: string;
  password: string;
  role: string;
  storesIncludes: StoreUsersEntity[];
}
