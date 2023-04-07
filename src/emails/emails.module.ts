import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoreEmailsEntity } from './entities/store-emails.entity';
import { UserEmailsEntity } from './entities/user-emails.entity';
import { UserEntity } from '.././users/entities/user.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { ClientsEmailsEntity } from './entities/client-emails.entity';
import { ClientEntity } from '.././clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEmailsEntity,
      UserEmailsEntity,
      ClientsEmailsEntity,
      UserEntity,
      StoreEntity,
      ClientEntity,
    ]),
  ],

  exports: [TypeOrmModule],
})
export class EmailsModule {}
