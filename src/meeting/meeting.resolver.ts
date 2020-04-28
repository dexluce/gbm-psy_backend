import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Meeting } from './meeting.model';
import { MeetingService } from './meeting.service';
import { CreateMeetingInput } from './dto/create-meeting-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Evenement } from 'src/evenement/evenement.model';

@Resolver((of) => Meeting)
@UseGuards(GqlAuthGuard)
export class MeetingResolver {
  constructor(private meetingService: MeetingService) { }

  @Mutation((returns) => Meeting)
  async createMeeting(@Args('data') args: CreateMeetingInput) {
    return this.meetingService.createInEvenement({
      date: args.date,
      evenementId: args.evenementId,
      physicalAddress: args.physicalAddress
    });
  }

  @Query((returns) => [Meeting])
  async meetingsForEvenement(@Args('evenementId') evenementId: string) {
    return this.meetingService.findAllByEvenementId(evenementId);
  }
}
