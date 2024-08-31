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

  //stores pages names
  @Column('text', { array: true, default: '{}' })
  pageNames: string[];

  @Column('text', { array: true, default: '{}' })
  methodNames: string[];
}
