import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { EmailsEntity } from './entities/emails.entity';
import { UserEntity } from '.././users/entities/user.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { ClientEntity } from '.././clients/entities/client.entity';
import { SupplierEntity } from '.././suppliers/entities/supplier.entity';
import { EmailService } from './services/email.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmailsEntity,
      UserEntity,
      StoreEntity,
      ClientEntity,
      SupplierEntity,
    ]),
  ],

  providers: [EmailService],
  exports: [TypeOrmModule, EmailService],

  
})
export class EmailsModule {}
