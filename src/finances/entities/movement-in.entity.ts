import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------
import { BaseEntity } from '../../config/base.entity';
import { PurchaseEntity } from '../../purchases/entities/purchase.entity';
import { movement_in } from '../../constants/enums';

@Entity({ name: 'movement_in' })
export class MovementInEntity extends BaseEntity {
  @Column({ type: 'enum', enum: movement_in, default: movement_in.inversion })
  reason!: movement_in;

  // ---------- ---------- RELATIONS ---------- ----------

  @OneToOne(() => PurchaseEntity, (purchase) => purchase.movementIn)
  @JoinColumn({ name: 'purchase_id' })
  purchase?: PurchaseEntity;
}
