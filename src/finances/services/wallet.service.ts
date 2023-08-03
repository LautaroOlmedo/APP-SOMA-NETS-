import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { WalletEntity } from '../entities/wallet.entity';
import { StoreWalletDTO, WalletDTO } from '../dto/wallet.dto';
import { ErrorManager } from '../../utils/error.manager';
import { StoresService } from '../../stores/services/stores.service';
import { StoreEntity } from '../../stores/entities/store.entity';
import { StoreWalletsEntity } from '../../stores/entities/store-wallet.entity';
import { BrandsService } from '../../brands/services/brands.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    @InjectRepository(WalletEntity)
    private readonly storeWalletsRepository: Repository<StoreWalletsEntity>,
    private readonly dataSource: DataSource,
    private readonly brandsService: BrandsService,
    private readonly storesService: StoresService,
  ) {}

  public async findWallet(id: string) {}

  public async createWallet(
    body: WalletDTO,
  ): Promise<WalletEntity | ErrorManager> {
    let { brand, walletType, totalAcount, storesIncludes } = body;

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      // if ((await this.storesService.validateStores(storesIncludes)) !== null) {
      //   throw new ErrorManager({
      //     type: 'BAD_REQUEST',
      //     message: 'No se encontró la tienda',
      //   });
      // } else if ((await this.brandsService.findOneBrand(brand.id)) == null) {
      //   throw new ErrorManager({
      //     type: 'BAD_REQUEST',
      //     message: 'No se encontró la marca',
      //   });
      // }

      const newWallet: WalletEntity = this.walletRepository.create({
        walletType: walletType,
        totalAcount: totalAcount,
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

  public async relationToStore(
    body: StoreWalletDTO,
  ): Promise<ErrorManager | null> {
    try {
      await this.storeWalletsRepository.save(body);

      return null;
    } catch (e) {
      console.log(e);
    }
  }
}
