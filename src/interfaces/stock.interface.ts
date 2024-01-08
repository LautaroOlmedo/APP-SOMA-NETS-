import { StockProductsEntity } from '.././stocks/entities/stock-products.entity';
import { StoreEntity } from '.././stores/entities/store.entity';

export interface StockInterface {
  stockName: string;
  productsIncludes?: StockProductsEntity[];
  store?: StoreEntity;
}
