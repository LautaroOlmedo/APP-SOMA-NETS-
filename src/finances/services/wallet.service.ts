import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { WalletEntity } from '../entities/wallet.entity';
import { StoreWalletDTO, WalletDTO } from '../dto/wallet.dto';
import { ErrorManager } from '../../utils/error.manager';
import { StoreWalletsEntity } from '../../stores/entities/store-wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    @InjectRepository(WalletEntity)
    private readonly storeWalletsRepository: Repository<StoreWalletsEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async findAllWallets(): Promise<WalletEntity[] | ErrorManager> {
    try {
      const wallets = await this.walletRepository.find();
      return wallets;
    } catch (e) {
      console.log(e);
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'No se pudo crear la billetera',
      });
    }
  }

  public async createWallet(
    body: WalletDTO,
  ): Promise<WalletEntity | ErrorManager> {
    let { brand, walletName } = body;

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const newWallet: WalletEntity = this.walletRepository.create({
        walletName: walletName,
        brand: brand,
      });
      await this.walletRepository.save(newWallet);

      //await this.relationToStore(newWallet, storesIncludes);

      await queryRunner.commitTransaction();
      return newWallet;
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'No se pudo crear la billetera',
      });
    } finally {
      await queryRunner.release();
    }
  }

  // ---------- ----------  RELATIONS  ---------- ----------

  public async relationToStore(body: StoreWalletDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.startTransaction();
      await this.storeWalletsRepository.save(body);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'No se pudo crear la billetera',
      });
    } finally {
      await queryRunner.release();
    }
  }
}
