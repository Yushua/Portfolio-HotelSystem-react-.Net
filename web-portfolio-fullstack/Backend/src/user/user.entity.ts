import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { UserStatus } from './user.model';
import { Hotels } from 'src/hotels/hotels.entity';
import { HotelVacancy } from 'src/hotels/hotelsVacancy.entity';
import { EmployeeDataEntity } from 'src/hotels/EmployeeData.entity';
import { RoomBooking } from 'src/hotels/hotelRoomBooking';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  //can change
  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: UserStatus.IN_PROGRESS })
  status: UserStatus;
  
  @Column({ default: '' })
  email: string;

  @Column({ default: false })
  twoFactorAuth: boolean;

  @Column('text', { array: true, default: '{}' })
  roles: string[];

  //Hotels.

  @OneToMany(() => Hotels, hotels => hotels.user)
  hotels: Hotels[];

  //employeeData

  @ManyToMany(() => HotelVacancy, vacancy => vacancy.users)
  @JoinTable() // Join table to manage the many-to-many relationship
  vacancies: HotelVacancy[];
   //

  @OneToMany(() => EmployeeDataEntity, employeeDataEntity => employeeDataEntity.bosses)
  @JoinTable() // Join table to manage the many-to-many relationship
  employeed: EmployeeDataEntity[];

  @OneToOne(() => EmployeeDataEntity, employeeDataEntity => employeeDataEntity.EmployeeUser)
  @JoinTable() // Join table to manage the many-to-many relationship
  employedTo: EmployeeDataEntity[];

  @OneToMany(() => RoomBooking, roomBooking => roomBooking.user)
  bookings: RoomBooking[];
}
