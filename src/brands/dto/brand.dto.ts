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

// ---------- ---------- ---------- ---------- ----------

export class BrandDTO {
  @IsNotEmpty()
  @IsString()
  brandName: string;

  @IsNotEmpty()
  @IsString()
  webSite: string;

  @IsOptional()
  @IsString()
  image: string;
}

export class BrandUpdateDTO {
  @IsOptional()
  @IsString()
  brandName: string;

  @IsOptional()
  @IsString()
  webSite: string;

  @IsOptional()
  @IsString()
  image: string;
}
