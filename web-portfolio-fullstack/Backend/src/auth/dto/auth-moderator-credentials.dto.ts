import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * always one role in this DTO. because
 * owner, moderator, tester, are different.
 * for everything else, you need to send in a request.
 */
export class moderatorCredentialsDto {
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

  @IsString()
  @IsNotEmpty()
  role: string;
}
