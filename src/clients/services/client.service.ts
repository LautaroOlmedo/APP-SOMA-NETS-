import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ClientEntity } from '../entities/client.entity';
import { ErrorManager } from '../../utils/error.manager';
import { ClientDTO, ClientUpdateDTO } from '../dto/client.dto';
import { EmailService } from '../../emails/services/email.service';
import { PhonesService } from '../../phones/services/phones.service';
import { DirectionsService } from '../../directions/services/directions.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly emailsService: EmailService,
    private readonly phonesService: PhonesService,
    private readonly directionsService: DirectionsService,
    private readonly dataSource: DataSource,
  ) {}

  public async findAllClients(
    storeID: string,
  ): Promise<ClientEntity[] | ErrorManager> {
    try {
      console.log(storeID);
      const clients: ClientEntity[] = await this.clientRepository
        .createQueryBuilder('client')
        .leftJoinAndSelect('client.brand', 'brandInclude')
        .innerJoin('client.storesIncludes', 'storesIncludes')
        .innerJoin('storesIncludes.store', 'store')
        .where('store.id = :storeID', { storeID })
        .getMany();

      return clients;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findOneClient(storeID: string): Promise<ClientEntity> {
    try {
      const client: ClientEntity = await this.clientRepository
        .createQueryBuilder('client')
        .innerJoin('client.storesIncludes', 'storesIncludes')
        .innerJoin('storesIncludes.store', 'store')
        .where('store.id = :storeID', { storeID })
        .getOne();
      if (!client) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return client;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findByUniqueValues(
    body: ClientDTO,
  ): Promise<boolean | ErrorManager> {
    const { dni } = body;
    try {
      const userAlreadyExists: ClientEntity =
        await this.clientRepository.findOne({
          where: [{ dni }],
        });

      if (userAlreadyExists) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'DNI ya existe uso',
        });
      }
      return true;
    } catch (e) {
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    }
  }

  public async createClient(body: ClientDTO): Promise<void | ErrorManager> {
    const {
      firstname,
      lastname,
      dni,
      department,
      direction,
      brand,
      province,
      country,
      emails,
      phones,
    } = body;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      const newClient = this.clientRepository.create({
        firstname,
        lastname,
        dni,
        brand,
        department,
        province,
        country,
      });

      const clientDirection = await this.directionsService.createDirection(
        direction,
        department,
      );

      newClient.direction = clientDirection;
      await this.clientRepository.save(newClient);

      await this.emailsService.createClientEmail(emails, newClient);
      await this.phonesService.createClientPhone(phones, newClient);

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    } finally {
      queryRunner.release();
    }
  }

  public async updateUser(
    id: string,
    body: ClientUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const client: UpdateResult = await this.clientRepository.update(id, body);
      if (client.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return client;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const client: DeleteResult = await this.clientRepository.delete(id);
      if (client.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return client;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  // ---------- ----------  RELATIONS  ---------- ----------
}
