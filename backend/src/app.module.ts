import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './modules/task/task.entity';
import { UserController } from './modules/user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { User } from './modules/user/user.entity';
import { TaskController } from "./modules/task/task.controller";
import { TaskModule } from "./modules/task/task.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User, Task],
      synchronize: true,
    }),
    UserModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, TaskController],
  providers: [AppService, JwtService],
})
export class AppModule {}
