import { Column, Entity, ManyToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { StoreEntity } from './store.entity';
import { ACCES_LEVEL_CLIENTS } from '../../constants/roles';
import { ClientEntity } from '../../clients/entities/client.entity';
import { StoreClientInterface } from 'src/interfaces/strore-client.interface';

@Entity({ name: 'stores_clients' })
export class StoreClientsEntity
  extends BaseEntity
  implements StoreClientInterface
{
  @Column({ type: 'enum', enum: ACCES_LEVEL_CLIENTS })
  clientType: ACCES_LEVEL_CLIENTS;

  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => ClientEntity, (client) => client.storesIncludes)
  client: ClientEntity;

  @ManyToOne(() => StoreEntity, (store) => store.clientsIncludes)
  store: StoreEntity;
}
