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
import { DepartmentsModule } from './departments/departments.module';
import { PhonesModule } from './phones/phones.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

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
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      synchronize: true,
      migrationsRun: false,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(), // userName => en db se guarda user_name
    }),
    UsersModule,
    BrandsModule,
    StoresModule,
    CountriesModule,
    DirectionModule,
    EmailsModule,
    AuthModule,
    ProvincesModule,
    DepartmentsModule,
    PhonesModule,
  ],
})
export class AppModule {}
