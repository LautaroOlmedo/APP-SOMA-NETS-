import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();
export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'lautaro',
  password: 'lautaro',
  database: 'soma-db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(), // userName => en db se guarda user_name
};

export const appDS = new DataSource(DataSourceConfig);
