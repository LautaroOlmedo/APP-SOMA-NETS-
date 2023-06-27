import { Module } from '@nestjs/common';

import { SuppliersController } from './controllers/suppliers.controller';
import { SuppliersService } from './services/suppliers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { StoreSuppliersEntity } from '.././stores/entities/store-suppliers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity, StoreSuppliersEntity])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [TypeOrmModule, SuppliersService],
})
export class SuppliersModule {}
