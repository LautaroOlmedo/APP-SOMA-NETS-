import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { MovmentOutEntity } from '../entities/movement-out.entity';
import { WalletService } from './wallet.service';

@Injectable()
export class MovmentOutService {
  constructor(
    @InjectRepository(MovmentOutEntity)
    private readonly movmentOutRepository: Repository<MovmentOutEntity>,
    private readonly walletService: WalletService,
    private readonly dataSource: DataSource,
  ) {}
}
