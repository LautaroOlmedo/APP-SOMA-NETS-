import { Entity } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'movment_in' })
export class MovmentInEntity extends BaseEntity {}
