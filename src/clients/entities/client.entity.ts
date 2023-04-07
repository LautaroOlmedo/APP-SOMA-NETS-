import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { IClient } from '../../interfaces/client.interface';
import { CountryEntity } from '../../countries/entities/country.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { StoreClientsEntity } from '../../stores/entities/store-clients.entity';
import { ClientsPhonesEntity } from '../../phones/entities/client-phones.entity';
import { ClientsEmailsEntity } from '../../emails/entities/client-emails.entity';
import { PurchaseEntity } from '../../purchases/entities/purchase.entity';

@Entity({ name: 'clients' })
export class ClientEntity extends BaseEntity implements IClient {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  dni: string;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToMany(() => ClientsEmailsEntity, (emails) => emails.client)
  emails?: ClientsEmailsEntity[];

  @OneToMany(() => ClientsPhonesEntity, (phones) => phones.client)
  phones?: ClientsPhonesEntity[];

  @OneToMany(() => PurchaseEntity, (purchases) => purchases.client)
  purchases?: PurchaseEntity[];

  //@ManyToOne(() => BrandEntity, (brand) => brand.users)
  //@JoinColumn({ name: 'brand_id' })
  //brand?: BrandEntity;

  //@ManyToOne(() => UserDirectionsEntity, (direction) => direction.users)
  //@JoinColumn({ name: 'direction_id' })
  //direction!: UserDirectionsEntity;

  @OneToMany(() => StoreClientsEntity, (storesClients) => storesClients.client)
  storesIncludes: StoreClientsEntity[];

  @ManyToOne(() => DepartmentEntity, (department) => department.clients)
  @JoinColumn({ name: 'department_id' })
  department!: DepartmentEntity;

  @ManyToOne(() => ProvinceEntity, (province) => province.clients)
  @JoinColumn({ name: 'province_id' })
  province!: ProvinceEntity;

  @ManyToOne(() => CountryEntity, (country) => country.clients)
  @JoinColumn({ name: 'country_id' })
  country!: CountryEntity;
}
