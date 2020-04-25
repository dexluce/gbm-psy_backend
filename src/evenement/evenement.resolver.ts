import {
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { PaginationArgs } from 'src/common/pagination/pagination-args';
import { EvenementConnection } from 'src/common/pagination/pagination';
import { Evenement } from './evenement.model';
import { EvenementService } from './evenement.service';
import { Role } from 'src/user/user.model';
import { Roles } from 'src/user/roles.decorator';
import { GqlRoleGuard } from 'src/user/gql-role.guard';
import { EvenementOrder } from './evenement.order';

@Resolver((of) => Evenement)
@UseGuards(GqlAuthGuard)
export class EvenementResolver {
  constructor(
    private evenementService: EvenementService,
  ) {}

  @Query(() => EvenementConnection)
  @Roles(Role.ADMIN)
  @UseGuards(GqlRoleGuard)
  async evenements(
    @Args() paginationArgs: PaginationArgs,
    @Args({ name: 'filter', type: () => String, nullable: true })
    filter: string,
    @Args({
      name: 'orderBy',
      type: () => EvenementOrder,
      nullable: true,
    })
    orderBy: EvenementOrder
  ) {
    return this.evenementService.getEvenements(paginationArgs, filter, orderBy);
  }
}
