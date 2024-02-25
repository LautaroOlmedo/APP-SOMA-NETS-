import { BrandEntity } from '.././brands/entities/brand.entity';
import { CountryEntity } from '.././countries/entities/country.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { DirectionsEntity } from '.././directions/entities/directions.entity';
import { EmailsEntity } from '.././emails/entities/emails.entity';
import { PhonesEntity } from '.././phones/entities/phones.entity';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';
import { StoreClientsEntity } from '.././stores/entities/store-clients.entity';

export interface ClientInterface {
  firstname: string;
  lastname: string;
  dni: string;
  emails?: EmailsEntity[];
  phones?: PhonesEntity[];
  purchases?: PurchaseEntity[];
  brand?: BrandEntity;
  direction?: DirectionsEntity;
  storesIncludes?: StoreClientsEntity[];
  department?: DepartmentEntity;
  province?: ProvinceEntity;
  country?: CountryEntity;
}
