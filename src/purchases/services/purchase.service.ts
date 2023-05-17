import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------

import { PurchaseEntity } from '../entities/purchase.entity';
import { paymentMethod, transactionStatus } from '../../constants';
import { ClientEntity } from '../../clients/entities/client.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ErrorManager } from '../../utils/error.manager';
import { StoreEntity } from '../../stores/entities/store.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
  ) {}

  public async findAllPurchases(): Promise<PurchaseEntity[]> {
    try {
      const purchases: PurchaseEntity[] = await this.purchaseRepository.find();
      if (purchases.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return purchases;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async createPurchase(
    user: UserEntity,
    client: ClientEntity,
    store: StoreEntity,
    paymentMethod: paymentMethod,
    status: transactionStatus,
  ): Promise<PurchaseEntity> {
    try {
      const newPurchase = this.purchaseRepository.create({
        user,
        client,
        store,
        paymentMethod,
        status,
      });
      return await this.purchaseRepository.save(newPurchase);
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
