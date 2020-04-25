import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from './password.service';

@Module({
  providers: [UserResolver, UserService, PasswordService],
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [
    UserService,
    PasswordService,
  ],
})
export class UserModule {}
