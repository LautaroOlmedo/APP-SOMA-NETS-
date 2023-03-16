import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { StoreUsersEntity } from 'src/stores/entities/store-users.entity';
import { CountryEntity } from 'src/countries/entities/country.entity';
import { ProvinceEntity } from 'src/provinces/entities/province.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      StoreUsersEntity,
      ProvinceEntity,
      CountryEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
