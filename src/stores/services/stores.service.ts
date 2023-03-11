import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoreDTO, StoreUpdateDTO } from '../dto/store.dto';
import { StoreEntity } from '../entities/store.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) {}

  async findAllStores(): Promise<StoreEntity[]> {
    try {
      const stores: StoreEntity[] = await this.storeRepository.find();
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
        .leftJoinAndSelect('store.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
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

  public async createStore(body: StoreDTO): Promise<StoreEntity> {
    try {
      return await this.storeRepository.save(body);
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
