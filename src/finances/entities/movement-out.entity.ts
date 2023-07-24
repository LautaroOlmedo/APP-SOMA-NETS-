import { Entity, Column } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'movement_out' })
export class MovementOutEntity extends BaseEntity {
  @Column()
  movementName: string;

  // ---------- ---------- RELATIONS ---------- ----------
}
