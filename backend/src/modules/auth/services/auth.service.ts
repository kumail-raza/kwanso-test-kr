import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
;
import * as Argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserCreds(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new BadRequestException();

    const isUserValidate = await Argon2.verify(user.password, password);

    if (!isUserValidate) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return user;
  }

  generateToken(user: any) {
    return {
      jwt: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    };
  }
}
