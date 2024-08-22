import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Hotels } from './hotels.entity';

@Entity()
export class HotelRooms {
  @PrimaryGeneratedColumn('uuid')
  hotelRoomId: string;

  @Column()
  hotelRoomNumber: number;

  @Column()
  hotelRoomName: number;

  @Column()
  hotelRoomEmployee: number;

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

  @ManyToOne(() => Hotels, (hotels) => hotels.hotelrooms)
  hotel: Hotels;
}