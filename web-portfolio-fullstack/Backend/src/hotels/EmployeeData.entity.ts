import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Hotels } from './hotels.entity';
import { User } from 'src/user/user.entity';

/**
 * wiht the userID, you know where the job is going to.
 * the user.id tells you who the owner is and where that goes. super simple
 */
@Entity()
export class JobDataEntity {
  @PrimaryGeneratedColumn('uuid')
  JobId: string;

  //you only have one boss, boss gets multille EMployeeData
  @ManyToOne(() => User, user => user.employeed)
  bosses: User;

  //you can have more than one job, user has more than one EmployeeData
  @ManyToOne(() => User, user => user.employedTo)
  EmployeeUser: User;

  @ManyToOne(() => Hotels, hotel => hotel.employeeData)
  hotel: Hotels;
  
  @Column()
  jobName: string;

  @Column()
  jobTitle: string;

  @Column()
  jobPay: number;

  @Column()
  jobDescription: string;

  @Column({ default: '' })
  email: string;
}