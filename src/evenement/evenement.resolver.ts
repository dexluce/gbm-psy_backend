import {
  Resolver,
  Query,
  Args,
  ObjectType,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Evenement } from './evenement.model';
import { EvenementService } from './evenement.service';
import { PaginatedList, PaginationArgs } from 'src/common/pagination';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/user.model';
import { GqlRoleGuard } from 'src/user/gql-role.guard';

@Resolver((of) => Evenement)
@UseGuards(GqlAuthGuard)
export class EvenementResolver {
  constructor(
    private evenementService: EvenementService,
  ) {}

  @Query((returns) => EvenementPaginatedList)
  @Roles(Role.ADMIN)
  @UseGuards(GqlRoleGuard)
  async evenements(@Args() args: PaginationArgs) {
    return this.evenementService.getEvenements( args );
  }
}

@ObjectType({
  implements: [PaginatedList],
})
class EvenementPaginatedList implements PaginatedList<Evenement> { items: Evenement[]; total: number; }