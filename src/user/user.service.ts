import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.model';
import { getConnection, Repository, Like } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs } from 'src/common/pagination/pagination-args';
import { UserOrder } from './user.order';
import { PasswordService } from './password.service';
import { ChangePasswordInput } from './dto/change-password.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {}
  async getUserById(id: string) {
    return this.usersRepository.findOne(id);
  }

  async getUserByMail(email: string) {
    return this.usersRepository.findOne({where: {email}});
  }

  async getUsers({pageNumber,pageSize}: PaginationArgs, filter: string, orderBy: UserOrder) {
    const [users, total] = await this.usersRepository.findAndCount({
      where: filter ? [
        { firstName: Like('%' + filter + '%') },
        { lastName: Like('%' + filter + '%') },
        { mail: Like('%' + filter + '%') },
      ] : [],
      order: orderBy ? {
        [orderBy.field]: orderBy.direction,
      } : {},
      take: pageSize,
      skip: pageNumber * pageSize,
    });

    return {
      items: users,
      total: total
    }
  }

  async createUser(createUserData: CreateUserInput) {
    const user = {
      ...createUserData,
      password: await this.passwordService.hashPassword(createUserData.password),
    }
    return this.usersRepository.save(user);
  }

  async updateUser(userId: string, updateUserData: UpdateUserInput) {
    return this.usersRepository.update({ id: userId }, updateUserData );
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.usersRepository.update({ id: userId }, { password: hashedPassword });
  }
}
