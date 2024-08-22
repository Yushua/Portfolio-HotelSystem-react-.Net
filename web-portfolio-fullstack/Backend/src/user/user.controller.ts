import { checkRolesGuard } from 'src/auth/auth-checkRoles';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get('GetAllUserFavorites')
  @UseGuards()
  async getAll(@Request() req): Promise<{ favorites: string[] }> {
    const user: User = req.user;
    const favorites = user.favorites;
    return { favorites };
  }

  // @Post('AddAllUserFavorites')
  // @UseGuards()
  // async PostUserAddFavorite(
  //   @Request() req,
  //   @Body() webBrowserDtoPatch: WebBrowserDtoPatch,
  // ): Promise<{ favorites: string[] }> {
  //   const user: User = req.user;
  //   this.userService.addFavorite(user, webBrowserDtoPatch);
  //   const favorites = user.favorites;
  //   return { favorites };
  // }

  // @Post('RemoveAllUserFavorites')
  // @UseGuards()
  // async PostUserRemoveFavorite(
  //   @Request() req,
  //   @Body() webBrowserDtoPatch: WebBrowserDtoPatch,
  // ): Promise<{ favorites: string[] }> {
  //   const user: User = req.user;
  //   this.userService.removeFavorite(user, webBrowserDtoPatch);
  //   const favorites = user.favorites;
  //   return { favorites };
  // }
}
