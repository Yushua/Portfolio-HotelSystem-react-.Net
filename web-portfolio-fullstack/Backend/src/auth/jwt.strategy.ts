import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authservice: AuthService,
    private userService: UserService,
  ) {
    super({
      secretOrKey: `topsecret51`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.getUseryUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
