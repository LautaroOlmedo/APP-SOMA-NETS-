import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ---------- ---------- ---------- ---------- ----------

import { DepartmentEntity } from '../entities/department.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { ProvincesService } from '../../provinces/services/provinces.service';
import { mendozaDepartments } from '../../utils/data/departments.data';
import { ErrorManager } from 'src/utils/error.manager';

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
        '6b9a6883-ed1e-4a4d-a517-71d0cd00c0f5',
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

  public async findOneDepartment(id: string) {
    try {
      let department: DepartmentEntity =
        await this.departmentRepository.findOneBy({
          id,
        });
      if (!department) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return department;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
