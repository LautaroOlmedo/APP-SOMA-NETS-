import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { FinancesControllerController } from './controllers/finances.controller.controller';
import { FinancesServicesService } from './services/finances.services.service';
import { MovementOutEntity } from './entities/movement-out.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovementOutEntity])],
  controllers: [FinancesControllerController],
  providers: [FinancesServicesService],
  exports: [TypeOrmModule],
})
export class FinancesModule {}
