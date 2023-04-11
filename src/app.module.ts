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
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from './users/entities/user.entity';
import { BrandEntity } from './brands/entities/brand.entity';
import { CountryEntity } from './countries/entities/country.entity';
import { ProvinceEntity } from './provinces/entities/province.entity';

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
    DirectionModule,
    EmailsModule,
    AuthModule,
    ProvincesModule,
  ],
})
export class AppModule {}
