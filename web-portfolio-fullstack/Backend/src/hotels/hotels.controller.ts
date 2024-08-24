import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { CreateHotelDto, GetHotelData, PatchHotelDto, PatchHotelRoomDto, PatchHotelVacancyCreateDto, PatchHotelVacancyPatchDto } from './DTO/create-hotelDto';
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

      @Post(`CreateRoom`)
      async CreateRoom(
        @Request() req,
        @Body() patchHotelRoomDto: PatchHotelRoomDto,
      ):Promise<{hotelData: any}> {
        const user: User = req.user;
        return { hotelData: await this.hotelService.createRoom(patchHotelRoomDto) };
      }

      @Post(`CreateVacancy`)
      async CreateVacancy(
        @Request() req,
        @Body() patchHotelVacancyCreateDto: PatchHotelVacancyCreateDto,
      ):Promise<{vacancyData: any}> {
        const user: User = req.user;
        return { vacancyData: await this.hotelService.createVacancy(patchHotelVacancyCreateDto) };
      }

      @Get(`HotelOwner`)
      async HotelOwner(
        @Request() req,
      ): Promise<{ userWithHotels: any }> {
        const user: User = req.user;
        const userWithHotels = await this.hotelService.getAllOwnerHotels(user);
        return {userWithHotels}
      }

      @Post(`GetVacanciesData`)
      async GetVacanciesData(
        @Request() req,
        @Body() getHotelData: GetHotelData,
      ): Promise<{ vacanciesData: any }> {
        const user: User = req.user;
        const vacanciesData = await this.hotelService.getVacanciesData(user, getHotelData);
        return {vacanciesData}
      }

      @Patch(`PatchHotel`)
      async PatchHotel(
        @Request() req,
        @Body() patchHotelDto: PatchHotelDto,
      ) {
        const user: User = req.user;
        await this.hotelService.PatchHotelData(user, patchHotelDto);
      }


      @Patch(`PatchHotelRoom`)
      async PatchHotelRoom(
        @Request() req,
        @Body() patchHotelRoomDto: PatchHotelRoomDto,
      ) {
        const user: User = req.user;
        await this.hotelService.PatchHotelRoomOwner(patchHotelRoomDto);
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

      @Patch("PatchHotelVacancyDataOwner")
      async PatchHotelVacancyDataOwner(
        @Request() req,
        @Body() patchHotelVacancyPatchDto: PatchHotelVacancyPatchDto,
      ) {
        const user: User = req.user;
        await this.hotelService.PatchVacancyData(patchHotelVacancyPatchDto, user);
      }
}
