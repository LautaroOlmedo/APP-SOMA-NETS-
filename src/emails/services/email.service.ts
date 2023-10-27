import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { EmailsEntity } from '../entities/emails.entity';
import { ErrorManager } from '../../utils/error.manager';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailsEntity)
    private readonly emailRepository: Repository<EmailsEntity>,
    private readonly dataSource: DataSource,
  ) {}

  // public async createEmail(emailDTO: EmailDTO): Promise<null | ErrorManager> {
  //   const { email, user, clientID, storeID, supplierID } = emailDTO;
  //   try {
  //     if (user) {
  //       await this.createUserEmail(email, user);
  //     } else if (clientID) {
  //       await this.createClientEmail(email, clientID);
  //     } else if (storeID) {
  //       await this.createStoreEmail(email, storeID);
  //     } else {
  //       await this.createSupplierEmail(email, supplierID);
  //     }

  //     return null;
  //   } catch (e) {
  //     console.log(e);
  //     throw new ErrorManager({
  //       type: 'INTERNAL_SERVER_ERROR',
  //       message: 'Error al crear el email',
  //     });
  //   }
  // }

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

  private async createStoreEmail(email: string, storeID: string) {
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
