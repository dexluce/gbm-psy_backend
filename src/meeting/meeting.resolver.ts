import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Meeting } from './meeting.model';
import { MeetingService } from './meeting.service';
import { CreateMeetingInput } from './dto/create-meeting-input.dto';

@Resolver((of) => Meeting)
export class MeetingResolver {
  constructor(private meetingService: MeetingService) { }

  @Mutation((returns) => Meeting)
  async createMeeting(@Args() args: CreateMeetingInput) {
    this.meetingService.createInEvenement(args);
  }
}
