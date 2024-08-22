import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotels } from './hotels.entity';

@Entity()
export class HotelRooms {
  @PrimaryGeneratedColumn('uuid')
  hotelRoomId: string;

  @Column()
  hotelRoomNumber: number;

  @Column()
  hotelId: string;

  @Column()
  hotelRoomDescription: string;

  @Column()
  BigBed: number;

  @Column()
  SmallBed: number;

  @Column()
  Rooms: number;

  @Column({ default: false })
  Kitchen: boolean;

  @Column({ default: false })
  Wifi: boolean;

  @ManyToOne(() => Hotels, (hotels) => hotels.hotelrooms)
  hotel: Hotels;
}
