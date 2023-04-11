import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// ---------- ---------- ---------- ---------- ----------

import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { StoresModule } from './stores/stores.module';
import { CountriesModule } from './countries/countries.module';

import { EmailsModule } from './emails/emails.module';
import { AuthModule } from './auth/auth.module';
import { ProvincesModule } from './provinces/provinces.module';
import { DepartmentsModule } from './departments/departments.module';
import { PhonesModule } from './phones/phones.module';
import { DirectionsModule } from './directions/directions.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { StocksModule } from './stocks/stocks.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'lautaro',
      password: 'lautaro',
      database: 'soma-db',
      autoLoadEntities: true,
      entities: [__dirname + './**/*.entity{.ts,.js}'],
      //entities: [UserEntity, BrandEntity, CountryEntity, ProvinceEntity],
      //migrations: [__dirname + './migrations/*{.ts,.js}'],
      synchronize: true,
      migrationsRun: false,
      logging: false,
      //namingStrategy: new SnakeNamingStrategy(),
    }), //    }),
    UsersModule,
    BrandsModule,
    StoresModule,
    CountriesModule,
    EmailsModule,
    AuthModule,
    ProvincesModule,
    DepartmentsModule,
    PhonesModule,
    DirectionsModule,
    ClientsModule,
    ProductsModule,
    CategoriesModule,
    StocksModule,
    PurchasesModule,
  ],
})
export class AppModule {}
