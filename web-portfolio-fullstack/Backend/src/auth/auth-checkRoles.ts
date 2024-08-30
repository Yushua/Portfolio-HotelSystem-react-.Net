import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from 'src/user/user.entity';

@Injectable()
export class checkRolesGuard implements CanActivate {
  constructor(private readonly roles: string[]) {}

  /**
   * automatic system checking on each request if allowed based on roles
   * 
   * roles to add
   * 
   * - Admin
   * - Tester
   * - HotelOwner
   * - HotelEmployee
   * - Costumer
   * @param context
   * @returns
   */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    //fish out the roles of the user
    // if (user.roles.length === 0) {
    //   return true;
    // }

    //checking the roles. if Admin, always allow. Admin has full access
    // if (!this.roles.some((role) => user.roles.includes(role))) {
    //   throw new UnauthorizedException(
    //     'You are not authorized to access this resource.',
    //   );
    // }
    return true;
  }
}