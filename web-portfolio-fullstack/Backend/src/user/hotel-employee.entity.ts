import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class HotelEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => User, user => user.employee)
  user: User;
}
