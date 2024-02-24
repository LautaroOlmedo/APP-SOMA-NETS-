import { BrandEntity } from '.././brands/entities/brand.entity';
import { EmailsEntity } from '.././emails/entities/emails.entity';
import { PhonesEntity } from '.././phones/entities/phones.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';
import { StockEntity } from '.././stocks/entities/stock.entity';
import { StoreClientsEntity } from '.././stores/entities/store-clients.entity';
import { StoreSuppliersEntity } from '.././stores/entities/store-suppliers.entity';
import { StoreUsersEntity } from '.././stores/entities/store-users.entity';
import { StoreWalletsEntity } from '.././stores/entities/store-wallets.entity';

export interface StoreInterface {
  storeName: string;
  usersIncludes?: StoreUsersEntity[];
  clientsIncludes?: StoreClientsEntity[];
  walletsIncludes?: StoreWalletsEntity[];
  suppliersIncludes: StoreSuppliersEntity[];
  emails?: EmailsEntity[];
  phones?: PhonesEntity[];
  stockIncludes?: StockEntity[];
  // purchases?: PurchaseEntity[];
  brand?: BrandEntity;
}
