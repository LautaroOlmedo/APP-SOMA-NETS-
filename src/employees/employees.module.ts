import { Module } from '@nestjs/common';
import { EmployeesController } from './controllers/employees.controller';
import { EmployeesService } from './services/employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [TypeOrmModule],
})
export class EmployeesModule {}
