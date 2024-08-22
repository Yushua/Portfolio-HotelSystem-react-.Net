import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { moderatorCredentialsDto } from 'src/auth/dto/auth-moderator-credentials.dto';
import * as bcrypt from 'bcrypt';
import { WebBrowserDtoPatch } from './dto/WebBrowserDtoPatch';
// import { WebserviceService } from 'src/webservice/webservice.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
  ) {}

  async userCreation(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    let user: User = await this.userEntity.findOne({ where: { username } });
    if (!user) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user = this.userEntity.create({
        username: username,
        password: hashedPassword,
      });
      await this.userEntity.save(user);
      return user;
    } else {
      throw new ConflictException(`Username ${username} already exist`);
    }
  }

  async loginUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const user: User = await this.userNameUserExist(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    } else if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  /**
   * creates a user, through a request, this way, someone can make an acount.
   * to be a seller, or a buyer, you need to send a request.
   * normally that is by signing up, but for us, it can be a click
   * 
   * in this instance, the moderator makes an account already. for example.
   * because you never get the option to be a tester, or an owner, or an moderator.
   * you are given that option on a fresh account.
   * @param createUserDto 
   */
  async moderatorUserCreation(
    createUserDto: moderatorCredentialsDto,
  ): Promise<void> {
    const {username, password, role } = createUserDto;

    //when created, the role needs to be asked

  }

  async getUseryId(id: string): Promise<User>{
    const found: User = await this.userEntity.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return found;
  }

  async getUseryUsername(username: string): Promise<User> {
    const found: User = await this.userEntity.findOneBy({ username });
    if (!found) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    return found;
  }

  async userNameUserExist(username: string): Promise<User> {
    const user: User = await this.userEntity.findOne({ where: { username } });
    if (user) {
      return user;
    }
    throw new NotFoundException(`"${username}" not in use`);
  }

  /* user browser services */

  async checkWebrowserNameInUser(
    user: User,
    browserName: string,
  ): Promise<boolean> {
    if (user.favorites.includes(browserName)) {
      return true;
    } else {
      return false;
    }
  }

  // async addFavorite(
  //   user: User,
  //   WebBrowserDtoPatch: WebBrowserDtoPatch,
  // ): Promise<void> {
  //   const { WebBrowserName } = WebBrowserDtoPatch;
  //   await this.webserviceService.checkWebrowserName(WebBrowserName);
  //   if (await this.checkWebrowserNameInUser(user, WebBrowserName)) {
  //     throw new NotFoundException(`"${WebBrowserName}" already in favorites`);
  //   }
  //   user.favorites.push(WebBrowserName);
  //   await this.userEntity.save(user);
  // }

  // async removeFavorite(
  //   user: User,
  //   WebBrowserDtoPatch: WebBrowserDtoPatch,
  // ): Promise<void> {
  //   const { WebBrowserName } = WebBrowserDtoPatch;
  //   await this.webserviceService.checkWebrowserName(WebBrowserName);
  //   if (!(await this.checkWebrowserNameInUser(user, WebBrowserName))) {
  //     throw new NotFoundException(`"${WebBrowserName}" not in favorites`);
  //   }
  //   const index = user.favorites.indexOf(WebBrowserName);
  //   user.favorites.splice(index, 1);
  //   await this.userEntity.save(user);
  // }
}
