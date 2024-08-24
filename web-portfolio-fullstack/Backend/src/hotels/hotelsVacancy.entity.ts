import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Hotels } from './hotels.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class HotelVacancy {
  @PrimaryGeneratedColumn('uuid')
  VacancyId: string;

  @ManyToOne(() => Hotels, (hotels) => hotels.hotelVacancy)
  hotel: Hotels;

  @Column()
  jobName: string;

  @Column()
  jobTitle: string;

  @Column()
  jobPay: number;

  @Column()
  jobDescription: string;

  //add an emplpyee here, so I can see, oh... this one applied to this vacancy
  @OneToMany(() => User, (employees) => employees.vacancy)
  employees: User;
}