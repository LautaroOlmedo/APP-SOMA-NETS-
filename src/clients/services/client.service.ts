import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ClientEntity } from '../entities/client.entity';
import { EmailsEntity } from '../../emails/entities/emails.entity';
import { PhonesEntity } from '../../phones/entities/phones.entity';
import { ErrorManager } from '../../utils/error.manager';
import { StoreClientsEntity } from '../../stores/entities/store-clients.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { CountryEntity } from '../../countries/entities/country.entity';
import { ClientUpdateDTO } from '../dto/client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(StoreClientsEntity)
    private readonly storeClientsRepository: Repository<StoreClientsEntity>,
    @InjectRepository(EmailsEntity)
    private readonly emailRepository: Repository<EmailsEntity>,
    @InjectRepository(PhonesEntity)
    private readonly phoneRepository: Repository<PhonesEntity>, //@InjectRepository(UserDirectionsEntity) //private readonly userDirectionRepository: Repository<UserDirectionsEntity>,
  ) {}

  public async findAllClients(): Promise<ClientEntity[]> {
    try {
      const clients: ClientEntity[] = await this.clientRepository
        .createQueryBuilder('client')
        .leftJoinAndSelect('client.storesIncludes', 'storesIncludes')
        .leftJoinAndSelect('storesIncludes.store', 'store')
        .getMany();

      if (clients.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return clients;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findOneClient(id: string): Promise<ClientEntity> {
    try {
      const client: ClientEntity = await this.clientRepository
        .createQueryBuilder('client')
        .where({ id })
        .leftJoinAndSelect('client.storesIncludes', 'storesIncludes')
        .leftJoinAndSelect('storesIncludes.store', 'store')
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

  public async createClient(
    firstname: string,
    lastname: string,
    dni: string,
    department: DepartmentEntity,
    province: ProvinceEntity,
    country: CountryEntity,
    emails: string[],
    phones: string[],
  ) {
    try {
      const newClient = this.clientRepository.create({
        firstname,
        lastname,
        dni,
        department,
        province,
        country,
      });
      await this.clientRepository.save(newClient);

      for (let i = 0; i < emails.length; i++) {
        let newEmail = this.emailRepository.create({ email: emails[i] });
        newEmail.client = newClient;
        await this.emailRepository.save(newEmail);
      }

      for (let j = 0; j < phones.length; j++) {
        let newPhone = this.phoneRepository.create({
          phoneNumber: phones[j],
        });
        newPhone.client = newClient;
        await this.phoneRepository.save(newPhone);
      }
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
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

  public async relationToStore(body: any /*UserToStoreDTO*/) {
    try {
      return await this.storeClientsRepository.save(body);
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
