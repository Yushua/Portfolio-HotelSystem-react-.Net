import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class credentialsDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  roleName: string;
}

export class patchMethodNamesInRolesDTO {
  @IsString()
  @IsNotEmpty()
  methodNames: string[];

  @IsString()
  @IsNotEmpty()
  roleId: string;
}
