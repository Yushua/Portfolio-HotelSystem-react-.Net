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
import { CheckRolesGuard } from './auth/auth-checkRoles';
import { RouteServiceModule } from './routes/route.module';
import { APP_GUARD, DiscoveryModule } from '@nestjs/core'; // Import DiscoveryModule

@Module({
  imports: [
    UserModule,
    TasksModule,
    TypeOrmModule.forFeature([User, Task, HotelRooms, Hotels, RoleEntity]),
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
    RouteServiceModule, // Ensure RouteServiceModule is imported
    DiscoveryModule,   // Import DiscoveryModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: CheckRolesGuard,
    },
  ],
})
export class AppModule {}
