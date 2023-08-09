import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { StoreDirectionsController } from './controllers/store-directions.controller';
import { UserDirectionsController } from './controllers/user-directions.controller';
import { UserEntity } from '.././users/entities/user.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { DepartmentsService } from '.././departments/services/departments.service';
import { ClientEntity } from '.././clients/entities/client.entity';
import { DirectionService } from './services/direction.service';
import { DirectionsEntity } from './entities/directions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DirectionsEntity,
      UserEntity,
      ClientEntity,
      DepartmentEntity,
    ]),
  ],
  controllers: [StoreDirectionsController, UserDirectionsController],
  exports: [TypeOrmModule],
  providers: [DirectionService],
})
export class DirectionsModule {}
