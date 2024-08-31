import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/user.entity';
import { RoleEntity } from './role.entity';

@Injectable()
export class CheckRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (
      requiredPermissions == undefined ||
      (user.role && user.role.roleName === 'Admin')
    ) {
      return true;
    }

    console.log('Permission name ' + requiredPermissions);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // Check if the user has a role
    if (!user || !user.role) {
      throw new UnauthorizedException('User has no roles.');
    }

    // Assuming user.role is a single RoleEntity
    const role = user.role as RoleEntity;

    // Check if the role has any of the required permissions
    const hasPermission = role.ControllerRequests.some((request) =>
      requiredPermissions.includes(request),
    );

    if (hasPermission) {
      return true;
    }

    throw new UnauthorizedException('User does not have permission to access this resource.');
  }
}
