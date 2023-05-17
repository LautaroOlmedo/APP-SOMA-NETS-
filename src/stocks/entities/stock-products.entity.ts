import { Entity, ManyToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { StockEntity } from './stock.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'stocks_prodcuts' })
export class StockProductsEntity extends BaseEntity {
  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => ProductEntity, (product) => product.stocksIncludes)
  product: ProductEntity;

  @ManyToOne(() => StockEntity, (stock) => stock.productsIncludes)
  stock: StockEntity;
}
