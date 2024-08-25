import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HotelRooms } from './hotelsRooms.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class RoomBooking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => HotelRooms, hotelRoom => hotelRoom.bookings)
  @JoinColumn({ name: 'hotelRoomId' })
  hotelRoom: HotelRooms;

  @ManyToOne(() => User, user => user.bookings)
  @JoinColumn({ name: 'userId' })
  user: User;

  // Start date of the booking
  @Column('date')
  startDate: Date;

  // End date of the booking
  @Column('date')
  endDate: Date;
}