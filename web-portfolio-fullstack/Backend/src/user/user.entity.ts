import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { UserStatus } from './user.model';
import { Hotels } from 'src/hotels/hotels.entity';
import { HotelVacancy } from 'src/hotels/hotelsVacancy.entity';
import { JobDataEntity } from 'src/hotels/EmployeeData.entity';
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
  @JoinTable() 
  vacancies: HotelVacancy[];

  //who I employed
  @OneToMany(() => JobDataEntity, JobDataEntity => JobDataEntity.bosses)
  @JoinTable() 
  employeed: JobDataEntity[];

  //where I am employed
  @OneToOne(() => JobDataEntity, JobDataEntity => JobDataEntity.EmployeeUser)
  @JoinTable() 
  employedTo: JobDataEntity[];

  @OneToMany(() => RoomBooking, roomBooking => roomBooking.user)
  bookings: RoomBooking[];
}
