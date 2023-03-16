import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { StoresModule } from './stores/stores.module';
import { CountriesModule } from './countries/countries.module';
import { DirectionModule } from './direction/direction.module';
import { EmailsModule } from './emails/emails.module';
import { AuthModule } from './auth/auth.module';
import { ProvincesModule } from './provinces/provinces.module';

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
    CountriesModule,
    DirectionModule,
    EmailsModule,
    AuthModule,
    ProvincesModule,
  ],
})
export class AppModule {}
