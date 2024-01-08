// ---------- ---------- ---------- ---------- ----------

import { ClientEntity } from 'src/clients/entities/client.entity';
import { StoreEntity } from 'src/stores/entities/store.entity';
import { SupplierEntity } from 'src/suppliers/entities/supplier.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export interface PhoneInterface {
  phoneNumber: string;
  user?: UserEntity;
  store?: StoreEntity;
  client?: ClientEntity;
  supplier?: SupplierEntity;
}
