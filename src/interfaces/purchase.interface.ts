// ---------- ---------- ---------- ---------- ----------

import { ClientEntity } from '.././clients/entities/client.entity';
import { paymentMethod, transactionStatus } from '.././constants';
import { MovmentOutEntity } from '.././finances/entities/movement-out.entity';
import { PurchaseProductsEntity } from '.././purchases/entities/purchase-product.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { UserEntity } from '.././users/entities/user.entity';

export interface PurchaseInterface {
  status: transactionStatus;
  paymentMethod: paymentMethod;
  movementOut: MovmentOutEntity;
  user: UserEntity;
  client: ClientEntity;
  store: StoreEntity;
  purchaseProduct: PurchaseProductsEntity[];
}
