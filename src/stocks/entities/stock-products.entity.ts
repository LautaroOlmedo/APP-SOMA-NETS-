import { Column, Entity, ManyToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { StockEntity } from './stock.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'stocks_products' })
export class StockProductsEntity extends BaseEntity {
  @Column({ type: 'integer', default: 10 })
  quantity: number;
  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => ProductEntity, (product) => product.stocksIncludes)
  product: ProductEntity;

  @ManyToOne(() => StockEntity, (stock) => stock.productsIncludes)
  stock: StockEntity;
}
