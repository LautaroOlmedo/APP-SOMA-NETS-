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

import { ACCES_LEVEL_CLIENTS } from '../../constants/roles';
import { StoreEntity } from '../../stores/entities/store.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

export class ClientToStoreDTO {
  @IsNotEmpty()
  @IsEnum(ACCES_LEVEL_CLIENTS)
  clientType: ACCES_LEVEL_CLIENTS;

  @IsNotEmpty()
  @IsUUID()
  client: ClientEntity;

  @IsNotEmpty()
  @IsUUID()
  store: StoreEntity;
}
