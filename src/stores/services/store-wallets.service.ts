import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoreWalletsEntity } from '../entities/store-wallets.entity';
import { ErrorManager } from '../../utils/error.manager';
import { WalletToStoreDTO } from '../dto/store-wallet.dto';

@Injectable()
export class StoreWalletsService {
  constructor(
    @InjectRepository(StoreWalletsEntity)
    private readonly storeWalletService: Repository<StoreWalletsEntity>,

    private readonly dataSource: DataSource,
  ) {}

  public async relationToStore(
    body: WalletToStoreDTO,
  ): Promise<void | ErrorManager> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      await this.storeWalletService.save(body);

      await queryRunner.commitTransaction();
      return;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Error al agregar un usuario a una tienda',
      });
    } finally {
      queryRunner.release();
    }
  }
}
