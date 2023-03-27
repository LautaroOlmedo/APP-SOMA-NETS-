import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { StoreUsersEntity } from '.././stores/entities/store-users.entity';
import { CountryEntity } from '.././countries/entities/country.entity';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { UserDirectionsEntity } from '.././direction/entities/user-directions.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { UserEmailsEntity } from '.././emails/entities/user-emails.entity';
import { UserDirectionsService } from 'src/direction/services/user-directions.service';
import { DirectionModule } from 'src/direction/direction.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      StoreUsersEntity,
      UserDirectionsEntity,
      DepartmentEntity,
      ProvinceEntity,
      CountryEntity,
      UserEmailsEntity,
    ]),
    DirectionModule,
  ],
  controllers: [UsersController],
  providers: [UsersService], //UserDirectionsService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
