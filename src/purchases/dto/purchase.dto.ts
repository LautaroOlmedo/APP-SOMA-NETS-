import {
  IsBoolean,
  isEnum,
  IsEnum,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Expose } from 'class-transformer';

// ---------- ---------- ---------- ---------- ----------
import { UserEntity } from '../../users/entities/user.entity';
import { PurchaseProductsEntity } from '../entities/purchase-product.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

import { paymentMethod, transactionStatus } from '../../constants';
import { StoreEntity } from '../../stores/entities/store.entity';
import { WalletEntity } from '../../finances/entities/wallet.entity';
import { MovmentInEntity } from '../../finances/entities/movement-in.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

export class PurchaseDTO {
  // @IsNotEmpty()
  // @IsEnum(transactionStatus)
  // status: transactionStatus;

  @IsNotEmpty()
  @IsEnum(paymentMethod)
  paymentMethod: paymentMethod;

  @IsNotEmpty()
  @IsInt()
  quantityOfProducts: number;

  // @IsNotEmpty()
  // @IsNumber()
  // totalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  totalPaid: number;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @Expose()
  user: UserEntity;

  @Expose()
  client: ClientEntity;

  @Expose()
  product: ProductEntity;

  @Expose()
  wallet: WalletEntity;

  @Expose()
  store: StoreEntity;
}
