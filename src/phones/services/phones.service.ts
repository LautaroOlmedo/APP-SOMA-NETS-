import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { PhonesEntity } from '../entities/phones.entity';
import { ErrorManager } from '../../utils/error.manager';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(PhonesEntity)
    private readonly phoneRepository: Repository<PhonesEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async createUserPhone(phones: string[], user: UserEntity) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      for (let j = 0; j < phones.length; j++) {
        const newPhone = this.phoneRepository.create({
          phoneNumber: phones[j],
        });
        newPhone.user = user;
        await this.phoneRepository.save(newPhone);
      }
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Error al crear el número de teléfono',
      });
    } finally {
      queryRunner.release();
    }
  }
}
