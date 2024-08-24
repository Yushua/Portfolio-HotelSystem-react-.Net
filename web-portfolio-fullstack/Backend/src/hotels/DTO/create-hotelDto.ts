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

export class GetVacancyData {
  @IsNotEmpty()
  @IsString()
  vacancyId: string;
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
  jobName: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsNumber()
  @IsNotEmpty()
  jobPay: number;
}

export class PatchHotelVacancyPatchDto {
  @IsNotEmpty()
  @IsString()
  VacancyId: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  jobName: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsNumber()
  @IsNotEmpty()
  jobPay: number;
}

export class HotelVacancyAllInfoDto {
  VacancyId: string;
  jobName: string;
  jobPay: number;
  jobTitle: string;
  jobDescription: string;
  hotelName: string;
  hotelOwner: string;
  hotelId: string;
}
