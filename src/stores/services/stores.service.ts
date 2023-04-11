import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoreDTO, StoreUpdateDTO } from '../dto/store.dto';
import { StoreEntity } from '../entities/store.entity';
import { ErrorManager } from '../../utils/error.manager';
import { StoreEmailsEntity } from '../../emails/entities/store-emails.entity';
import { BrandEntity } from 'src/brands/entities/brand.entity';
import { StorePhonesEntity } from 'src/phones/entities/store-phones.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    @InjectRepository(StoreEmailsEntity)
    private readonly storeEmailsRepository: Repository<StoreEmailsEntity>,

    @InjectRepository(StorePhonesEntity)
    private readonly storePhonesRepository: Repository<StorePhonesEntity>,
  ) {}

  async findAllStores(): Promise<StoreEntity[]> {
    try {
      const stores: StoreEntity[] = await this.storeRepository
        .createQueryBuilder('store')
        .leftJoinAndSelect('store.brand', 'brand')
        .leftJoinAndSelect('store.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .leftJoinAndSelect('store.clientsIncludes', 'clientsIncludes')
        .leftJoinAndSelect('clientsIncludes.client', 'client')
        .leftJoinAndSelect('store.emails', 'email')
        .leftJoinAndSelect('store.phones', 'phone')
        .getMany();
      if (stores.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return stores;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  async findOneStore(id: string): Promise<StoreEntity | undefined> {
    try {
      const store: StoreEntity = await this.storeRepository
        .createQueryBuilder('store')
        .where({ id })
        .leftJoinAndSelect('store.brand', 'brand')
        .leftJoinAndSelect('store.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .leftJoinAndSelect('store.clientsIncludes', 'clientsIncludes')
        .leftJoinAndSelect('clientsIncludes.client', 'client')
        .leftJoinAndSelect('store.emails', 'email')
        .leftJoinAndSelect('store.phones', 'phone')
        .getOne();
      if (!store) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return store;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async createStore(
    storeName: string,
    brand: BrandEntity,
    emails: string[],
    phones: string[],
  ): Promise<StoreEntity> {
    try {
      const newStore = this.storeRepository.create({ storeName, brand });
      await this.storeRepository.save(newStore); // PARA CREAR UNA NUEVA TIENDA Y LUEGO GUARDAR SUS EMAILS Y PHONES PRIMEROS LO GUARDAMOS
      for (let i = 0; i < emails.length; i++) {
        let newEmail = this.storeEmailsRepository.create({ email: emails[i] });
        newEmail.store = newStore;
        await this.storeEmailsRepository.save(newEmail);
      }
      for (let j = 0; j < phones.length; j++) {
        let newPhone = this.storePhonesRepository.create({
          phoneNumber: phones[j],
        });
        newPhone.store = newStore;
        await this.storePhonesRepository.save(newPhone);
      }
      return newStore;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async updateStore(
    id: string,
    body: StoreUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const store: UpdateResult = await this.storeRepository.update(id, body);
      if (store.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return store;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async deleteStore(id: string): Promise<DeleteResult | undefined> {
    try {
      const store: DeleteResult = await this.storeRepository.delete(id);
      if (store.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return store;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
