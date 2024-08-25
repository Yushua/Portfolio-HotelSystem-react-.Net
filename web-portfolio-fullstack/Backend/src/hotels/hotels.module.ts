import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { HotelRooms } from './hotelsRooms.entity';
import { User } from 'src/user/user.entity';
import { HotelVacancy } from './hotelsVacancy.entity';
import { UserService } from 'src/user/user.service';
import { JobDataEntity } from './EmployeeData.entity';
import { RoomBooking } from './hotelRoomBooking';

@Module({
  imports: [TypeOrmModule.forFeature([
    Hotels,
    HotelRooms,
    User,
    HotelVacancy,
    JobDataEntity,
    RoomBooking])],
  controllers: [HotelsController],
  providers: [HotelsService, UserService],
})
export class HotelsModule {}
