import { Resolver, Mutation, Args, Query, ResolveField, Parent, Context, GqlExecutionContext } from '@nestjs/graphql';
import { Meeting } from './meeting.model';
import { MeetingService } from './meeting.service';
import { CreateMeetingInput } from './dto/create-meeting-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Evenement } from 'src/evenement/evenement.model';
import { UserEntity } from 'src/user/user.decorator';
import { User } from 'src/user/user.model';

@Resolver((of) => Meeting)
@UseGuards(GqlAuthGuard)
export class MeetingResolver {
  constructor(private meetingService: MeetingService) { }

  @Query((returns) => Meeting)
  async meeting(@Args('id') id: string) {
    return this.meetingService.findById(id);
  }

  @Mutation((returns) => Meeting)
  async createMeeting(@Args('data') args: CreateMeetingInput) {
    return this.meetingService.createInEvenement({
      date: args.date,
      evenementId: args.evenementId,
      physicalAddress: args.physicalAddress,
    });
  }

  @Query((returns) => [Meeting])
  async meetingsForEvenement(@Args('evenementId') evenementId: string) {
    return this.meetingService.findAllByEvenementId(evenementId);
  }

  @ResolveField('jitsiMeetToken')
  async jitsiMeetToken(@Parent() meeting: Meeting, @UserEntity() user: User) {
    if (meeting.virtualAddress) {
      return this.meetingService.getToken(meeting, user);
    } else {
      return '';
    }
  }
}
