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
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    } finally {
      queryRunner.release();
    }
  }
}
