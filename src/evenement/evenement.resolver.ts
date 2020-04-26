import {
  Resolver,
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
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
import { AppFileService } from 'src/app-file/app-file.service';
import { Repository } from 'typeorm';
import { AppFile } from 'src/app-file/app-file.model';
import { MeetingService } from 'src/meeting/meeting.service';

@Resolver((of) => Evenement)
@UseGuards(GqlAuthGuard)
export class EvenementResolver {
  constructor(
    private evenementService: EvenementService,
    private appFileService: AppFileService,
    private meetingService: MeetingService
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

  @ResolveField('files')
  async files(@Parent() evenement: Evenement) {
    return this.appFileService.findAll(evenement);
  }

  @ResolveField('meetings')
  async meetings(@Parent() evenement: Evenement) {
    return this.meetingService.findAllByEvenement(evenement);
  }
}
