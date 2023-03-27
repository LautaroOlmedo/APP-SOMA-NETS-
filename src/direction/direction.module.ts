import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UserDirectionsService } from './services/user-directions.service';
import { DirectionController } from './controllers/direction.controller';
import { UserDirectionsEntity } from './entities/user-directions.entity';
import { UserEntity } from '.././users/entities/user.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { StoreDirectionsEntity } from './entities/store-directions.entity';
import { StoreEntity } from '.././stores/entities/store.entity';
import { DepartmentsService } from 'src/departments/services/departments.service';
import { UsersService } from 'src/users/services/users.service';
//import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [
    //UsersModule,
    TypeOrmModule.forFeature([
      UserDirectionsEntity,
      StoreDirectionsEntity,
      UserEntity,
      StoreEntity,
      DepartmentEntity,
    ]),
  ],
  controllers: [DirectionController],
  providers: [UserDirectionsService, DepartmentsService],
  exports: [UserDirectionsService, TypeOrmModule],
})
export class DirectionModule {}
