import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Res,
  Body,
  Patch,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { checkRolesGuard } from './auth-checkRoles';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private UserService: UserService,
  ) {}

  /**
   * when returned, it returns the user authentication code.
   * so that the person can log in
   * @param CreateUserDto
   */
  @Post(`createUser`)
  async createUser(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<{ authToken: string }> {
    const user: User = await this.UserService.userCreation(CreateUserDto);
    const authToken = await this.authService.createAuthToken(user);
    return { authToken };
  }

  @Post(`loginUser`)
  async loginUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ authToken: string }> {
    const user: User = await this.UserService.loginUser(createUserDto);
    const authToken = await this.authService.createAuthToken(user);
    return { authToken };
  }

  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(new checkRolesGuard(["Owner"]))
  test(@Request() req) {
    const user: User = req.user;
  }

  @Post('jwtCheck')
  @UseGuards(AuthGuard('jwt'))
  jwtCheck() {}
}
