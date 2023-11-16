import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ErrorManager } from '../../utils/error.manager';
import { WalletEntity } from '../entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async findAllWallets() {}

  public async createWallet() {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    } finally {
      queryRunner.release();
    }
  }
}
