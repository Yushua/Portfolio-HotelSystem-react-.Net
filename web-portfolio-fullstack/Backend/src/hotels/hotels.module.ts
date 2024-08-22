import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './hotels.entity';
import { HotelRooms } from './hotelsRooms.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotels, HotelRooms, User])],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
