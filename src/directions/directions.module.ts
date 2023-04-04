import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoreDirectionsController } from './controllers/store-directions.controller';
import { UserDirectionsController } from './controllers/user-directions.controller';
import { UserEntity } from '.././users/entities/user.entity';
import { UserDirectionsEntity } from './entities/user-directions.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { DepartmentsService } from '.././departments/services/departments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserDirectionsEntity,
      UserEntity,
      DepartmentEntity,
    ]),
  ],
  controllers: [StoreDirectionsController, UserDirectionsController],
  exports: [TypeOrmModule],
})
export class DirectionsModule {}
