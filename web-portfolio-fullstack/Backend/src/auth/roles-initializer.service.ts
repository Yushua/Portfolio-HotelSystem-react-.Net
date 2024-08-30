import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

@Injectable()
export class RolesInitializerService implements OnModuleInit {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createDefaultRoles();
    await this.createDefaultUser();
  }

  private async createDefaultRoles() {
    const adminRole = await this.roleRepository.findOne({
      where: { roleName: 'Admin' },
    });

    if (!adminRole) {
      const newAdminRole = this.roleRepository.create({ roleName: 'Admin' });
      await this.roleRepository.save(newAdminRole);
      console.log('Default "Admin" role created.');
    }
  }

  private async createDefaultUser() {
    // Check if the "Admin" role exists
    const adminRole = await this.roleRepository.findOne({
      where: { roleName: 'Admin' },
    });

    if (!adminRole) {
      console.error('Admin role not found. Cannot create default admin user.');
      return;
    }

    // Check if the user "admin" already exists
    const adminUser = await this.userRepository.findOne({
      where: { username: 'admin' },
    });

    if (!adminUser) {
      // Hash the password before saving to database
      const hashedPassword = await bcrypt.hash('admin', 10);

      // Create the new admin user
      const newAdminUser = this.userRepository.create({
        username: 'admin',
        password: hashedPassword,
        role: adminRole, // Assign the Admin role to the new user
      });

      await this.userRepository.save(newAdminUser);
      console.log('Default "admin" user created.');
    }
  }
}
