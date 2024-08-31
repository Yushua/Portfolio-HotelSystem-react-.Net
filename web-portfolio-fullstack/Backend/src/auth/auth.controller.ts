import { Controller, UseGuards, Post, Body, Patch, Param, NotFoundException, Delete } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RouteService } from 'src/routes/routes.service';
import { Permissions } from 'src/auth/permissions';
import { CheckRolesGuard } from 'src/auth/auth-checkRoles';
import { CreateRoleDTO, patchMethodNamesInRolesDTO } from './dto/auth-credentials.dto';

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
    const user: User = await this.UserService.loginUserService(createUserDto);
    const authToken = await this.authService.createAuthToken(user);
    return { authToken };
  }

  @Post('jwtCheck')
  @UseGuards(AuthGuard('jwt'))
  jwtCheck() {}

  @Post('getAllBackendMethodNamesAndRoles')
  @Permissions('getAllBackendMethodNamesAndRoles')
  @UseGuards(AuthGuard('jwt'), CheckRolesGuard)
  async getAllBackendMethodNamesAndRoles(): Promise<{
    methodNames: any[];
    roles: any[];
  }> {
    const routes = await this.routeService.getRoutes();

    const uniqueMethods = new Set<string>();
    const methodNames = routes
      .filter((route) => {
        if (uniqueMethods.has(route.methodName)) {
          return false; // Skip this route if methodName is already processed
        }
        uniqueMethods.add(route.methodName);
        return true; // Include this route if methodName is unique
      })
      .map((route) => ({
        methodName: route.methodName,
        controller: route.controller.replace('Controller', ''), // Assuming 'controllerName' is the correct property; adjust if necessary
      }));

    console.log(methodNames);
    return {
      methodNames: methodNames,
      roles: await this.authService.GetAllRoles(),
    };
  }

  /* Roles */

  @Patch('CreateNewRole')
  @Permissions('CreateNewRole')
  @UseGuards(AuthGuard('jwt'), CheckRolesGuard)
  async CreateNewRole(@Body() createUserDto: CreateRoleDTO) {
    await this.authService.createRole(createUserDto);
  }

  @Delete('DeleteRole/:id')
  @Permissions('DeleteRole')
  @UseGuards(AuthGuard('jwt'), CheckRolesGuard)
  async DeleteRole(@Param('id') id: string) {
    await this.authService.deleteRole(id);
  }

  @Post('GetAllRoles')
  @Permissions('GetAllRoles')
  @UseGuards(AuthGuard('jwt'), CheckRolesGuard)
  async GetAllRoles() {
    await this.authService.GetAllRoles();
  }

  @Patch('PatchRole')
  // @Permissions('PatchRole')
  // @UseGuards(AuthGuard('jwt'), CheckRolesGuard)
  async PatchRole(
    @Body() patchMethodNamesInRolesDTO: patchMethodNamesInRolesDTO,
  ) {
    await this.authService.PatchRole(
      patchMethodNamesInRolesDTO.methodNames,
      patchMethodNamesInRolesDTO.roleId,
    );
  }
}
