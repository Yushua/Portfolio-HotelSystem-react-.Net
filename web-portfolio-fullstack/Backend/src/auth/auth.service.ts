import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RoleEntity } from './role.entity';
import { CreateRoleDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>, // Inject RoleEntity repository
    private readonly jwtService: JwtService, // Inject JwtService directly
  ) {}

  async createAuthToken(user: User): Promise<string> {
    const payload = { username: user.username, id: user.id };
    return this.jwtService.sign(payload, { secret: `topsecret51` });
  }

  /* roles */

  async createRole(createRoleDto: CreateRoleDTO): Promise<RoleEntity> {
    const existingRole = await this.roleRepository.findOneBy({
      roleName: createRoleDto.roleName,
    });

    if (existingRole) {
      throw new ConflictException('Role already found');
    }
    const newRole = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(newRole);
  }

  async deleteRole(id: string): Promise<void> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    if (role.roleName === 'Admin') {
      throw new ForbiddenException('Role Admin cannot be deleted');
    }

    await this.roleRepository.delete(id);
  }

  async GetAllRoles(): Promise<any[]> {
    return await this.roleRepository.find();
  }

  async PatchRole(methodNames: string[], roleId: string) {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });

    if (!role) {
      throw new Error('Role not found');
    }
    role.methodNames = methodNames;
    await this.roleRepository.save(role);
  }
}
