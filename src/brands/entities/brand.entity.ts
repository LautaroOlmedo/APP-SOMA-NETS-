import { Column, Entity, OneToMany } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BaseEntity } from '../../config/base.entity';
import { BrandInterface } from '../../interfaces/brand.interface';
import { UserEntity } from '../../users/entities/user.entity';
import { StoreEntity } from '../../stores/entities/store.entity';
import { WalletEntity } from '../../finances/entities/wallet.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { EmailsEntity } from '../../emails/entities/emails.entity';
import { PhonesEntity } from '../../phones/entities/phones.entity';

@Entity({ name: 'brands' })
export class BrandEntity extends BaseEntity implements BrandInterface {
  @Column({ unique: true })
  brandName: string;

  @Column()
  webSite: string;

  @Column()
  image: string;

  // ---------- ---------- RELATIONS ---------- ----------
  @OneToMany(() => UserEntity, (users) => users.brand)
  usersIncludes?: UserEntity[];

  @OneToMany(() => ClientEntity, (users) => users.brand)
  clientsIncludes?: ClientEntity[];

  @OneToMany(() => WalletEntity, (wallets) => wallets.brand)
  wallets?: WalletEntity[];

  @OneToMany(() => StoreEntity, (stores) => stores.brand)
  storesIncludes?: StoreEntity[];

  @OneToMany(() => EmailsEntity, (emails) => emails.brand)
  emails?: EmailsEntity[];

  @OneToMany(() => PhonesEntity, (phones) => phones.brand)
  phones?: PhonesEntity[];
}
