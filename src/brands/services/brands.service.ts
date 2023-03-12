import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------
import { BrandDTO } from '../dto/brand.dto';
import { BrandEntity } from '../entities/brand.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  public async findAllBrands(): Promise<BrandEntity[]> {
    try {
      const brands = await this.brandRepository
        .createQueryBuilder('brand')
        .leftJoinAndSelect('brand.users', 'user')
        .leftJoinAndSelect('brand.stores', 'store')
        .getMany();
      if (brands.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontró resultado',
        });
      }
      return brands;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findOneBrand(id: string): Promise<BrandEntity | undefined> {
    try {
      const brand: BrandEntity = await this.brandRepository
        .createQueryBuilder('brand')
        .where({ id })
        .leftJoinAndSelect('brand.users', 'user')
        .leftJoinAndSelect('brand.stores', 'store')
        .getOne();
      if (!brand) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontró resultado',
        });
      }
      return brand;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async createBrand(body: BrandDTO): Promise<BrandEntity> {
    try {
      return await this.brandRepository.save(body);
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async updateBrand(
    id: string,
    body: any,
  ): Promise<UpdateResult | undefined> {
    try {
      const brand: UpdateResult = await this.brandRepository.update(id, body);
      if (brand.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return brand;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async deleteBrand(id: string): Promise<DeleteResult | undefined> {
    try {
      const brand: DeleteResult = await this.brandRepository.delete(id);
      if (brand.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return brand;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
