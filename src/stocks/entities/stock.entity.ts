import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { StockProductsEntity } from './stock-products.entity';
import { StockInterface } from '../../interfaces/stock.interface';

@Entity({ name: 'stock' })
export class StockEntity extends BaseEntity implements StockInterface {
  @Column()
  stockName!: string;
  // ---------- ---------- RELATIONS ---------- ----------

  @OneToMany(() => StockProductsEntity, (stockProducts) => stockProducts.stock)
  productsIncludes: StockProductsEntity[];

  @ManyToOne(() => StoreEntity, (store) => store.stocksIncludes)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;
}
