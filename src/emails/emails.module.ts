import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UserEmailsService } from './services/user-emails.service';
import { StoreEmailsService } from './services/store-emails.service';
import { StoreEmailsController } from './controllers/store-emails.controller';
import { UserEmailsController } from './controllers/user-emails.controller';
import { StoreEmailsEntity } from './entities/store-emails.entity';
import { UserEmailsEntity } from './entities/user-emails.entity';
import { UserEntity } from '.././users/entities/user.entity';
import { StoreEntity } from '.././stores/entities/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEmailsEntity,
      UserEmailsEntity,
      UserEntity,
      StoreEntity,
    ]),
  ],
  controllers: [StoreEmailsController, UserEmailsController],
  providers: [UserEmailsService, StoreEmailsService],
  exports: [TypeOrmModule, UserEmailsService, StoreEmailsService],
})
export class EmailsModule {}
