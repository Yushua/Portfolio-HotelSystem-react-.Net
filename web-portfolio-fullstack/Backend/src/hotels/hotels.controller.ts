import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { CreateHotelDto, GetHotelData, PatchHotelDto, PatchHotelRoomDto } from './DTO/create-hotelDto';
import { Hotels } from './hotels.entity';
import { HotelRooms } from './hotelsRooms.entity';

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

      @Patch(`PatchHotel`)
      async PatchHotel(
        @Request() req,
        @Body() patchHotelDto: PatchHotelDto,
      ) {
        const user: User = req.user;
        await this.hotelService.PatchHotelData(user, patchHotelDto);
      }

      @Patch(`CreateRoom`)
      async CreateRoom(
        @Request() req,
        @Body() patchHotelRoomDto: PatchHotelRoomDto,
      ) {
        const user: User = req.user;
        await this.hotelService.createRoom(patchHotelRoomDto);
      }


      @Post(`GetHotelData`)
      async GetHotelData(
        @Request() req,
        @Body() GetHotelData: GetHotelData,
      ): Promise<{ HotelData: Hotels }> {
        const user: User = req.user;
        const HotelData = await this.hotelService.getHotelData(GetHotelData.HotelId, user);
        return {HotelData}
      }

      @Post(`HotelRooms`)
      async GetHotelRoomsData(
        @Request() req,
        @Body() GetHotelData: GetHotelData,
      ): Promise<{ HotelRoomsData: HotelRooms[] }> {
        const user: User = req.user;
        const HotelRoomsData = await this.hotelService.getHotelRoomsData(GetHotelData.HotelId, user);
        return {HotelRoomsData}
      }
}
