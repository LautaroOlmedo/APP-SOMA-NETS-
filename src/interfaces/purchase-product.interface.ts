import { ProductEntity } from '.././products/entities/product.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';

export interface PurchaseProductInterface {
  quantity_products: number;
  total_price: number;
  purchase: PurchaseEntity;
  product: ProductEntity;
}
