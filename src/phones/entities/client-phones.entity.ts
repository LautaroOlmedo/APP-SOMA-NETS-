import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity({ name: 'clients_phones' })
export class ClientsPhonesEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  phoneNumber: string;
  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => ClientEntity, (client) => client.phones)
  @JoinColumn({ name: 'client_id' })
  client!: ClientEntity;
}
