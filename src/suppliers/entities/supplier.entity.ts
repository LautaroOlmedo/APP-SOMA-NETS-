import { Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'suppliers' })
export class SupplierEntity extends BaseEntity {}
