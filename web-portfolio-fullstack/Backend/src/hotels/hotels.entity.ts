import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { HotelRooms } from './hotelsRooms.entity';
import { User } from 'src/user/user.entity';

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

  @ManyToOne(() => User, user => user.hotels)
  user: User;

  @OneToMany(() => HotelRooms, (hotelrooms) => hotelrooms.hotel)
  hotelrooms: HotelRooms[];
}
