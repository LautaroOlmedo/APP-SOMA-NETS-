import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { DepartmentEntity } from '../entities/department.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { ProvincesService } from '../../provinces/services/provinces.service';
import { mendozaDepartments } from '../../utils/data/departments.data';
@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    private readonly provincesService: ProvincesService,
  ) {}
  public async loadDepartmentDB(): Promise<void | string> {
    let departments: DepartmentEntity[] =
      await this.departmentRepository.find();
    const province: ProvinceEntity =
      await this.provincesService.findOneProvince(
        'f4b9e285-e790-4c4b-8458-fa2e38d16e92',
      );
    if (departments.length > 0) return 'Provinces already exists';
    mendozaDepartments.map(async (el) => {
      const newDepartment = this.departmentRepository.create({
        departmentName: el.name,
        departmentKey: el.key,
      });
      province ? (newDepartment.province = province) : null;
      await this.departmentRepository.save(newDepartment);
    });
  }
}
