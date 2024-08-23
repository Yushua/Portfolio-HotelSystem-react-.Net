import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class HotelEmployee {
  @PrimaryGeneratedColumn()
  EmployeeId: number;

  @Column()
  EmployeeName: string;

  @OneToOne(() => User, user => user.employee)
  user: User;
}
