import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  HotelName: string;

  @IsString()
  @IsNotEmpty()
  Description: string;
}
