import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BrandsController } from './controllers/brands.controller';
import { BrandEntity } from './entities/brand.entity';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
