import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { DepartmentsService } from './services/departments.service';
import { DepartmentsController } from './controllers/departments.controller';
import { DepartmentEntity } from './entities/department.entity';
import { ProvinceEntity } from '.././provinces/entities/province.entity';
import { UserEntity } from '.././users/entities/user.entity';
import { UserDirectionsEntity } from '.././direction/entities/user-directions.entity';
import { StoreDirectionsEntity } from '.././direction/entities/store-directions.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepartmentEntity,
      UserEntity,
      UserDirectionsEntity,
      StoreDirectionsEntity,
      ProvinceEntity,
    ]),
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [TypeOrmModule, DepartmentsService],
})
export class DepartmentsModule {}
