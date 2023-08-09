import { Injectable } from '@nestjs/common';
import { DirectionsEntity } from '../entities/directions.entity';
import { DirectionsDTO } from '../dto/direction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DirectionService {
  constructor(
    @InjectRepository(DirectionsEntity)
    private readonly directionsRepository: Repository<DirectionsEntity>,
  ) {}

  public async createDirection(
    body: DirectionsDTO,
  ): Promise<DirectionsEntity | null> {
    this.directionsRepository.create({
      direction: body.direction,
      department: body.department,
    });
    return null;
  }
}
