import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { EmailsEntity } from '../entities/emails.entity';
import { ErrorManager } from '../../utils/error.manager';
import { UserEntity } from '../../users/entities/user.entity';
import { StoreEntity } from '../../stores/entities/store.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailsEntity)
    private readonly emailRepository: Repository<EmailsEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async createUserEmail(
    emails: string[],
    user: UserEntity,
  ): Promise<void | Error> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      for (let i = 0; i < emails.length; i++) {
        const newEmail = this.emailRepository.create({
          email: emails[i],
        });
        newEmail.user = user;
        await this.emailRepository.save(newEmail);
      }

      await queryRunner.commitTransaction();
      return;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Error al crear el email',
      });
    } finally {
      queryRunner.release();
    }
  }

  private async createClientEmail(email: string, ClientID: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
    } finally {
      queryRunner.release();
    }
  }

  public async createStoreEmail(
    emails: string[],
    storeID: StoreEntity,
  ): Promise<void | ErrorManager> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      for (let i = 0; i < emails.length; i++) {
        const newEmail = this.emailRepository.create({
          email: emails[i],
        });
        newEmail.store = storeID;
        await this.emailRepository.save(newEmail);
      }

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Error al crear el email',
      });
    } finally {
      queryRunner.release();
    }
  }

  private async createSupplierEmail(email: string, supplerID: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
    } finally {
      queryRunner.release();
    }
  }
}
