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
import { UserEntity } from 'src/users/entities/user.entity';

// ---------- ---------- ---------- ---------- ----------

export class UserDirectionsDTO {
  @IsNotEmpty()
  @IsString()
  direction: string;
}
