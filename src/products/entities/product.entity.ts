import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Min, Max } from 'class-validator';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { CategoryEntity } from '../../categories/entities/catogory.entity';
import { PurchaseProductsEntity } from '../../purchases/entities/purchase-product.entity';
import { size, talle } from '../../constants/enums';

import { StockProductsEntity } from '../../stocks/entities/stock-products.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 25 })
  productName!: string;

  @Column({ type: 'varchar', length: 150 })
  description!: string;

  @Column({ type: 'integer' })
  @Min(9)
  @Max(25000)
  price!: number;

  @Column({ type: 'enum', enum: size, nullable: true })
  size: size;

  @Column({ type: 'enum', enum: talle, nullable: true })
  talle: talle;

  // @Column({ type: 'integer' })
  // @Min(10)
  // @Max(2500)
  // quantity: number;

  @Column({ type: 'integer', nullable: false, unique: false })
  code: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @OneToMany(
    () => PurchaseProductsEntity,
    (purchaseProduct) => purchaseProduct.product,
  )
  purchaseProduct: PurchaseProductsEntity[];

  @OneToMany(
    () => StockProductsEntity,
    (stockProducts) => stockProducts.product,
  )
  stocksIncludes: StockProductsEntity[];
}
