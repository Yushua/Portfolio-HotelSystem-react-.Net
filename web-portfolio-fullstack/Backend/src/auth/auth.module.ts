import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RoleEntity } from './role.entity';
import { RolesInitializerService } from './roles-initializer.service';
import { Reflector, ModulesContainer, MetadataScanner, DiscoveryService } from '@nestjs/core';
import { RouteService } from 'src/routes/routes.service'; // Ensure this path is correct

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, RoleEntity]), // Import User and RoleEntity
    PassportModule.register({ defaultStrategy: 'jwt' }), // Register Passport
    JwtModule.register({
      secret: 'topsecret51', // Secret key for JWT
      signOptions: {
        expiresIn: 36000, // Token expiration time
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    JwtStrategy,
    RolesInitializerService,
    Reflector,
    RouteService,
    DiscoveryService,
    MetadataScanner,
  ],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
