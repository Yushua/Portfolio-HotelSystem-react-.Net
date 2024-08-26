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

  //when true, the room is truly booked
  @Column({ default: false })
  Status: boolean;

  private _passcode: string;

  // Use a varchar column to store a 4-character passcode
  @Column('varchar', { length: 4 })
  get passcode(): string {
    return this._passcode;
  }
}