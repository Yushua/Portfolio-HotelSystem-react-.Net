import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { CreateHotelDto } from './DTO/create-hotelDto';

@Controller('hotels')
@UseGuards(AuthGuard('jwt'))
export class HotelsController {
    constructor(
        private hotelService: HotelsService,
      ) {}

      @Post(`CreateHotel`)
      async loginUser(
        @Request() req,
        @Body() createHotelDto: CreateHotelDto,
      ): Promise<{ hotelID: string }> {
        const user: User = req.user;
        const hotelID:string = await this.hotelService.createHotel(user, createHotelDto);
        return { hotelID };
      }

      @Get(`HotelOwner`)
      async HotelOwner(
        @Request() req,
      ): Promise<{ userWithHotels: any }> {
        const user: User = req.user;
        const userWithHotels = await this.hotelService.getAllOwnerHotels(user);
        return {userWithHotels}
      }
}
