// import { Column } from "typeorm";

import { IsOptional, IsEnum, IsString } from 'class-validator';
import { UserService } from '../user.service';

export class GetUsersFilterDto {
  @IsOptional()
  @IsEnum(UserService)
  status?: UserService;
  @IsOptional()
  @IsString()
  search?: string;
}
