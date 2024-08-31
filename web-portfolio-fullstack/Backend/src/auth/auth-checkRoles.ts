import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CheckRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  /**
   * CONTEXT, checks every methodName based on the roles this user has
   * for example. if user has role X where they can go into "CreateNewHotel" and that role has
   * "CreateNewHotel" in the methodName, then they pass, else.
   * it means that any of the roles they got, do not permit this.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const dbUser = await this.userService.findOne({
      where: { id: user.id },
      relations: ['role'],
    });

    if (!dbUser || !dbUser.role) {
      throw new UnauthorizedException('User or role is not available.');
    }

    if (
      (requiredPermissions === undefined && dbUser.role.roleName === 'Admin') ||
      (dbUser.role && dbUser.role.roleName === 'Admin')
    ) {
      return true;
    }

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const role = dbUser.role;
    const hasPermission = role.methodNames.some((methodName) =>
      requiredPermissions.includes(methodName),
    );

    if (hasPermission) {
      return true;
    }

    throw new UnauthorizedException('User does not have permission to access this resource.');
  }
}
