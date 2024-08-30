// src/auth/roles-initializer.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity'; // Make sure the path is correct

@Injectable()
export class RolesInitializerService implements OnModuleInit {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async onModuleInit() {
    await this.createDefaultRoles();
  }

  private async createDefaultRoles() {
    // Check if "Admin" role exists
    const adminRole = await this.roleRepository.findOne({
      where: { roleName: 'Admin' },
    });

    // If "Admin" role does not exist, create it
    if (!adminRole) {
      const newAdminRole = this.roleRepository.create({ roleName: 'Admin' });
      await this.roleRepository.save(newAdminRole);
      console.log('Default "Admin" role created.');
    }
  }
}
