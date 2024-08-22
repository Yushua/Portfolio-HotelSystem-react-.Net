import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { HotelRooms } from './hotel-rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotels, HotelRooms])],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
