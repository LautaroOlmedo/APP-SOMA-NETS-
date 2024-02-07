import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseEntity } from '../entities/purchase.entity';
import { paymentMethod, transactionStatus } from '../../constants';
import { ClientEntity } from '../../clients/entities/client.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ErrorManager } from '../../utils/error.manager';
import { StoreEntity } from '../../stores/entities/store.entity';
import { WalletEntity } from '../../finances/entities/wallet.entity';
import { PurchaseDTO } from '../dto/purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
    private readonly dataSource: DataSource,
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

  public async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    const { user, client, store, paymentMethod, status, movmentIn } = body;
    try {
      queryRunner.connect();
      queryRunner.startTransaction();
      const newPurchase = this.purchaseRepository.create({
        user,
        client,
        store,
        paymentMethod,
        status,
        movmentIn,
      });
      await this.purchaseRepository.save(newPurchase);
      await queryRunner.commitTransaction();
      return newPurchase;
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
      throw ErrorManager.createSignatureError(e.message);
    } finally {
      queryRunner.release();
    }
  }
}
