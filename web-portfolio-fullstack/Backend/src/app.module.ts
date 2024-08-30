import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './user/user.entity';
import { Task } from './tasks/task.entity';
import { JwtService } from '@nestjs/jwt';
import { HotelsModule } from './hotels/hotels.module';
import { Hotels } from './hotels/hotels.entity';
import { HotelRooms } from './hotels/hotelsRooms.entity';
import { RoleEntity } from './auth/role.entity';
import { APP_GUARD } from '@nestjs/core';
import { CheckRolesGuard } from './auth/auth-checkRoles';
import { RouteService } from './routes/routes.service';

@Module({
  imports: [
    UserModule,
    TasksModule,
    TypeOrmModule.forFeature([User, Task, HotelRooms, Hotels, RoleEntity]), // Include relevant entities
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'HotelSystem-Management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    HotelsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RouteService,
    JwtService,
    RouteService,
    {
      provide: APP_GUARD,
      useClass: CheckRolesGuard, // Apply CheckRolesGuard globally
    },
  ],
})
export class AppModule {}
