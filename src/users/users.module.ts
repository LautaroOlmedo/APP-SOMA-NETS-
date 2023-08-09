import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { StoreUsersEntity } from '.././stores/entities/store-users.entity';
import { CountryEntity } from '.././countries/entities/country.entity';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { EmailsEntity } from '.././emails/entities/emails.entity';
import { DirectionsModule } from '.././directions/directions.module';
import { PhonesEntity } from '.././phones/entities/phones.entity';
import { PurchaseEntity } from '.././purchases/entities/purchase.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { DirectionsEntity } from '.././directions/entities/directions.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      DepartmentEntity,
      ProvinceEntity,
      CountryEntity,
      StoreEntity,
      StoreUsersEntity,
      DirectionsEntity,
      EmailsEntity,
      PhonesEntity,
      PurchaseEntity,
    ]),
    DirectionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService], //UserDirectionsService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
