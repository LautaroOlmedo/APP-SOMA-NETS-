import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { DirectionService } from './services/direction.service';
import { DirectionController } from './controllers/direction.controller';
import { UserDirectionsEntity } from './entities/user-directions.entity';
import { UserEntity } from '.././users/entities/user.entity';
import { DepartmentEntity } from '.././departments/entities/department.entity';
import { StoreDirectionsEntity } from './entities/store-directions.entity';
import { StoreEntity } from '.././stores/entities/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserDirectionsEntity,
      StoreDirectionsEntity,
      UserEntity,
      StoreEntity,
      DepartmentEntity,
    ]),
  ],
  controllers: [DirectionController],
  providers: [DirectionService],
  exports: [TypeOrmModule, DirectionService],
})
export class DirectionModule {}
