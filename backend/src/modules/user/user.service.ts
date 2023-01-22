import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRegisterDto } from './dto/user-register-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: User): Promise<User> {
    return this.userRepository.save({ ...data });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .addSelect('password')
      .where({ email })
      .getOne();
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
