import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { HotelRooms } from './hotelsRooms.entity';
import { User } from 'src/user/user.entity';
import { HotelVacancy } from './hotelsVacancy';

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

  @OneToMany(() => HotelVacancy, (hotelVacancy) => hotelVacancy.hotel)
  hotelVacancy: HotelVacancy[];
}
