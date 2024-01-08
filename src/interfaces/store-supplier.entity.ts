// ---------- ---------- ---------- ---------- ----------

import { StoreEntity } from '.././stores/entities/store.entity';
import { SupplierEntity } from '.././suppliers/entities/supplier.entity';

export interface StoreSupplerInterface {
  supplier: SupplierEntity;
  store: StoreEntity;
}
