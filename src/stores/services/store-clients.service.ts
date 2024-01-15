import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoreClientsEntity } from '../entities/store-clients.entity';
import { ClientToStoreDTO } from '../dto/store-client.dto';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class StoreClientsService {
  constructor(
    @InjectRepository(StoreClientsEntity)
    private readonly storeClientsRepository: Repository<StoreClientsEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async relationToStore(
    body: ClientToStoreDTO,
  ): Promise<void | ErrorManager> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();
      await this.storeClientsRepository.save(body);
      await queryRunner.commitTransaction();
      return;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Error al agregar un cliente a una tienda',
      });
    } finally {
      queryRunner.release();
    }
  }
}
