import { Column, Entity, ManyToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { StoreEntity } from './store.entity';
import { ACCES_LEVEL_CLIENTS } from '../../constants/roles';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity({ name: 'stores_clients' })
export class StoreClientsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCES_LEVEL_CLIENTS })
  clientType: ACCES_LEVEL_CLIENTS;

  // ---------- ---------- RELATIONS ---------- ----------
  @ManyToOne(() => ClientEntity, (client) => client.storesIncludes)
  client: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.clientsIncludes)
  store: StoreEntity;
}
