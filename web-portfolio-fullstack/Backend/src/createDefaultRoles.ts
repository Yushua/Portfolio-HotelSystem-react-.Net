import { getRepository } from 'typeorm';
import { RoleEntity } from './auth/role.entity';

async function createDefaultRoles() {
  const roleRepository = getRepository(RoleEntity);
  
  // Check if "Admin" role exists
  let adminRole = await roleRepository.findOne({
    where: { roleName: 'Admin' },
  });

  // If "Admin" role does not exist, create it
  if (!adminRole) {
    adminRole = roleRepository.create({ roleName: 'Admin' });
    await roleRepository.save(adminRole);
    console.log('Default "Admin" role created.');
  }
}

createDefaultRoles().catch((error) =>
  console.error('Error creating default roles:', error),
);

export default createDefaultRoles;
