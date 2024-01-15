import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { DirectionsEntity } from '../entities/directions.entity';
import { ErrorManager } from '../../utils/error.manager';
import { DepartmentEntity } from '../../departments/entities/department.entity';

@Injectable()
export class DirectionsService {
  constructor(
    @InjectRepository(DirectionsEntity)
    private readonly directionRepository: Repository<DirectionsEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async createDirection(
    direction: string,
    department: DepartmentEntity,
  ): Promise<DirectionsEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      const newDirection = this.directionRepository.create({
        direction: direction,
      });
      newDirection.department = department;

      await this.directionRepository.save(newDirection);
      await queryRunner.commitTransaction();
      return newDirection;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Error al crear la dirección',
      });
    } finally {
      queryRunner.release();
    }
  }

  private async findByUniqueValues(direction: string) {
    try {
      const directionAlreadyExists: DirectionsEntity =
        await this.directionRepository.findOne({
          where: [{ direction }],
        });
      if (directionAlreadyExists) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'La dirección ya existe',
        });
      }
      return true;
    } catch (e) {
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Error al crear la dirección',
      });
    }
  }
}
