import { Entity, OneToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { PurchaseEntity } from '../../purchases/entities/purchase.entity';

@Entity({ name: 'movment_out' })
export class MovmentOutEntity extends BaseEntity {
  @OneToOne(() => PurchaseEntity, (purchase) => purchase.movementOut)
  purchase: PurchaseEntity;
}
