import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { Not, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateHotelDto, GetHotelData, HotelAllVacanciesDataDto, HotelVacancyAllInfoDto, OwnerPatchJobByIdDto, PatchHotelDto, PatchHotelRoomDto, PatchHotelVacancyCreateDto, PatchHotelVacancyPatchDto } from './DTO/create-hotelDto';
import { HotelRooms } from './hotelsRooms.entity';
import { HotelVacancy } from './hotelsVacancy.entity';
import { JobDataEntity } from './JobDataEntity.entity';
import { RoomBooking } from './hotelRoomBooking';

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
    @InjectRepository(JobDataEntity)
    private readonly jobDataEntity: Repository<JobDataEntity>,
    @InjectRepository(RoomBooking)
    private readonly roomBooking: Repository<RoomBooking>,
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
      boss: user,
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
      Price: patchHotelRoomDto.Price,
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

  async ft_checkJobNameInHotel(hotel, jobName: string){
    const existingVacancies = await this.HotelVacancyEntity.find({
      where: { hotel: hotel, jobName: jobName },
    });

    const existingJobs = await this.jobDataEntity.find({
      where: { hotel: hotel, jobName: jobName },
    });

    if (existingVacancies.length > 0 || existingJobs.length > 0) {
      const errors = [];
      errors.push('JobName for this hotel already exists');
      throw new HttpException(
        { message: errors },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async createVacancy(patchHotelVacancyCreateDto: PatchHotelVacancyCreateDto): Promise<any> {
    const hotel = await this.HotelsEntity.findOne({
      where: { hotelId: patchHotelVacancyCreateDto.HotelId },
    });
  
    if (!hotel) {
      throw new Error('Hotel not found');
    }

    await this.ft_checkJobNameInHotel(hotel, patchHotelVacancyCreateDto.jobName)

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
    existingRoom.Price = patchHotelRoomDto.Price;
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

    if (vacancy.hotel && vacancy.hotel.boss && vacancy.hotel.boss.id !== user.id) {
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
      where: { hotelId: hotelId, boss: { id: userId } },
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

/**
 * based on the hotel
 * @param user 
 * @param hotelId 
 * @returns 
 */
async getAllHotelEmployeeDataOnHotelId(user: User, hotelId: string): Promise<JobDataEntity[]> {
  try {
    // Query for JobDataEntity with a specific hotel and user
    const employeeData = await this.jobDataEntity.find({
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

async getAllHotelEmployeeData(user: User): Promise<any[]> {
  try {
    const userWithEmployees = await this.userEntity.findOne({
      where: { id: user.id },
      relations: ['employeed', 'employeed.EmployeeUser'],
    });
    if (!userWithEmployees || !userWithEmployees.employeed) {
      return [];
    }
    const employeeData = userWithEmployees.employeed.map(emp => ({
      employeeId: emp.EmployeeUser.id,
      employeeUsername: emp.EmployeeUser.username,
      employeeDescription: emp.EmployeeUser.description,
      employeeEmail: emp.EmployeeUser.email,
    }));

    const uniqueEmployees = Array.from(
      new Map(employeeData.map((item) => [item.employeeId, item])).values()
    );

    return uniqueEmployees;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw new Error('Error fetching employee data');
  }
}

async getAllHotelEmployeeDataId(user: User): Promise<any[]> {
  try {
    const userWithEmployees = await this.userEntity.findOne({
      where: { id: user.id },
      relations: ['employeed', 'employeed.EmployeeUser'],
    });

    if (!userWithEmployees || !userWithEmployees.employeed) {
      return [];
    }
    const employeeData = userWithEmployees.employeed.map(emp => ({
      employeeId: emp.EmployeeUser.id,
      employeeUsername: emp.EmployeeUser.username,
    }));

    const uniqueEmployees = Array.from(
      new Map(employeeData.map((item) => [item.employeeId, item])).values()
    );

    return uniqueEmployees;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw new Error('Error fetching employee data');
  }
}

async ownerGetAllFromEmployeeIdJobsRelatedToOwner(owner: User, employeeId: string): Promise<any[]> {
  try {
    const userWithEmployees = await this.userEntity.findOne({
      where: { id: owner.id },
      relations: ['employeed', 'employeed.EmployeeUser'],
    });

    if (!userWithEmployees || !userWithEmployees.employeed) {
      return [];
    }
    const relatedJobsForEmployee = userWithEmployees.employeed.filter(job => job.EmployeeUser.id === employeeId);
    const AllData = relatedJobsForEmployee.map(job => ({
      jobId: job.JobId,
      jobName: job.jobName,
      jobTitle: job.jobTitle,
      jobPay: job.jobPay,
      jobDescription: job.jobDescription,
    }));
    return AllData;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw new Error('Error fetching employee data');
  }
}

async ownerRemoveJobFromEmployee(owner: User, jobId: string) {
  try {
    const job = await this.jobDataEntity.findOne({
      where: { JobId: jobId },
      relations: ['bosses'], // Ensure we load the related boss
    });
    if (!job) {
      throw new Error('Job not found');
    }
    if (job.bosses.id !== owner.id) {
      throw new Error('You are not authorized to delete this job');
    }
    await this.jobDataEntity.remove(job);

  } catch (error) {
    throw new Error('Error removing job from employee');
  }
}

async ownerUpdateJob(user: User, ownerPatchJobByIdDto: OwnerPatchJobByIdDto) {

  const job = await this.jobDataEntity.findOne({
    where: { JobId: ownerPatchJobByIdDto.jobId },
    relations: ['bosses', 'hotel'], // Load the related boss
  });

  if (!job) {
    throw new NotFoundException('Job not found');
  }
  if (job.bosses.id !== user.id) {
    throw new UnauthorizedException('You are not authorized to update this job');
  }
  
  await this.ft_checkJobNameInHotel(job.hotel, ownerPatchJobByIdDto.JobName)

  job.jobName = ownerPatchJobByIdDto.JobName;
  job.jobTitle = ownerPatchJobByIdDto.JobTitle;
  job.jobDescription = ownerPatchJobByIdDto.JobDescription;
  job.jobPay = ownerPatchJobByIdDto.JobPay;

  await this.jobDataEntity.save(job);
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

  async getAllRoomsData(): Promise<any[]> {
    try {
      // Fetch all hotel rooms along with their associated bookings
      const allRooms = await this.HotelRoomsEntity.find({
        relations: ['bookings'], // Include the bookings relation
        select: {
          hotelRoomId: true,
          hotelRoomNumber: true,
          hotelRoomName: true,
          hotelRoomDescription: true,
          Kitchen: true,
          Wifi: true,
          Breakfast: true,
          Roomservice: true,
          Animals: true,
          BigBed: true,
          SmallBed: true,
          Price: true,
          Rooms: true,
          bookings: {
            startDate: true,
            endDate: true,
          },
        },
      });
  
      return allRooms;
    } catch (error) {
      console.error('Error fetching hotel rooms:', error);
      throw error;
    }
  }

  async getAllRoomsDatabyRoomId(roomId: string): Promise<HotelRooms | null> {
    try {
      const room = await this.HotelRoomsEntity.findOne({
        where: { hotelRoomId: roomId },
        relations: ['bookings'],
      });
      if (!room) {
        console.log(`No room found with ID: ${roomId}`);
        return null;
      }
  
      return room;
    } catch (error) {
      console.error('Error fetching room data:', error);
      throw error;
    }
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
      }
    if (jobNameVacancyExists){
        throw new HttpException(
          { message: errors },
          HttpStatus.BAD_REQUEST,
        );
      }
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

    const isOwner = vacancy.hotel.boss.id === user.id;  // Check if hotel owner matches the requesting user
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

    const neweEmployee = this.jobDataEntity.create({
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
      await this.jobDataEntity.save(neweEmployee);
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

  /* booking */

  async bookRoomByUser(user: User,
    hotelRoomId: string,
    startDate: Date,
    endDate: Date,
  ) {
    const room: HotelRooms | null = await this.getAllRoomsDatabyRoomId(hotelRoomId);

    const errors = [];
    console.log("--start--")
    console.log(new Date(startDate))
    console.log(new Date(endDate))
    for (const booking of room.bookings){
      console.log("--stored--")
      console.log(new Date(booking.startDate))
      console.log(new Date(booking.endDate))
      if (new Date(startDate) >= new Date(booking.startDate) && new Date(startDate) <= new Date(booking.endDate)){
        errors.push('startDate room is already booked during this date');
        console.log("errorstart")
      }
      if (new Date(endDate) >= new Date(booking.startDate) && new Date(endDate) <= new Date(booking.endDate)){
        errors.push('endDate room is already booked during this date');
        console.log("errorend")
      }
      if (errors.length > 0){
        break ;
      }
    }
  if (errors.length > 0){
      throw new HttpException(
        { message: errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newBooking = this.roomBooking.create({
        hotelRoom: room,
        user: user,
        startDate: startDate,
        endDate: endDate,
        Status: true,
        passcode: Math.random().toString(36).substr(2, 4).toUpperCase()
      });
      try {
        // await this.roomBooking.save(newBooking);
        console.log(newBooking)
        //here try to pay later. if pay fail. remove booking
      } catch (error) {
        console.error('Could not create booking:', error);
        //in here, return the money or cancel
        throw new Error('Error saving Booking');
      }
    }
  }
}
