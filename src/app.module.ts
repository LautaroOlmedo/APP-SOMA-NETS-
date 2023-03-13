import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { StoresModule } from './stores/stores.module';
import { CountryModule } from './country/country.module';
import { ProvinceModule } from './province/province.module';
import { DepartmentModule } from './department/department.module';
import { DirectionModule } from './direction/direction.module';
import { EmailsModule } from './emails/emails.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    BrandsModule,
    StoresModule,
    CountryModule,
    ProvinceModule,
    DepartmentModule,
    DirectionModule,
    EmailsModule,
    AuthModule,
  ],
})
export class AppModule {}
