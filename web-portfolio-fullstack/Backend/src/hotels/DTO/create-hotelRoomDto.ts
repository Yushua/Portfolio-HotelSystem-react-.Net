import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHotelRoomDto {
  @IsNotEmpty()
  @IsNumber()
  hotelRoomNumber: number;

  @IsNotEmpty()
  @IsString()
  hotelId: string;

  @IsNotEmpty()
  @IsString()
  hotelRoomDescription: string;

  @IsNotEmpty()
  @IsNumber()
  BigBed: number;

  @IsNotEmpty()
  @IsNumber()
  SmallBed: number;

  @IsNotEmpty()
  @IsNumber()
  Rooms: number;

  @IsNotEmpty()
  @IsBoolean()
  Kitchen: boolean;

  @IsNotEmpty()
  @IsBoolean()
  Wifi: boolean;
}
