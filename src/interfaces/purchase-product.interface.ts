import { ProductEntity } from '.././products/entities/product.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';

export interface PurchaseProductInterface {
  quantityOfProducts: number;
  totalPrice: number;
  purchase: PurchaseEntity;
  product: ProductEntity;
}
