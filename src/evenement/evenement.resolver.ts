import {
  Resolver,
  Query,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Evenement } from './evenement.model';
import { EvenementService } from './evenement.service';
import { PaginatedList, PaginationArgs } from 'src/common/pagination';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/user.model';
import { GqlRoleGuard } from 'src/user/gql-role.guard';
import { CreateEvenementInput } from './dto/create-evenement-input.dto';

@Resolver((of) => Evenement)
@UseGuards(GqlAuthGuard)
export class EvenementResolver {
  constructor(
    private evenementService: EvenementService,
  ) {}

  @Query((returns) => PaginatedList)
  @Roles(Role.ADMIN)
  @UseGuards(GqlRoleGuard)
  async evenements(@Args() args: PaginationArgs) {
    return this.evenementService.getEvenements( args );
  }

  @Mutation((returns) => Evenement)
  async createEvenement(
    @Args('data') createEvenementData: CreateEvenementInput
  ) {
    return this.evenementService.createEvenement(createEvenementData);
  }

}
