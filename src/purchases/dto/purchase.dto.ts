import {
  IsBoolean,
  isEnum,
  IsEnum,
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

export class PurchaseDTO {
  @IsNotEmpty()
  @IsEnum(transactionStatus)
  status: transactionStatus;

  @IsNotEmpty()
  @IsEnum(paymentMethod)
  paymentMethod: paymentMethod;

  @Expose()
  user: UserEntity;

  @Expose()
  client: ClientEntity;

  @Expose()
  purchaseProduct: PurchaseProductsEntity;

  @Expose()
  wallet: WalletEntity;

  @Expose()
  movmentIn: MovmentInEntity;

  @Expose()
  store: StoreEntity;
}
