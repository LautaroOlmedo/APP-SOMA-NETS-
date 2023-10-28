import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { ErrorManager } from '../../utils/error.manager';
import { StoreWalletsEntity } from '../../stores/entities/store-wallet.entity';

@Injectable()
export class WalletService {}
