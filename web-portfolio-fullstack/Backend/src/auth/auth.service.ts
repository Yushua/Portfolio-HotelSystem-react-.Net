import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(User)
    private userEntity: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * no need to wait if no roles given in controller
   * this means everyone is allowed to use it.
   * @param userID 
   * @param rolesAllowed 
   * @returns 
   */
  async checkRoles(userID: string, rolesAllowed: string[]): Promise<void> {
    if (rolesAllowed.length == 0) {
      return;
    }
    const user = await this.userService.getUseryId(userID);
    const unauthorizedRoles = rolesAllowed.filter(
      (role) => !user.roles.includes(role),
    );
    if (unauthorizedRoles.length > 0) {
      throw new UnauthorizedException(
        `Access not allowed for roles: ${unauthorizedRoles.join(', ')}`,
      );
    }
  }

  async createAuthToken(user: User): Promise<string> {
    const payload = { username: user.username };
    return this.jwtService.sign(payload, { secret: `topsecret51` });
  }
}
