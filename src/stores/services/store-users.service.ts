import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoreUsersEntity } from '../entities/store-users.entity';
import { UserToStoreDTO } from '../dto/store-user.dto';
import { ErrorManager } from '../../utils/error.manager';
@Injectable()
export class StoreUsersService {
  constructor(
    @InjectRepository(StoreUsersEntity)
    private readonly storeUsersRepository: Repository<StoreUsersEntity>,

    private readonly dataSource: DataSource,
  ) {}

  public async relationToStore(body: UserToStoreDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();
      await this.storeUsersRepository.save(body);
      await queryRunner.commitTransaction();
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
