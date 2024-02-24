import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseEntity } from '../entities/purchase.entity';
import { ErrorManager } from '../../utils/error.manager';
import { PurchaseDTO } from '../dto/purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async findAllPurchases(
    storeID: string,
  ): Promise<PurchaseEntity[] | ErrorManager> {
    try {
      const purchases: PurchaseEntity[] = await this.purchaseRepository
        .createQueryBuilder('purchase')
        .leftJoinAndSelect('purchase.movmentIn', 'movmentInInclude')
        .leftJoinAndSelect('purchase.user', 'userInclude')
        .leftJoinAndSelect('purchase.client', 'clientInclude')
        .leftJoinAndSelect('purchase.store', 'storeInclude')
        .where('purchase.store = :storeID', { storeID })
        .getMany();
      return purchases;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async createPurchase(body: PurchaseDTO): Promise<void | ErrorManager> {
    // ---> validate user, client, store, movment
    const queryRunner = this.dataSource.createQueryRunner();
    const { user, client, store, paymentMethod, status, movmentIn } = body;
    try {
      queryRunner.connect();
      queryRunner.startTransaction();
      const newPurchase = this.purchaseRepository.create({
        user,
        client,
        store, // ---> store in movmentIn?
        paymentMethod,
        status,
        movmentIn,
      });
      await this.purchaseRepository.save(newPurchase);
      await queryRunner.commitTransaction();
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
      throw ErrorManager.createSignatureError(e.message);
    } finally {
      queryRunner.release();
    }
  }
}
