import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { UserStatus } from './user.model';
import { Hotels } from 'src/hotels/hotels.entity';
import { HotelVacancy } from 'src/hotels/hotelsVacancy.entity';
import { EmployeeData } from 'src/hotels/EmployeeData.entity';

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

  @OneToMany(() => EmployeeData, employeeData => employeeData.bosses)
  @JoinTable() // Join table to manage the many-to-many relationship
  employeed: EmployeeData[];

  @OneToOne(() => EmployeeData, employeeData => employeeData.EmployeeUser)
  @JoinTable() // Join table to manage the many-to-many relationship
  employedTo: EmployeeData[];
}
