import { Entity, ManyToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { SupplierEntity } from '../../suppliers/entities/supplier.entity';
import { StoreEntity } from './store.entity';
import { StoreSupplerInterface } from '../../interfaces/store-supplier.entity';

@Entity({ name: 'stores_suppliers' })
export class StoreSuppliersEntity
  extends BaseEntity
  implements StoreSupplerInterface
{
  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.storesIncludes)
  supplier: SupplierEntity;

  @ManyToOne(() => StoreEntity, (store) => store.suppliersIncludes)
  store: StoreEntity;
}
