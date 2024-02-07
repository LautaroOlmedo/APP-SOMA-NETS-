import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ErrorManager } from '../../utils/error.manager';
import { WalletEntity } from '../entities/wallet.entity';
import { WalletDTO } from '../dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async findAllWallets() {}

  public async findOneWallet(id: string): Promise<WalletEntity | ErrorManager> {
    try {
      const wallet = this.walletRepository
        .createQueryBuilder('walllet')
        .where({ id })
        .getOne();
      if (!wallet) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró la billetera',
        });
      }
      return wallet;
    } catch (e) {
      throw new ErrorManager.createSignatureError(e.message);
    }
  }

  public async findByUniqueValues(
    body: WalletDTO,
  ): Promise<boolean | ErrorManager> {
    const { walletName } = body;
    try {
      const storeAlreadyExists: WalletEntity =
        await this.walletRepository.findOne({
          where: [{ walletName }],
        });

      if (storeAlreadyExists !== null) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El nombre de la billetera está en uso',
        });
      }
      return true;
    } catch (e) {
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    }
  }

  public async createWallet(body: WalletDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      if (await this.findByUniqueValues(body)) {
        return await this.findByUniqueValues(body);
      }
      queryRunner.connect();
      queryRunner.startTransaction();

      await this.walletRepository.save(body);

      await queryRunner.commitTransaction();
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
      throw ErrorManager.createSignatureError(e.message);
    } finally {
      queryRunner.release();
    }
  }

  public async getBalance(walletID: string): Promise<number | ErrorManager> {
    try {
      const wallet = await this.walletRepository
        .createQueryBuilder('wallet')
        .where({ walletID })
        .getOne();

      if (!wallet) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se econtró la billetera',
        });
      }
      return wallet.availableBalance;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async addBalance(
    balance: number,
    walletID: string,
  ): Promise<void | ErrorManager> {
    try {
      const wallet = await this.walletRepository
        .createQueryBuilder('wallet')
        .where({ walletID })
        .getOne();

      if (!wallet) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se econtró la billetera',
        });
      }
      wallet.availableBalance += balance;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async subtractBalance(
    balance: number,
    walletID: string,
  ): Promise<void | ErrorManager> {
    try {
      const wallet = await this.walletRepository
        .createQueryBuilder('wallet')
        .where({ walletID })
        .getOne();

      if (!wallet) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se econtró la billetera',
        });
      }
      if (wallet.availableBalance - balance < 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No tenés suficiente saldo',
        });
      }
      wallet.availableBalance - balance;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
