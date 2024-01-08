// ---------- ---------- ---------- ---------- ----------

import { ACCESS_LEVEL } from '.././constants';
import { StoreEntity } from '.././stores/entities/store.entity';
import { UserEntity } from '.././users/entities/user.entity';

export interface StoreUserInterface {
  accesLevel: ACCESS_LEVEL;
  user: UserEntity;
  store: StoreEntity;
}
