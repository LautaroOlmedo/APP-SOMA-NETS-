import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------
import { UserDirectionsEntity } from '../entities/user-directions.entity';
import { ErrorManager } from '../../utils/error.manager';

import { UserEntity } from '../../users/entities/user.entity';
import { DepartmentsService } from '../../departments/services/departments.service';

@Injectable()
export class UserDirectionsService {
  constructor(
    @InjectRepository(UserDirectionsEntity)
    private readonly userDirectionsRepository: Repository<UserDirectionsEntity>,
    private readonly departmentsService: DepartmentsService,
  ) {}

  public async create(
    direction: string,
    departmentId: string,
    user: UserEntity,
  ) {
    const newDirection = this.userDirectionsRepository.create({
      direction: direction,
    });
    const department = await this.departmentsService.findOneDepartment(
      departmentId,
    );
    if (department) {
      newDirection.department = department;
    }
    newDirection.users.push(user);
    await this.userDirectionsRepository.save(newDirection);
    return newDirection;
  }
}
