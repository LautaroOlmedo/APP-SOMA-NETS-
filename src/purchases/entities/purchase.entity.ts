import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { PurchaseProductsEntity } from './purchase-product.entity';
import { paymentMethod, transactionStatus } from '../../constants/index';
import { ClientEntity } from '../../clients/entities/client.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { PurchaseInterface } from '../../interfaces/purchase.interface';
import { MovmentInEntity } from '../../finances/entities/movement-in.entity';
import { WalletEntity } from '../../finances/entities/wallet.entity';

@Entity({ name: 'purchases' })
export class PurchaseEntity extends BaseEntity implements PurchaseInterface {
  @Column({
    type: 'enum',
    enum: transactionStatus,
    default: transactionStatus.PENDING,
  })
  status!: transactionStatus;

  @Column({ type: 'enum', enum: paymentMethod, default: paymentMethod.CASH })
  paymentMethod!: paymentMethod;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToOne(() => MovmentInEntity, (movmentIn) => movmentIn.purchase)
  @JoinColumn({ name: 'movment_in_id' })
  movmentIn: MovmentInEntity;

  @ManyToOne(() => UserEntity, (user) => user.purchases)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => ClientEntity, (client) => client.purchases)
  @JoinColumn({ name: 'client_id' })
  client!: ClientEntity;

  // @ManyToOne(() => StoreEntity, (store) => store.purchases)
  // @JoinColumn({ name: 'store_id' })
  // store: StoreEntity;

  // @ManyToOne(() => WalletEntity, (wallet) => wallet.purchases)
  // @JoinColumn({ name: 'store_id' })
  // wallet: WalletEntity;

  @OneToMany(
    () => PurchaseProductsEntity,
    (purchaseProduct) => purchaseProduct.purchase,
  )
  purchaseProduct: PurchaseProductsEntity[];
}
