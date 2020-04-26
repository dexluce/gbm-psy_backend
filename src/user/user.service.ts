import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.model';
import { Repository, Like } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from './password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { PaginationArgs } from 'src/common/pagination';

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

  async getUsers(options: PaginationArgs) {
    const { filter=' ', orderBy, orderDirection, pageSize, pageNumber } = options;
    const [users, total] = await this.usersRepository.findAndCount({
      where: filter ? [
        { firstname: Like('%' + filter + '%') },
        { lastname: Like('%' + filter + '%') },
        { email: Like('%' + filter + '%') },
      ] : [],
      order: orderBy ? {
        [orderBy]: orderDirection,
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

  async getSubscriptionsToEvenement(user: User) {
    return (await this.usersRepository.findOne({
      where: user,
      relations: ['subscriptionsToEvenement']
    })).subscriptionsToEvenement;
  }
}
