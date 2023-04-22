import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------

import { PurchaseEntity } from '../entities/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
  ) {}

  public async findAllPurchases(): Promise<PurchaseEntity[]> {
    return await this.purchaseRepository.find();
  }

  public async createPurchase(body: any) {
    return await this.purchaseRepository.save(body);
  }
}
