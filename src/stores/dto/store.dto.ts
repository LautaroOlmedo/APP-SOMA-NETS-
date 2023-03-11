import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// ---------- ---------- ---------- ---------- ----------

export class StoreDTO {
  @IsNotEmpty()
  @IsString()
  storeName: string;
}

export class StoreUpdateDTO {
  @IsOptional()
  @IsString()
  storeName: string;
}
