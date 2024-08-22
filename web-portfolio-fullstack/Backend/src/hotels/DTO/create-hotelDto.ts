import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  HotelName: string;

  @IsString()
  @IsNotEmpty()
  Description: string;
}

export class GetHotelData {
  @IsNotEmpty()
  @IsString()
  HotelId: string;
}


export class PatchHotelDto {
  @IsNotEmpty()
  @IsString()
  HotelName: string;

  @IsString()
  @IsNotEmpty()
  Description: string;

  @IsString()
  @IsNotEmpty()
  HotelId: string;
}
