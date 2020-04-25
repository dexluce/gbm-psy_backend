import {
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from './user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { User, Role } from './user.model';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserOrder } from './user.order';
import { PaginationArgs } from 'src/common/pagination/pagination-args';
import { CreateUserInput } from './dto/create-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { Roles } from './roles.decorator';
import { GqlRoleGuard } from './gql-role.guard';
import { UserConnection } from 'src/common/pagination/pagination';

@Resolver((of) => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query((returns) => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Query((returns) => UserConnection)
  @Roles(Role.ADMIN)
  @UseGuards(GqlRoleGuard)
  async users(
    @Args() paginationArgs: PaginationArgs,
    @Args({ name: 'filter', type: () => String, nullable: true })
    filter: string,
    @Args({
      name: 'orderBy',
      type: () => UserOrder,
      nullable: true,
    })
    orderBy: UserOrder
  ) {
    return this.userService.getUsers( paginationArgs, filter, orderBy );
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('data') createUserData: CreateUserInput
  ) {
    return this.userService.createUser(createUserData);
  }

  @Mutation((returns) => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.userService.updateUser(user.id, newUserData);
  }

  @Mutation((returns) => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.userService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }
}
