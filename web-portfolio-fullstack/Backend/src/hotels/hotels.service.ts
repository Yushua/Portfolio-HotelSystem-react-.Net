import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateHotelDto, GetHotelData, HotelVacancyAllInfoDto, PatchHotelDto, PatchHotelRoomDto, PatchHotelVacancyCreateDto, PatchHotelVacancyPatchDto } from './DTO/create-hotelDto';
import { HotelRooms } from './hotelsRooms.entity';
import { HotelVacancy } from './hotelsVacancy.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
    @InjectRepository(Hotels)
    private readonly HotelsEntity: Repository<Hotels>,
    @InjectRepository(HotelRooms)
    private readonly HotelRoomsEntity: Repository<HotelRooms>,
    @InjectRepository(HotelVacancy)
    private readonly HotelVacancyEntity: Repository<HotelVacancy>,
  ) {}


  /* create data */

  async createHotel(user: User, hotelData: CreateHotelDto): Promise<string> {
    const hotel = await this.HotelsEntity.findOne({
          where: { hotelName: hotelData.HotelName},
        });
        if (hotel) {
          throw new NotFoundException('Hotel already made');
        }
    const newHotel = this.HotelsEntity.create({
      hotelName: hotelData.HotelName,
      hotelOwner: user.username,
      hotelDescription: hotelData.Description,
      user: user,
    });
    const savedHotel = await this.HotelsEntity.save(newHotel);

    return savedHotel.hotelId;
  }

  async createRoom(patchHotelRoomDto: PatchHotelRoomDto): Promise<any> {
    const hotel = await this.HotelsEntity.findOne({
      where: { hotelId: patchHotelRoomDto.HotelId },
    });
  
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    const existingRooms = await this.HotelRoomsEntity.find({
      where: { hotel: hotel },
    });

    const roomNumberExists = existingRooms.some(room => room.hotelRoomNumber === patchHotelRoomDto.RoomNumber);
    const roomNameExists = existingRooms.some(room => room.hotelRoomName === patchHotelRoomDto.RoomName);
    const errors = [];
      if (roomNumberExists) {
        errors.push('RoomNumber already exists');
      }

      if (roomNameExists) {
        errors.push('RoomName already exists');
      }
    if (roomNumberExists || roomNameExists){
      throw new HttpException(
        { message: errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newRoom = this.HotelRoomsEntity.create({
      hotelRoomNumber: patchHotelRoomDto.RoomNumber,
      hotelRoomName: patchHotelRoomDto.RoomName,
      hotelRoomEmployee: patchHotelRoomDto.Employee,
      hotelRoomDescription: patchHotelRoomDto.HotelDescription,
      Kitchen: patchHotelRoomDto.Kitchen,
      Wifi: patchHotelRoomDto.Wifi,
      Breakfast: patchHotelRoomDto.Breakfast,
      Roomservice: patchHotelRoomDto.Roomservice,
      Animals: patchHotelRoomDto.Animals,
      BigBed: patchHotelRoomDto.BigBeds,
      SmallBed: patchHotelRoomDto.SmallBeds,
      Rooms: patchHotelRoomDto.Rooms,
      hotel: hotel
    });
    try {
      await this.HotelRoomsEntity.save(newRoom);
    } catch (error) {
      console.error('Error saving new room:', error);
      throw new Error('Error saving new room');
    }
    return newRoom;
  }

  async createVacancy(patchHotelVacancyCreateDto: PatchHotelVacancyCreateDto): Promise<any> {
    const hotel = await this.HotelsEntity.findOne({
      where: { hotelId: patchHotelVacancyCreateDto.HotelId },
    });
  
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    const vacancies = await this.HotelVacancyEntity.find({
      where: { hotel: hotel },
    });

    const jobNameVacancyExists = vacancies.some(room => room.jobName === patchHotelVacancyCreateDto.jobName);
    const errors = [];
      if (jobNameVacancyExists) {
        errors.push('jobName for this hotel already exists');
      }
    if (jobNameVacancyExists){
      throw new HttpException(
        { message: errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newVacancy = this.HotelVacancyEntity.create({
      hotel: hotel,
      jobName: patchHotelVacancyCreateDto.jobName,
      jobTitle: patchHotelVacancyCreateDto.jobTitle,
      jobPay: patchHotelVacancyCreateDto.jobPay,
      jobDescription: patchHotelVacancyCreateDto.jobDescription,
    });
    try {
      await this.HotelVacancyEntity.save(newVacancy);
    } catch (error) {
      console.error('Error saving new room:', error);
      throw new Error('Error saving new room');
    }
    return newVacancy;
  }

  async PatchHotelRoomOwner(patchHotelRoomDto: PatchHotelRoomDto): Promise<void> {
    const hotel = await this.HotelsEntity.findOne({
      where: { hotelId: patchHotelRoomDto.HotelId },
    });
  
    if (!hotel) {
      throw new Error('Hotel not found');
    }

    const existingRooms = await this.HotelRoomsEntity.find({
      where: { hotel: hotel },
    });

    const roomNumberExists = existingRooms.some(room => room.hotelRoomNumber === patchHotelRoomDto.RoomNumber);
    const roomNameExists = existingRooms.some(room => room.hotelRoomName === patchHotelRoomDto.RoomName);
    const errors = [];
    if (roomNumberExists) {
      errors.push('RoomNumber already exists');
    }
    if (roomNameExists) {
      errors.push('RoomName already exists');
    }
    if (roomNumberExists || roomNameExists){
      throw new HttpException(
        { message: errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingRoom = await this.HotelRoomsEntity.findOne({
      where: { hotelRoomId: patchHotelRoomDto.hotelRoomId } // Adjust RoomId to match your DTO structure
    });

    if (!existingRoom) {
      throw new Error('Room not found');
    }
    existingRoom.hotelRoomNumber = patchHotelRoomDto.RoomNumber;
    existingRoom.hotelRoomName = patchHotelRoomDto.RoomName;
    existingRoom.hotelRoomEmployee = patchHotelRoomDto.Employee;
    existingRoom.hotelRoomDescription = patchHotelRoomDto.HotelDescription;
    existingRoom.Kitchen = patchHotelRoomDto.Kitchen;
    existingRoom.Wifi = patchHotelRoomDto.Wifi;
    existingRoom.Breakfast = patchHotelRoomDto.Breakfast;
    existingRoom.Roomservice = patchHotelRoomDto.Roomservice;
    existingRoom.Animals = patchHotelRoomDto.Animals;
    existingRoom.BigBed = patchHotelRoomDto.BigBeds;
    existingRoom.SmallBed = patchHotelRoomDto.SmallBeds;
    existingRoom.Rooms = patchHotelRoomDto.Rooms;
    existingRoom.hotel = hotel;
    try {
      await this.HotelRoomsEntity.save(existingRoom);
    } catch (error) {
      console.error('Error saving new room:', error);
      throw new Error('Error saving new room');
    }
  }

  /* get data */

  async getAllOwnerHotels(user: User):Promise<Hotels[]> {
    const userWithHotels = await this.userEntity.findOne({
      where: { id: user.id },
      relations: ['hotels'],
    });
    return (userWithHotels.hotels)
  }

  async getVacanciesData(user: User, getHotelData: GetHotelData):Promise <any[]> {

    //check to see if I am allowed to get it, what if someone steals the hotelId and the bearer token
    await this.ft_getHotelData(getHotelData.HotelId, user.id);

    const vacancies = await this.HotelVacancyEntity.find({
      where: {
        hotel: { hotelId: getHotelData.HotelId },
      },
      relations: ['hotel'],
    });
    return vacancies
  }

  async getHotelData(hotelId: string, user: User):Promise<Hotels> {
    const userWithHotels = await this.userEntity.findOne({
      where: { id: user.id },
      relations: ['hotels'],
    });

    if (!userWithHotels) {
      throw new UnauthorizedException();
    }
    return (await this.ft_getHotelData(hotelId, user.id))
  }

  /* function get the info */

  /**
   * return the hotel based on the hotelID and userID
   * if failed, it means unauthorized access
   * @returns 
   */
  async ft_getHotelData(hotelId: string, userId: string):Promise <Hotels> {
    const hotel: Hotels = await this.HotelsEntity.findOne({
      where: { hotelId: hotelId, user: { id: userId } },
      relations: ['user', 'hotelrooms'], // Load related entities as needed
    });

    if (!hotel) {
      throw new UnauthorizedException();
    }
    return hotel
  }

  /**
   * with vacancy ID you get the vacancy back
   * if failed, it means unauthorized access
   * @returns 
   */
  async ft_getVacancyData(vacancyId: string):Promise <HotelVacancy> {
    const vacancy = await this.HotelVacancyEntity.findOne({
      where: { VacancyId: vacancyId },
      relations: ['hotel'], // This loads the hotel data in the vacancy
    });

    if (!vacancy) {
      throw new UnauthorizedException();
    }
    return vacancy
  }

  async getHotelRoomsData(hotelId: string, user: User):Promise<HotelRooms[]> {
    const userWithHotels = await this.userEntity.findOne({
      where: { id: user.id },
      relations: ['hotels'], // Ensure this matches the relation name in User entity
    });

    if (!userWithHotels) {
      throw new UnauthorizedException();
    }

    const hotel = await this.ft_getHotelData(hotelId, user.id);

    return (hotel.hotelrooms)
  }

  /* Patch data */

  async PatchHotelData(user: User, hotelData: PatchHotelDto) {
    const hotel = await this.HotelsEntity.findOne({
          where: { hotelId: hotelData.HotelId},
        });
        if (!hotel) {
          throw new NotFoundException('Hotel already made');
        }
        if (hotel.hotelOwner !== user.username){
          throw new UnauthorizedException();
        }
      hotel.hotelName = hotelData.HotelName;
      hotel.hotelDescription = hotelData.Description;
      await this.HotelsEntity.save(hotel);
  }

  async PatchVacancyData(patchHotelVacancyPatchDto: PatchHotelVacancyPatchDto, user: User) {

    const vacancy = await this.ft_getVacancyData(patchHotelVacancyPatchDto.VacancyId);
    
    const hotel = await this.ft_getHotelData(vacancy.hotel.hotelId, user.id);

    const vacancies = await this.HotelVacancyEntity.find({
      where: { hotel: hotel },
    });

    const jobNameVacancyExists = vacancies.some(room => room.jobName === patchHotelVacancyPatchDto.jobName);
    const errors = [];
      if (jobNameVacancyExists) {
        errors.push('jobName for this hotel already exists');
      }

    vacancy.jobName = patchHotelVacancyPatchDto.jobName;
    vacancy.jobTitle = patchHotelVacancyPatchDto.jobTitle;
    vacancy.jobPay = patchHotelVacancyPatchDto.jobPay;
    vacancy.jobDescription = patchHotelVacancyPatchDto.jobDescription;
    await this.HotelVacancyEntity.save(vacancy);
  }

  async GetAllVacancies():Promise<HotelVacancyAllInfoDto[]>{
    const vacancies = await this.HotelVacancyEntity.find({
      relations: ['hotel'],  // Include the 'hotel' relation to get associated hotel data
    });

    const VacanciesData: HotelVacancyAllInfoDto[] = vacancies
    .filter(vacancy => vacancy.hotel && vacancy.hotel.hotelId)
    .map(vacancy => ({
      VacancyId: vacancy.VacancyId,
      jobName: vacancy.jobName,
      jobPay: vacancy.jobPay,
      jobTitle: vacancy.jobTitle,
      jobDescription: vacancy.jobDescription,
      hotelName: vacancy.hotel.hotelName,
      hotelOwner: vacancy.hotel.hotelOwner,
      hotelId: vacancy.hotel.hotelId,
    }));
    return VacanciesData;
  }

  // /* check information */
  // async checkHotel(hotelId: string): Promise<Hotels>{
  //   const hotel = await this.HotelsEntity.findOne({
  //     where: { hotelId: hotelId },
  //   });
  //   if (!hotel) {
  //     throw new NotFoundException('Hotel not found');
  //   }
  //   return hotel;
  // }

  // async checkRoomNumber(hotel: Hotels, hotelNumber: number): Promise<void> {
  //   const existingRoom = await this.HotelRoomsEntity.findOne({
  //     where: { hotel, hotelRoomNumber: hotelNumber },
  //   });

  //   if (existingRoom) {
  //     throw new ConflictException('Room number already exists');
  //   }
  // }
  
  // async findRoomByNumber(
  //   hotel: Hotels,
  //   hotelNumber: number,
  // ): Promise<HotelRooms> {
  //   const existingRoom = await this.HotelRoomsEntity.findOne({
  //     where: { hotel, hotelRoomNumber: hotelNumber },
  //   });

  //   if (!existingRoom) {
  //     throw new ConflictException('Room number already exists');
  //   }
  //   return existingRoom;
  // }

  // async checkHotelName(hotelName: string): Promise<void> {
  //   const Hotels = await this.HotelsEntity.findOne({
  //     where: { hotelName: hotelName },
  //   });

  //   if (Hotels) {
  //     throw new ConflictException('Hotel name already exists');
  //   }
  // }

  /* create information information */

  // async createRoom(roomData: CreateHotelRoomDto): Promise<HotelRooms> {
  //   const {
  //     hotelRoomNumber,
  //     hotelId,
  //     hotelRoomDescription,
  //     BigBed,
  //     SmallBed,
  //     Rooms,
  //     Kitchen,
  //     Wifi,
  //   } = roomData;
  //   const hotel = await this.checkHotel(hotelId);
  //   await this.checkRoomNumber(hotel, hotelRoomNumber);

  //   const room = this.HotelRoomsEntity.create({
  //     hotelRoomNumber,
  //     hotelId,
  //     hotelRoomDescription,
  //     BigBed,
  //     SmallBed,
  //     Rooms,
  //     Kitchen,
  //     Wifi,
  //     hotel,
  //   });
  //   return await this.HotelRoomsEntity.save(room);
  // }

  /* Patch hotel Data*/

  // async changeOwnerName(
  //   hotelId: string,
  //   newOwnerName: string,
  // ): Promise<Hotels> {
  //   const hotel = await this.checkHotel(hotelId);
  //   hotel.hotelOwner = newOwnerName; // multiple hotels can be owned by the same owner
  //   //you use the ID not the actual owner name, because id can't change
  //   return await this.HotelsEntity.save(hotel);
  // }

  // async changeHotelName(
  //   hotelId: string,
  //   newHotelName: string,
  // ): Promise<Hotels> {
  //   await this.checkHotelName(newHotelName);
  //   const hotel = await this.checkHotel(hotelId);
  //   hotel.hotelName = newHotelName;
  //   return await this.HotelsEntity.save(hotel);
  // }

  // async changeHotelRoomNumber(
  //   hotel: Hotels,
  //   roomNumber: number,
  //   newRoomNumber: number,
  // ): Promise<HotelRooms> {
  //   this.checkRoomNumber(hotel, newRoomNumber); //check if the new number already exist
  //   const existingRoom = await this.HotelRoomsEntity.findOne({
  //     where: { hotel, hotelRoomNumber: roomNumber },
  //   });

  //   if (!existingRoom) {
  //     throw new ConflictException('Room number given does not exist');
  //   }
  //   existingRoom.hotelRoomNumber = newRoomNumber;
  //   return await this.HotelRoomsEntity.save(existingRoom);
  // }

  // async changeHotelDescription(
  //   hotelId: string,
  //   newDescription: string,
  // ): Promise<Hotels> {
  //   const hotel = await this.checkHotel(hotelId);
  //   hotel.hotelDescription = newDescription;
  //   return await this.HotelsEntity.save(hotel);
  // }

  // async changeRoomDescription(
  //   hotel: Hotels,
  //   roomNumber: number,
  //   newDescription: string,
  // ): Promise<HotelRooms> {
  //   const room = await this.findRoomByNumber(hotel, roomNumber);
  //   room.hotelRoomDescription = newDescription;
  //   return await this.HotelRoomsEntity.save(room);
  // }

  // async changeRoomBigBed(
  //   hotel: Hotels,
  //   roomNumber: number,
  //   newBigBed: number,
  // ): Promise<HotelRooms> {
  //   const room = await this.findRoomByNumber(hotel, roomNumber);
  //   if (newBigBed < 0) {
  //     throw new ConflictException('BigRoom number too low');
  //   }
  //   room.BigBed = newBigBed;
  //   return await this.HotelRoomsEntity.save(room);
  // }

  // async changeRoomSmallBed(
  //   hotel: Hotels,
  //   roomNumber: number,
  //   newSmallBed: number,
  // ): Promise<HotelRooms> {
  //   const room = await this.findRoomByNumber(hotel, roomNumber);
  //   if (newSmallBed < 0) {
  //     throw new ConflictException('SmallRoom number too low');
  //   }
  //   room.SmallBed = newSmallBed;
  //   return await this.HotelRoomsEntity.save(room);
  // }

  // async changeRoomsize(
  //   hotel: Hotels,
  //   roomNumber: number,
  //   newsizeRooms: number,
  // ): Promise<HotelRooms> {
  //   const room = await this.findRoomByNumber(hotel, roomNumber);
  //   if (newsizeRooms < 0){
  //     throw new ConflictException('BigRoom number too low');
  //   }
  //   room.Rooms = newsizeRooms;
  //   return await this.HotelRoomsEntity.save(room);
  // }

  // async changeRoomKitchen(
  //   hotel: Hotels,
  //   roomNumber: number,
  // ): Promise<HotelRooms> {
  //   const room = await this.findRoomByNumber(hotel, roomNumber);
  //   if (room.Kitchen === true) room.Kitchen = false;
  //   else {
  //     room.Kitchen = true;
  //   }
  //   return await this.HotelRoomsEntity.save(room);
  // }

  // async changeRoomWifi(hotel: Hotels, roomNumber: number): Promise<HotelRooms> {
  //   const room = await this.findRoomByNumber(hotel, roomNumber);
  //   if (room.Wifi === true) room.Wifi = false;
  //   else {
  //     room.Wifi = true;
  //   }
  //   return await this.HotelRoomsEntity.save(room);
  // }

  // /* remove hotel Data */

  // async removeHotelRoom(hotel, Hotels, roomNumber: number): Promise<void> {
  //   const room = await this.findRoomByNumber(hotel, roomNumber);
  //   await this.HotelRoomsEntity.remove(room);
  // }

  // async removeHotelAndRooms(hotelId: string): Promise<void> {
  //   const hotel = await this.checkHotel(hotelId);
  //   await this.HotelsEntity.remove(hotel);
  // }
}
