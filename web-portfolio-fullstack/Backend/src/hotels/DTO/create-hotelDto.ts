import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class PatchHotelRoomDto {
  @IsNotEmpty()
  @IsString()
  HotelId: string;

  @IsNotEmpty()
  @IsString()
  RoomNumber: string;

  @IsNotEmpty()
  @IsString()
  RoomName: string;

  @IsNotEmpty()
  @IsString()
  Employee: string;

  @IsNotEmpty()
  @IsString()
  HotelDescription: string;

  @IsNotEmpty()
  @IsNumber()
  BigBeds: number;

  @IsNotEmpty()
  @IsNumber()
  SmallBeds: number;

  @IsNotEmpty()
  @IsNumber()
  Rooms: number;

  @IsNotEmpty()
  @IsBoolean()
  Kitchen: boolean;

  @IsNotEmpty()
  @IsBoolean()
  Wifi: boolean;

  @IsNotEmpty()
  @IsBoolean()
  Breakfast: boolean;

  @IsNotEmpty()
  @IsBoolean()
  Roomservice: boolean;

  @IsNotEmpty()
  @IsBoolean()
  Animals: boolean;
}