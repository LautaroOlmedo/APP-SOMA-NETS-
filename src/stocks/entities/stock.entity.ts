import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { StoreEntity } from '../../stores/entities/store.entity';

@Entity({ name: 'stock' })
export class StockEntity extends BaseEntity {
  @Column({ type: 'integer' })
  availableQuantity: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => ProductEntity, (product) => product.stock)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => StoreEntity, (store) => store.stock)
  @JoinColumn({ name: 'store_id' })
  store: ProductEntity;
}
