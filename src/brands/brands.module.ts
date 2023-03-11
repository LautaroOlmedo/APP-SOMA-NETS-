import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';

@Module({
  //imports: [TypeOrmModule.forFeature([Bra])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
