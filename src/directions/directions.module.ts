import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { UserDirectionsService } from './services/user-directions.service';
import { StoreDirectionsService } from './services/store-directions.service';
import { StoreDirectionsController } from './controllers/store-directions.controller';
import { UserDirectionsController } from './controllers/user-directions.controller';
import { UserEntity } from '.././users/entities/user.entity';
import { UserDirectionsEntity } from './entities/user-directions.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { DepartmentsService } from '.././departments/services/departments.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserDirectionsEntity,
      UserEntity,
      DepartmentEntity,
    ]),
  ],
  controllers: [StoreDirectionsController, UserDirectionsController],
  providers: [
    UserDirectionsService,
    StoreDirectionsService,
    DepartmentsService,
  ],
  exports: [TypeOrmModule, UserDirectionsService],
})
export class DirectionsModule {}
