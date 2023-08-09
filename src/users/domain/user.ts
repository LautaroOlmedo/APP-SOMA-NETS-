import { IUser } from 'src/interfaces/user.interface';
import { StoreUsersEntity } from 'src/stores/entities/store-users.entity';

export class User implements IUser {
  firstname: string;
  lastname: string;
  age: number;
  username: string;
  dni: string;
  password: string;
  role: string;
  storesIncludes: StoreUsersEntity[];
}
