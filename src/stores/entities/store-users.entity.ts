import { Column, Entity, ManyToOne } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { StoreEntity } from './store.entity';
import { ACCESS_LEVEL } from '../../constants/roles';
import { StoreUserInterface } from '../../interfaces/store-user.interface';

@Entity({ name: 'stores_users' })
export class StoreUsersEntity extends BaseEntity implements StoreUserInterface {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  accesLevel: ACCESS_LEVEL;

  // ---------- ---------- RELATIONS ---------- ----------

  @ManyToOne(() => UserEntity, (user) => user.storesIncludes)
  user: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.usersIncludes)
  store: StoreEntity;
}
