import {
  Resolver,
  Query,
  Mutation,
  Args,
  ObjectType,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { User, Role } from './user.model';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { PaginationArgs, PaginatedList } from 'src/common/pagination';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    ) {}
    
  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Query((returns) => PaginatedList)
  @UseGuards(GqlAuthGuard)
  async users(@Args() args: PaginationArgs) {
    return this.userService.getUsers( args );
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('data') createUserData: CreateUserInput,
    @UserEntity() user: User
  ) {
    // Enforcing roles, if we're not admin or not connected, we can only create participant that need validation
    if (!user || user.role !== Role.ADMIN) {
      createUserData.isActive = false;
      createUserData.role = Role.PARTICIPANT;
    }
    // If we're connected but a simple user, we can't create another account
    if (user && user.role === Role.PARTICIPANT) {
      throw new UnauthorizedException('Vous n\'avez pas les autorisations pour créer un autre compte.')
    }
    return this.userService.createUser(createUserData);
  }

  @Mutation((returns) => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.userService.updateUser(user.id, newUserData);
  }

  @Mutation((returns) => User)
  @UseGuards(GqlAuthGuard)
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
    return this.userService.getSubscriptionsToEvenement(user);
  }
}
