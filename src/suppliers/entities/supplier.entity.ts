import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { StoreSuppliersEntity } from '../../stores/entities/store-suppliers.entity';
import { PhonesEntity } from '../../phones/entities/phones.entity';
import { EmailsEntity } from 'src/emails/entities/emails.entity';

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

  @OneToMany(() => PhonesEntity, (phones) => phones.supplier)
  phones?: PhonesEntity[];

  @OneToMany(() => EmailsEntity, (emails) => emails.supplier)
  emails?: EmailsEntity[];
}
