import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { StoreSuppliersEntity } from '../../stores/entities/store-suppliers.entity';

@Entity({ name: 'suppliers' })
export class SupplierEntity extends BaseEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  dni: string;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToMany(
    () => StoreSuppliersEntity,
    (storesSupplier) => storesSupplier.supplier,
  )
  storesIncludes: StoreSuppliersEntity[];
}
