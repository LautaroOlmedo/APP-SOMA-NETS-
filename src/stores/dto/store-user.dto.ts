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

// ---------- ---------- ---------- ---------- ----------

import { ACCESS_LEVEL, ROLES } from '../../constants/roles';
import { StoreEntity } from '../../stores/entities/store.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class UserToStoreDTO {
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accesLevel: ACCESS_LEVEL;

  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;

  @IsNotEmpty()
  @IsUUID()
  store: StoreEntity;
}
