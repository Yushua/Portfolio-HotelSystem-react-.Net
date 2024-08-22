import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { Repository } from 'typeorm';
import { HotelRooms } from './hotel-rooms.entity';
import { CreateHotelDto } from './DTO/create-hotelDto';
import { CreateHotelRoomDto } from './DTO/create-hotelRoomDto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels)
    private readonly HotelsEntity: Repository<Hotels>,
    @InjectRepository(HotelRooms)
    private readonly HotelRoomsEntity: Repository<HotelRooms>,
  ) {}

  /* check information */
  async checkHotel(hotelId: string): Promise<Hotels>{
    const hotel = await this.HotelsEntity.findOne({
      where: { hotelId: hotelId },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  async checkRoomNumber(hotel: Hotels, hotelNumber: number): Promise<void> {
    const existingRoom = await this.HotelRoomsEntity.findOne({
      where: { hotel, hotelRoomNumber: hotelNumber },
    });

    if (existingRoom) {
      throw new ConflictException('Room number already exists');
    }
  }
  
  async findRoomByNumber(
    hotel: Hotels,
    hotelNumber: number,
  ): Promise<HotelRooms> {
    const existingRoom = await this.HotelRoomsEntity.findOne({
      where: { hotel, hotelRoomNumber: hotelNumber },
    });

    if (!existingRoom) {
      throw new ConflictException('Room number already exists');
    }
    return existingRoom;
  }

  async checkHotelName(hotelName: string): Promise<void> {
    const Hotels = await this.HotelsEntity.findOne({
      where: { hotelName: hotelName },
    });

    if (Hotels) {
      throw new ConflictException('Hotel name already exists');
    }
  }

  /* create information information */

  async createHotel(hotelData: CreateHotelDto): Promise<Hotels> {
    //check if the hotel already exists with the name only
    const hotel = await this.HotelsEntity.findOne({
      where: { hotelName: hotelData.hotelName },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    const newHotel = this.HotelsEntity.create(hotelData);
    return await this.HotelsEntity.save(newHotel);
  }

  async createRoom(roomData: CreateHotelRoomDto): Promise<HotelRooms> {
    const {
      hotelRoomNumber,
      hotelId,
      hotelRoomDescription,
      BigBed,
      SmallBed,
      Rooms,
      Kitchen,
      Wifi,
    } = roomData;
    const hotel = await this.checkHotel(hotelId);
    await this.checkRoomNumber(hotel, hotelRoomNumber);

    const room = this.HotelRoomsEntity.create({
      hotelRoomNumber,
      hotelId,
      hotelRoomDescription,
      BigBed,
      SmallBed,
      Rooms,
      Kitchen,
      Wifi,
      hotel,
    });
    return await this.HotelRoomsEntity.save(room);
  }

  /* Patch hotel Data*/

  async changeOwnerName(
    hotelId: string,
    newOwnerName: string,
  ): Promise<Hotels> {
    const hotel = await this.checkHotel(hotelId);
    hotel.hotelOwner = newOwnerName; // multiple hotels can be owned by the same owner
    //you use the ID not the actual owner name, because id can't change
    return await this.HotelsEntity.save(hotel);
  }

  async changeHotelName(
    hotelId: string,
    newHotelName: string,
  ): Promise<Hotels> {
    await this.checkHotelName(newHotelName);
    const hotel = await this.checkHotel(hotelId);
    hotel.hotelName = newHotelName;
    return await this.HotelsEntity.save(hotel);
  }

  async changeHotelRoomNumber(
    hotel: Hotels,
    roomNumber: number,
    newRoomNumber: number,
  ): Promise<HotelRooms> {
    this.checkRoomNumber(hotel, newRoomNumber); //check if the new number already exist
    const existingRoom = await this.HotelRoomsEntity.findOne({
      where: { hotel, hotelRoomNumber: roomNumber },
    });

    if (!existingRoom) {
      throw new ConflictException('Room number given does not exist');
    }
    existingRoom.hotelRoomNumber = newRoomNumber;
    return await this.HotelRoomsEntity.save(existingRoom);
  }

  async changeHotelDescription(
    hotelId: string,
    newDescription: string,
  ): Promise<Hotels> {
    const hotel = await this.checkHotel(hotelId);
    hotel.hotelDescription = newDescription;
    return await this.HotelsEntity.save(hotel);
  }

  async changeRoomDescription(
    hotel: Hotels,
    roomNumber: number,
    newDescription: string,
  ): Promise<HotelRooms> {
    const room = await this.findRoomByNumber(hotel, roomNumber);
    room.hotelRoomDescription = newDescription;
    return await this.HotelRoomsEntity.save(room);
  }

  async changeRoomBigBed(
    hotel: Hotels,
    roomNumber: number,
    newBigBed: number,
  ): Promise<HotelRooms> {
    const room = await this.findRoomByNumber(hotel, roomNumber);
    if (newBigBed < 0) {
      throw new ConflictException('BigRoom number too low');
    }
    room.BigBed = newBigBed;
    return await this.HotelRoomsEntity.save(room);
  }

  async changeRoomSmallBed(
    hotel: Hotels,
    roomNumber: number,
    newSmallBed: number,
  ): Promise<HotelRooms> {
    const room = await this.findRoomByNumber(hotel, roomNumber);
    if (newSmallBed < 0) {
      throw new ConflictException('SmallRoom number too low');
    }
    room.SmallBed = newSmallBed;
    return await this.HotelRoomsEntity.save(room);
  }

  async changeRoomsize(
    hotel: Hotels,
    roomNumber: number,
    newsizeRooms: number,
  ): Promise<HotelRooms> {
    const room = await this.findRoomByNumber(hotel, roomNumber);
    if (newsizeRooms < 0){
      throw new ConflictException('BigRoom number too low');
    }
    room.Rooms = newsizeRooms;
    return await this.HotelRoomsEntity.save(room);
  }

  async changeRoomKitchen(
    hotel: Hotels,
    roomNumber: number,
  ): Promise<HotelRooms> {
    const room = await this.findRoomByNumber(hotel, roomNumber);
    if (room.Kitchen === true) room.Kitchen = false;
    else {
      room.Kitchen = true;
    }
    return await this.HotelRoomsEntity.save(room);
  }

  async changeRoomWifi(hotel: Hotels, roomNumber: number): Promise<HotelRooms> {
    const room = await this.findRoomByNumber(hotel, roomNumber);
    if (room.Wifi === true) room.Wifi = false;
    else {
      room.Wifi = true;
    }
    return await this.HotelRoomsEntity.save(room);
  }

  /* remove hotel Data */

  async removeHotelRoom(hotel, Hotels, roomNumber: number): Promise<void> {
    const room = await this.findRoomByNumber(hotel, roomNumber);
    await this.HotelRoomsEntity.remove(room);
  }

  async removeHotelAndRooms(hotelId: string): Promise<void> {
    const hotel = await this.checkHotel(hotelId);
    await this.HotelsEntity.remove(hotel);
  }
}
