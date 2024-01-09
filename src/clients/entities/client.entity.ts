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
import { PhonesEntity } from '../../phones/entities/phones.entity';
import { EmailsEntity } from '../../emails/entities/emails.entity';
import { PurchaseEntity } from '../../purchases/entities/purchase.entity';
import { DirectionsEntity } from 'src/directions/entities/directions.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';

@Entity({ name: 'clients' })
export class ClientEntity extends BaseEntity implements IClient {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  dni: string;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToMany(() => EmailsEntity, (emails) => emails.client)
  emails?: EmailsEntity[];

  @OneToMany(() => PhonesEntity, (phones) => phones.client)
  phones?: PhonesEntity[];

  @OneToMany(() => PurchaseEntity, (purchases) => purchases.client)
  purchases?: PurchaseEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.clientsIncludes)
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @ManyToOne(() => DirectionsEntity, (direction) => direction.clients)
  @JoinColumn({ name: 'direction_id' })
  direction!: DirectionsEntity;

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
