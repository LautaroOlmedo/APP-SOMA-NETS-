import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity({ name: 'clients_emails' })
export class ClientsEmailsEntity extends BaseEntity {
  @Column()
  email: string;

  // ---------- ----------  RELATIONS  ---------- ----------

  @ManyToOne(() => ClientEntity, (client) => client.emails)
  @JoinColumn({ name: 'client_id' })
  client!: ClientEntity;
}
