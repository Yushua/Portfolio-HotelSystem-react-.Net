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
import { HotelRooms } from './hotels/hotel-rooms.entity';
import { Hotels } from './hotels/hotels.entity';

@Module({
  imports: [
    UserModule,
    TasksModule,
    TypeOrmModule.forFeature([User, Task, HotelRooms, Hotels]), // Include Website entity in TypeOrmModule.forFeature
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Postgres-Portfolio',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    HotelsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AppModule {}
