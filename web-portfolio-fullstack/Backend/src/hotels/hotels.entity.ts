import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, ManyToMany } from 'typeorm';
import { HotelRooms } from './hotelsRooms.entity';
import { User } from 'src/user/user.entity';
import { HotelVacancy } from './hotelsVacancy.entity';
import { JobDataEntity } from './EmployeeData.entity';

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

  @Column('text', { array: true, default: ['cleaner', 'secretary', 'cook'] })
  hotelTitles: string[];

  @OneToMany(() => HotelVacancy, (hotelVacancy) => hotelVacancy.hotel)
  hotelVacancy: HotelVacancy[];

  @ManyToOne(() => JobDataEntity, employeeData => employeeData.hotel)
  employeeData: JobDataEntity;
}
