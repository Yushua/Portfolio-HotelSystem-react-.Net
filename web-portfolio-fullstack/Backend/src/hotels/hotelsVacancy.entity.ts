import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Hotels } from './hotels.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class HotelVacancy {
  @PrimaryGeneratedColumn('uuid')
  VacancyId: string;

  @ManyToOne(() => Hotels, (hotels) => hotels.hotelVacancy, { onDelete: 'CASCADE' })
  hotel: Hotels;

  @Column()
  jobName: string;

  @Column()
  jobTitle: string;

  @Column()
  jobPay: number;

  @Column()
  jobDescription: string;

  @ManyToMany(() => User, user => user.vacancies, { cascade: true })
  users: User[];
}