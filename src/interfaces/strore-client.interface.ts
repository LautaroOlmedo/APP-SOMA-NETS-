// ---------- ---------- ---------- ---------- ----------

import { ACCES_LEVEL_CLIENTS } from '../constants';
import { ClientEntity } from '.././clients/entities/client.entity';
import { StoreEntity } from '.././stores/entities/store.entity';

export interface StoreClientInterface {
  clientType: ACCES_LEVEL_CLIENTS;
  client: ClientEntity;
  store: StoreEntity;
}
