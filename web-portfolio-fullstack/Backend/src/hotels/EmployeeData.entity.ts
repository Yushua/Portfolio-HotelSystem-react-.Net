import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Hotels } from './hotels.entity';
import { User } from 'src/user/user.entity';

/**
 * wiht the userID, you know where the job is going to.
 * the user.id tells you who the owner is and where that goes. super simple
 */
@Entity()
export class EmployeeData {
  @PrimaryGeneratedColumn('uuid')
  EmployeeyId: string;

  //you only have one boss, bos gets multille EMployeeData
  @ManyToOne(() => User, user => user.vacancies)
  bosses: User[];

  //you can have more than one job, user has more than one EmployeData
  @ManyToOne(() => User, user => user.vacancies)
  EmployeeUser: User[];

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