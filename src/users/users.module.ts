import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { StoreUsersEntity } from 'src/stores/entities/store-users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, StoreUsersEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
