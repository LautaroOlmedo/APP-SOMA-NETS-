import { ProductEntity } from '.././products/entities/product.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';

export interface PurchaseProductInterface {
  quantityOfProducts: number;
  totalPrice: number;
  totalPaid: number;
  purchase: PurchaseEntity;
  product: ProductEntity;
}
