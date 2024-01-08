import { Column, Entity, ManyToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { StockEntity } from './stock.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { StockProductInterface } from '../../interfaces/stock-products.interface';

@Entity({ name: 'stocks_products' })
export class StockProductsEntity
  extends BaseEntity
  implements StockProductInterface
{
  @Column({ type: 'integer', default: 10 })
  quantity: number;
  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => ProductEntity, (product) => product.stocksIncludes)
  product: ProductEntity;

  @ManyToOne(() => StockEntity, (stock) => stock.productsIncludes)
  stock: StockEntity;
}
