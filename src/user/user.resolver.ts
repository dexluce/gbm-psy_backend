import {
  Resolver,
  Query,
  Mutation,
  Args,
  ObjectType,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from './user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { User, Role } from './user.model';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { Roles } from './roles.decorator';
import { GqlRoleGuard } from './gql-role.guard';
import { PaginationArgs, PaginatedList } from 'src/common/pagination';

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

  @Query((returns) => PaginatedList)
  @Roles(Role.ADMIN)
  @UseGuards(GqlRoleGuard)
  async users(@Args() args: PaginationArgs) {
    return this.userService.getUsers( args );
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

  @ResolveField('subscriptionsToEvenement')
  async subscriptionsToEvenement(@Parent() user: User) {
    console.log(await this.userService.getSubscriptionsToEvenement(user))
    return this.userService.getSubscriptionsToEvenement(user);
  }
}
