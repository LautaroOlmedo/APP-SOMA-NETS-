// ---------- ---------- ---------- ---------- ----------

import { ProductEntity } from '.././products/entities/product.entity';
import { StockEntity } from '.././stocks/entities/stock.entity';

export interface StockProductInterface {
  quantity: number;
  product: ProductEntity;
  stock: StockEntity;
}
