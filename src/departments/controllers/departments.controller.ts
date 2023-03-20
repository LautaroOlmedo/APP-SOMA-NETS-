import { Controller, Get } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------
import { DepartmentsService } from '../services/departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}
  @Get('all')
  public async getDepartments() {
    return await this.departmentsService.loadDepartmentDB();
  }
}
