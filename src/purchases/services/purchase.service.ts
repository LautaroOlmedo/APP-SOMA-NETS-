import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { PurchaseEntity } from '../entities/purchase.entity';
import { ErrorManager } from '../../utils/error.manager';
import { PurchaseDTO } from '../dto/purchase.dto';
import { WalletService } from 'src/finances/services/wallet.service';
import { MovmentInService } from 'src/finances/services/movment-in.service';
import { MovmentInEntity } from 'src/finances/entities/movement-in.entity';
import { PurchaseProductsEntity } from '../entities/purchase-product.entity';
import { PurchaseProductService } from './purchase-product.service';
import { transactionStatus } from 'src/constants';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
    private readonly purchaseProductService: PurchaseProductService,
    private readonly walletService: WalletService,
    private readonly movmentInService: MovmentInService,
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
    const {
      user,
      client,
      store,
      paymentMethod,
      reason,
      wallet,
      quantityOfProducts,
      totalPaid,
      product,
    } = body; // product, wallet, quantityOfProducts, totalPrice, totalPaid, reason
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();
      const newPurchase = this.purchaseRepository.create({
        user,
        client,
        paymentMethod,
      });

      let newMovmentIn: MovmentInEntity =
        await this.movmentInService.createMovmentForPurchase(
          reason,
          wallet,
          store,
        );

      let newPurchaseProduct: PurchaseProductsEntity =
        await this.purchaseProductService.createPurchaseProduct(
          quantityOfProducts,
          totalPaid,
          product,
          newPurchase,
        );
      if (newPurchaseProduct.totalPaid == newPurchaseProduct.totalPrice) {
        newPurchase.status = transactionStatus.RELEASED;
      } else {
        newPurchase.status = transactionStatus.PARTIAL;
      }

      newPurchase.movmentIn = newMovmentIn;

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

  private async validatePurchase(): Promise<void> {
    try {
    } catch (e) {}
  }

  private setTaxes(paymentMethod: string): string {
    return '';
  }
}
