import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotels } from './hotels.entity';

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

  @Column('text', { array: true, default: '{}' })
  employeeId: string[];
}