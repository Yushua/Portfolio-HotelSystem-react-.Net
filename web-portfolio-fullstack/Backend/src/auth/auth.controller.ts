import { Controller, UseGuards, Post, Body, Patch, Param, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RouteService } from 'src/routes/routes.service';
import { Permissions } from 'src/auth/permissions';
import { CheckRolesGuard } from 'src/auth/auth-checkRoles';
import { CreateRoleDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export default class AuthController {
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

  @Post('getAllBackendMethodNames')
  @UseGuards(AuthGuard('jwt'))
  @Permissions('getAllBackendMethodNames')
  @UseGuards(CheckRolesGuard)
  async getAllBackendMethodNames(): Promise<{ methodNames: any[] }> {
    const routes = await this.routeService.getRoutes();
    const methodNames = routes.map((routes) => routes.methodName);
    console.log(routes);
    return { methodNames: methodNames };
  }

  /* Roles */

  @Patch('CreateNewRole')
  @UseGuards(AuthGuard('jwt'))
  @Permissions('CreateNewRole')
  @UseGuards(CheckRolesGuard)
  async CreateNewRole(@Body() createUserDto: CreateRoleDTO) {
    await this.authService.createRole(createUserDto);
  }

  @Patch('DeleteRole/:id')
  @UseGuards(AuthGuard('jwt'))
  @Permissions('DeleteRole')
  @UseGuards(CheckRolesGuard)
  async DeleteRole(@Param('id') id: string) {
    await this.authService.deleteRole(id);
  }

  @Post('GetAllRoles')
  @UseGuards(AuthGuard('jwt'))
  @Permissions('GetAllRoles')
  @UseGuards(CheckRolesGuard)
  async GetAllRoles() {
    await this.authService.GetAllRoles();
  }
}
