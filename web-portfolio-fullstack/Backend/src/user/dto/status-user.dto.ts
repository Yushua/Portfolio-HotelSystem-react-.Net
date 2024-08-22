// import { Column } from "typeorm";

import { IsEnum } from 'class-validator';
import { UserStatus } from '../user.model';

export class UserStatusDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}
