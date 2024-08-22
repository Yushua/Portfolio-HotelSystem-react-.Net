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
   * use the user you now are given, check if the roles that are needed for this request
   * are in the user, if true, then allow. else.
   * @param context
   * @returns
   */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (this.roles.length === 0) {
      return true;
    }

    if (!this.roles.some((role) => user.roles.includes(role))) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }
    return true;
  }
}