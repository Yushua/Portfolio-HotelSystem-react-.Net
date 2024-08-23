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

  //this is an option.
  hotelRoomId?: string;

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

export class PatchHotelVacancyCreateDto {
  @IsNotEmpty()
  @IsString()
  HotelId: string;

  @IsString()
  @IsNotEmpty()
  Description: string;

  @IsString()
  @IsNotEmpty()
  jobName: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsBoolean()
  @IsNotEmpty()
  filled: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;
}

export class PatchHotelVacancyPatchDto {
  @IsNotEmpty()
  @IsString()
  VacancyId: string;

  @IsNotEmpty()
  @IsString()
  HotelId: string;

  @IsString()
  @IsNotEmpty()
  Description: string;

  @IsString()
  @IsNotEmpty()
  jobName: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsBoolean()
  @IsNotEmpty()
  filled: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;
}
