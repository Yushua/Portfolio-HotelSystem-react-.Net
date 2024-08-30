import { Controller, UseGuards, Post, Body, Request } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RouteService } from 'src/routes/routes.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private UserService: UserService,
    private routeService: RouteService,
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

  @Post('jwtCheck')
  @UseGuards(AuthGuard('jwt'))
  jwtCheck() {}

  @Post('getAllBackendPaths')
  @UseGuards(AuthGuard('jwt'))
  async getAllBackendPaths(@Request() req) {
    const user: User = req.user;
    const routes = this.routeService.getRoutes();
    return { routes };
  }
}
