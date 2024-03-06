import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { PurchaseEntity } from './purchase.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { PurchaseProductInterface } from 'src/interfaces/purchase-product.interface';
import { WalletEntity } from '../../finances/entities/wallet.entity';

@Entity({ name: 'purchase_products' })
export class PurchaseProductsEntity
  extends BaseEntity
  implements PurchaseProductInterface
{
  @Column({ default: 0.0 })
  quantityOfProducts: number;

  @Column({ default: 0.0 })
  totalPrice: number;

  @Column({ default: 0.0 })
  totalPaid: number;

  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
  @JoinColumn({ name: 'purchase_id' })
  purchase: PurchaseEntity;

  @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct)
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

  // @OneToOne(() => WalletEntity, (wallet) => wallet.purchaseProduct)
  // @JoinColumn({ name: 'wallet_id' })
  // wallet?: WalletEntity;
}
