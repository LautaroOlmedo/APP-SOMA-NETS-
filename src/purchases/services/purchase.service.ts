import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------

import { PurchaseEntity } from '../entities/purchase.entity';
import { paymentMethod, transactionStatus } from 'src/constants';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ErrorManager } from 'src/utils/error.manager';

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
    paymentMethod: paymentMethod,
    status: transactionStatus,
  ): Promise<PurchaseEntity> {
    try {
      const newPurchase = this.purchaseRepository.create({
        user,
        client,
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
