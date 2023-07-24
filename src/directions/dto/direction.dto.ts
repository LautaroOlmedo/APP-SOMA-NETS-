import {
  IsBoolean,
  isEnum,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { DepartmentEntity } from 'src/departments/entities/department.entity';

export class DirectionsDTO {
  @IsNotEmpty()
  @IsString()
  direction: string;

  @IsOptional()
  @IsUUID()
  user: UserEntity;

  @IsOptional()
  @IsUUID()
  client: ClientEntity;

  @IsNotEmpty()
  @IsUUID()
  department: DepartmentEntity;
}
