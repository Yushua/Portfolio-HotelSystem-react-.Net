import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService  } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]), // Import TaskRepository along with Task
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topsecret51',
      signOptions: {
        expiresIn: 36000,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, AuthModule],
})
export class AuthModule {}
