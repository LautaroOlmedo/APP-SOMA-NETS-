import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { StockProductsEntity } from './stock-products.entity';

@Entity({ name: 'stock' })
export class StockEntity extends BaseEntity {
  @Column({ type: 'integer' })
  availableQuantity: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToMany(() => StockProductsEntity, (stockProducts) => stockProducts.stock)
  productsIncludes: StockProductsEntity[];

  @ManyToOne(() => StoreEntity, (store) => store.stock)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;
}
