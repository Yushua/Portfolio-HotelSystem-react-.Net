import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateHotelDto, GetHotelData, HotelAllVacanciesDataDto, HotelVacancyAllInfoDto, PatchHotelDto, PatchHotelRoomDto, PatchHotelVacancyCreateDto, PatchHotelVacancyPatchDto } from './DTO/create-hotelDto';
import { HotelRooms } from './hotelsRooms.entity';
import { HotelVacancy } from './hotelsVacancy.entity';
import { EmployeeDataEntity } from './EmployeeData.entity';

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
    @InjectRepository(EmployeeDataEntity)
    private readonly EmployeeDataEntity: Repository<EmployeeDataEntity>,
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
      relations: ['hotel', 'users'],
    });

    const vacanciesData: HotelAllVacanciesDataDto[] = vacancies.map(vacancy => ({
      hotel: vacancy.hotel,
      VacancyId: vacancy.VacancyId,
      jobName: vacancy.jobName,
      jobPay: vacancy.jobPay,
      jobTitle: vacancy.jobTitle,
      jobDescription: vacancy.jobDescription,
      jobApplicants: vacancy.users.length,
    }));
    return vacanciesData
  }
  
  /**
   * get Vacancy, checks if the user getting it is the owner
   * @param user 
   * @param vacancyId 
   */
  async ft_GetVacancyData(user: User, vacancyId: string):Promise<any>{

    const vacancy = await this.HotelVacancyEntity.findOne({
      where: { VacancyId: vacancyId },
      relations: ['users', 'hotel'],  // Include users and hotel data
    });

    if (!vacancy) {
      throw new NotFoundException(`Vacancy with ID ${vacancyId} not found`);
    }

    if (vacancy.hotel && vacancy.hotel.user && vacancy.hotel.user.id !== user.id) {
      throw new UnauthorizedException();
    }
    return vacancy;
  }

  //return all employees
  async getVacancyEmployeeData(user: User, vacancyId: string):Promise<any[]> {

    const vacancy = await this.HotelVacancyEntity.findOne({
      where: { VacancyId: vacancyId },
      relations: ['users', 'hotel'],  // Include users and hotel data
    });

    if (!vacancy) {
      throw new NotFoundException(`Vacancy with ID ${vacancyId} not found`);
    }

    if (vacancy.hotel.hotelOwner !== user.username){
      throw new UnauthorizedException();
    }
    const employeesData = vacancy.users.map(emp => ({
      employeeId: emp.id,
      employeeUsername: emp.username,
      employeeDescription: emp.description,
      employeeEmail: emp.email,
    }));

    return employeesData;
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
   * return the hotel based on the hotelID and User
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

  async ft_getUser(userId: string):Promise <User> {
    const user = await this.userEntity.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

async getAllHotelEmployeeData(user: User, hotelId: string): Promise<EmployeeDataEntity[]> {
  try {
    // Query for EmployeeDataEntity with a specific hotel and user
    const employeeData = await this.EmployeeDataEntity.find({
      where: {
        bosses: user,
        hotel: { hotelId: hotelId },  // Adjusted to filter by hotelId
      },
      relations: ['bosses', 'EmployeeUser', 'hotel'], // Add hotel to relations if needed
    });

    return employeeData;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw new Error('Error fetching employee data');
  }
}

  async getHotelRoomsData(hotelId: string, user: User):Promise<HotelRooms[]> {
    const userWithHotels = await this.userEntity.findOne({
      where: { id: user.id },
      relations: ['hotels'],
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

    const vacancy = await this.ft_GetVacancyData(user, patchHotelVacancyPatchDto.VacancyId);
    
    const hotel = await this.ft_getHotelData(vacancy.hotel.hotelId, user.id);

    const vacancies = await this.HotelVacancyEntity.find({
      where: { hotel: hotel },
    });

    const jobNameVacancyExists = vacancies.some(room => room.jobName === patchHotelVacancyPatchDto.jobName);
    const errors = [];
      if (jobNameVacancyExists) {
        errors.push('jobName for this hotel already exists');
      }//apply error

    vacancy.jobName = patchHotelVacancyPatchDto.jobName;
    vacancy.jobTitle = patchHotelVacancyPatchDto.jobTitle;
    vacancy.jobPay = patchHotelVacancyPatchDto.jobPay;
    vacancy.jobDescription = patchHotelVacancyPatchDto.jobDescription;
    await this.HotelVacancyEntity.save(vacancy);
  }

  async GetAllVacancies(userId: string): Promise<HotelVacancyAllInfoDto[]> {
    const vacancies = await this.HotelVacancyEntity.find({
      relations: ['hotel', 'users'],
    });
    const filteredVacancies = vacancies.filter(vacancy =>
      vacancy.hotel && 
      vacancy.hotel.hotelId && 
      !vacancy.users.some(employee => employee.id === userId)
    );

    const VacanciesData: HotelVacancyAllInfoDto[] = filteredVacancies.map(vacancy => ({
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

  async applyToVacancy(user: User, vacancyId: string) {
    const vacancy = await this.HotelVacancyEntity.findOne({
      where: { VacancyId: vacancyId },
      relations: ['users'],  // Fetch the users related to this vacancy
    });
  
    if (!vacancy) {
      throw new UnauthorizedException();
    }
  
    const hasAlreadyApplied = vacancy.users.some(u => u.id === user.id);
    if (hasAlreadyApplied) {
      throw new BadRequestException('User has already applied to this vacancy.');
    }
  
    vacancy.users.push(user);  // Add user to vacancy's user list
  
    await this.HotelVacancyEntity.save(vacancy);
  }

  async removedFromVacancy(user: User, userId: string, vacancyId: string) {
    const vacancy = await this.HotelVacancyEntity.findOne({
      where: { VacancyId: vacancyId },
      relations: ['users', 'hotel', 'hotel.user'],  // Include hotel and hotel owner
    });

    if (!vacancy) {
      throw new UnauthorizedException();
    }

    const isOwner = vacancy.hotel.user.id === user.id;  // Check if hotel owner matches the requesting user
    if (!isOwner) {
      throw new UnauthorizedException();
    }

    const userIndex = vacancy.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException('User is not applied to this vacancy.');
    }
    vacancy.users.splice(userIndex, 1);

    await this.HotelVacancyEntity.save(vacancy);
  } 

  async acceptVacancy(boss: User, employee: User, vacancy: HotelVacancy, hotel: Hotels){

    const neweEmployee = this.EmployeeDataEntity.create({
      bosses: boss,
      EmployeeUser: employee,
      hotel: hotel,
      jobName: vacancy.jobName,
      jobTitle: vacancy.jobTitle,
      jobPay: vacancy.jobPay,
      jobDescription: vacancy.jobDescription,
      email: employee.email,
    });
    try {
      await this.EmployeeDataEntity.save(neweEmployee);
    } catch (error) {
      console.error('Error saving newEmployee:', error);
      throw new Error('Error saving Employee');
    }
  }

  async RemoveVacancy(vacancy: HotelVacancy) {
    try {
      await this.HotelVacancyEntity.createQueryBuilder()
        .relation(HotelVacancy, 'users')
        .of(vacancy)  // The vacancy whose related users need to be removed
        .remove(vacancy.users);  // Remove all related users to this vacancy
      await this.HotelVacancyEntity.delete(vacancy.VacancyId);
    } catch (error) {
      console.error('Error removing vacancy:', error);
      throw new Error('Error removing vacancy');
    }
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
