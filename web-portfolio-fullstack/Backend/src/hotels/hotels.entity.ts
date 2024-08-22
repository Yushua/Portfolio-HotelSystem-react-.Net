import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HotelRooms } from './hotel-rooms.entity';

@Entity()
export class Hotels {
  @PrimaryGeneratedColumn('uuid')
  hotelId: string;

  @Column()
  hotelName: string;

  @Column()
  hotelOwner: string;

  @Column()
  hotelDescription: string;

  @OneToMany(() => HotelRooms, (hotelrooms) => hotelrooms.hotel)
  hotelrooms: HotelRooms[];
}
