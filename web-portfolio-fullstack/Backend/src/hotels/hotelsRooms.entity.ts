import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Hotels } from './hotels.entity';
import { RoomBooking } from './hotelRoomBooking';

@Entity()
export class HotelRooms {
  @PrimaryGeneratedColumn('uuid')
  hotelRoomId: string;

  @Column()
  hotelRoomNumber: string;

  @Column()
  hotelRoomName: string;

  @Column()
  hotelRoomEmployee: string;

  @Column()
  hotelRoomDescription: string;

  @Column({ default: false })
  Kitchen: boolean;

  @Column({ default: false })
  Wifi: boolean;

  @Column({ default: false })
  Breakfast: boolean;

  @Column({ default: false })
  Roomservice: boolean;

  @Column({ default: false })
  Animals: boolean;

  @Column()
  BigBed: number;

  @Column()
  SmallBed: number;

  @Column()
  Rooms: number;

  @Column({ default: 0 })
  Price: number;

  @ManyToOne(() => Hotels, (hotels) => hotels.hotelrooms)
  hotel: Hotels;

  @OneToMany(() => RoomBooking, roomBooking => roomBooking.hotelRoom)
  bookings: RoomBooking[];
}