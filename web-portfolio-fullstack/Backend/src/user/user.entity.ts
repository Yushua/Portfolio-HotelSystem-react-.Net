import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserStatus } from './user.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //can change
  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: UserStatus.IN_PROGRESS })
  status: UserStatus;
  
  @Column({ default: '' })
  email: string;

  @Column({ default: false })
  twoFactorAuth: boolean;

  //roles are set in the authentication section. never anywhere else. due to security risks
  @Column('text', { array: true, default: '{}' })
  roles: string[];

  @Column('text', {
    array: true,
    default: ['Profile', 'Hotels', 'Marketplace', 'Wastelander 1'],
  })
  favorites: string[];
}
