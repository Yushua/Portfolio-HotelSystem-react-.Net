import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotels } from './hotels.entity';

@Entity()
export class HotelVacancy {
  @PrimaryGeneratedColumn('uuid')
  VacancyId: string;

  @ManyToOne(() => Hotels, (hotels) => hotels.hotelrooms)
  hotel: Hotels;

  @Column({ default: '' })
  jobName: string;

  @Column({ default: '' })
  jobDescription: string;

  @Column({ unique: true })
  filled: boolean;

  @Column({ default: '' })
  employeeId: string;
}