import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  hotelName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  hotelOwner: string;

  @IsString()
  @IsNotEmpty()
  hotelDescription: string;
}
