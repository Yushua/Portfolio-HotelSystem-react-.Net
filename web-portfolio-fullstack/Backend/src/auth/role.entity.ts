import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  roleName: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @Column('text', { array: true, default: '{}' })
  pages: string[];

  @Column('text', { array: true, default: '{}' })
  ControllerRequests: string[];
}
