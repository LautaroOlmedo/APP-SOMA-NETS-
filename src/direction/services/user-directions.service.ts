import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentsService } from 'src/departments/services/departments.service';
import { UsersService } from 'src/users/services/users.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDirectionsDTO } from '../dto/user-directions.dto';

// ---------- ---------- ---------- ---------- ----------

import { UserDirectionsEntity } from '../entities/user-directions.entity';

@Injectable()
export class UserDirectionsService {
  constructor(
    @InjectRepository(UserDirectionsEntity)
    private readonly userDirectionRepository: Repository<UserDirectionsEntity>,
    private readonly usersService: UsersService,
    private readonly departmentsService: DepartmentsService,
  ) {}
  async findAll(): Promise<UserDirectionsEntity[]> {
    return await this.userDirectionRepository.find();
  }

  public async create(
    body: UserDirectionsDTO,
    department: string,
    user: string,
  ): Promise<UserDirectionsEntity> {
    const directionDepartment = await this.departmentsService.findOneDepartment(
      department,
    );
    const userDirection = await this.usersService.findOneUser(user);
    const newDirection = this.userDirectionRepository.create(body);
    if (directionDepartment) {
      newDirection.department = directionDepartment;
    }
    if (userDirection) {
      newDirection.users = [userDirection];
    }
    await this.userDirectionRepository.save(newDirection);
    return newDirection;
  }
}
