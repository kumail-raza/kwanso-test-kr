import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import * as Argon2 from 'argon2';
import { UserRegisterDto } from './dto/user-register-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: UserRegisterDto): Promise<any> {
    const hashedpassword = await Argon2.hash(data.password);

    const userData = new User();
    userData.password = hashedpassword;
    userData.name = data.name;
    userData.email = data.email;

    return this.userService
      .create(userData)
      .then((user) => {
        delete user.password;
        return { user };
      })
      .catch((error) => {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Failed to create user',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: error,
          },
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getUser(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
