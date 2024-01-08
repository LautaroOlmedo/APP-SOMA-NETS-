import { BrandEntity } from '.././brands/entities/brand.entity';
import { CountryEntity } from '.././countries/entities/country.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { DirectionsEntity } from '.././directions/entities/directions.entity';
import { EmailsEntity } from '.././emails/entities/emails.entity';
import { PhonesEntity } from '.././phones/entities/phones.entity';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';
import { StoreUsersEntity } from '.././stores/entities/store-users.entity';

export interface UserInterface {
  firstname: string;
  lastname: string;
  age: number;
  username: string;
  dni: string;
  password: string;
  role: string;
  active: boolean;
  storesIncludes?: StoreUsersEntity[];
  emails?: EmailsEntity[];
  phones?: PhonesEntity[];
  purchases?: PurchaseEntity[];
  brand?: BrandEntity;
  direction?: DirectionsEntity;
  department?: DepartmentEntity;
  province?: ProvinceEntity;
  country?: CountryEntity;
}
