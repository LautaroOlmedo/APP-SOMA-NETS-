import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoreDTO, StoreUpdateDTO } from '../dto/store.dto';
import { StoreEntity } from '../entities/store.entity';
import { ErrorManager } from '../../utils/error.manager';
import { EmailService } from '../../emails/services/email.service';
import { PhonesService } from '../../phones/services/phones.service';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,

    private readonly emailsService: EmailService,
    private readonly phonesService: PhonesService,

    private readonly dataSource: DataSource,
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

  async findOneStore(id: string): Promise<StoreEntity | null> {
    try {
      const store: StoreEntity = await this.storeRepository
        .createQueryBuilder('store')
        .where({ id })
        .leftJoinAndSelect('store.brand', 'brand')
        .leftJoinAndSelect('store.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .leftJoinAndSelect('store.clientsIncludes', 'clientsIncludes')
        .leftJoinAndSelect('clientsIncludes.client', 'client')
        .leftJoinAndSelect('store.stock', 'stock')
        .leftJoinAndSelect('stock.productsIncludes', 'productsIncludes')
        .leftJoinAndSelect('productsIncludes.product', 'product')
        //.leftJoinAndSelect('productsIncludes.product', 'product')
        .leftJoinAndSelect('store.walletsIncludes', 'walletsIncludes')
        .leftJoinAndSelect('walletsIncludes.wallet', 'wallet')
        .leftJoinAndSelect('store.emails', 'email')
        .leftJoinAndSelect('store.phones', 'phone')
        .getOne();
      if (!store) {
        return null;
      }
      return store;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findByUniqueValues(
    body: StoreDTO,
  ): Promise<boolean | ErrorManager> {
    const { storeName } = body;
    try {
      const storeAlreadyExists: StoreEntity =
        await this.storeRepository.findOne({
          where: [{ storeName }],
        });

      if (storeAlreadyExists) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El nombre de la tienda está en uso',
        });
      }
      return true;
    } catch (e) {
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    }
  }

  public async createStore(body: StoreDTO): Promise<void | ErrorManager> {
    const { storeName, brand, emails, phones } = body;

    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      const newStore = this.storeRepository.create({
        storeName,
        brand,
      });

      await this.storeRepository.save(newStore);

      await this.emailsService.createStoreEmail(emails, newStore);
      await this.phonesService.createStorePhone(phones, newStore);
      await queryRunner.commitTransaction();
      return;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw ErrorManager.createSignatureError(e);
    } finally {
      queryRunner.release();
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

  public async validateStores(stores: string[]): Promise<ErrorManager | null> {
    for (let i = 0; i < stores.length; i++) {
      let store = await this.findOneStore(stores[i]);
      if (!store) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró la tienda',
        });
      }
    }
    return null;
  }
}
