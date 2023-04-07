import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ClientEntity } from '../entities/client.entity';
import { ClientsEmailsEntity } from 'src/emails/entities/client-emails.entity';
import { ClientsPhonesEntity } from 'src/phones/entities/client-phones.entity';
import { ErrorManager } from '../../utils/error.manager';
import { StoreClientsEntity } from 'src/stores/entities/store-clients.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(StoreClientsEntity)
    private readonly storeClientsRepository: Repository<StoreClientsEntity>,
    @InjectRepository(ClientsEmailsEntity)
    private readonly clientEmailsRepository: Repository<ClientsEmailsEntity>,
    @InjectRepository(ClientsPhonesEntity)
    private readonly clientPhonesRepository: Repository<ClientsPhonesEntity>,
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
