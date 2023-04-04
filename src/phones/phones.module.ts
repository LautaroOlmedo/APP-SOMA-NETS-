import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------
import { UserPhonesEntity } from './entities/user-phones.entity';
import { UserEntity } from '.././users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserPhonesEntity, UserEntity])],
  exports: [TypeOrmModule],
})
export class PhonesModule {}
