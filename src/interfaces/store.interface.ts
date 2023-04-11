import { StoreUsersEntity } from 'src/stores/entities/store-users.entity';

export interface IStore {
  storeName: string;
  //sucursal: string ?
  usersIncludes: StoreUsersEntity[];
}
