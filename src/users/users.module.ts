import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { StoreUsersEntity } from '.././stores/entities/store-users.entity';
import { CountryEntity } from '.././countries/entities/country.entity';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { UserDirectionsEntity } from '.././directions/entities/user-directions.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { UserEmailsEntity } from '.././emails/entities/user-emails.entity';

import { DirectionsModule } from '.././directions/directions.module';
import { UserPhonesEntity } from 'src/phones/entities/user-phones.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      DepartmentEntity,
      ProvinceEntity,
      CountryEntity,
      StoreUsersEntity,
      UserDirectionsEntity,
      UserEmailsEntity,
      UserPhonesEntity,
    ]),
    DirectionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService], //UserDirectionsService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
