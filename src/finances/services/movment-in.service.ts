import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { MovmentInEntity } from '../entities/movement-in.entity';
import { ErrorManager } from '../../utils/error.manager';
import { MovmentInDTO } from '../dto/movment-in.dto';
import { WalletService } from './wallet.service';
import { WalletEntity } from '../entities/wallet.entity';

@Injectable()
export class MovmentInService {
  constructor(
    @InjectRepository(MovmentInEntity)
    private readonly movmentInRepository: Repository<MovmentInEntity>,
    private readonly walletService: WalletService,
    private readonly dataSource: DataSource,
  ) {}

  public async findAllMovments(): Promise<MovmentInEntity[] | null> {
    return null;
  }

  public async findOneMovment(): Promise<MovmentInEntity | null> {
    return null;
  }

  public async createMovment(body: MovmentInDTO): Promise<void | ErrorManager> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const { reason, total, wallet } = body;

      queryRunner.connect();
      queryRunner.startTransaction();

      const newMovmentIn = this.movmentInRepository.create({
        reason,
        total,
        wallet,
      });
      await this.movmentInRepository.save(newMovmentIn);
      await queryRunner.commitTransaction();
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
      throw new ErrorManager.createSignatureError(e.message);
    } finally {
      queryRunner.release();
    }
  }
}
