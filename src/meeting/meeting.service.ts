import { Injectable } from '@nestjs/common';
import { Evenement } from 'src/evenement/evenement.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.model';
import { Repository } from 'typeorm';
import { CreateMeetingInput } from './dto/create-meeting-input.dto';
import { User } from 'src/user/user.model';
import * as Jwt from 'jsonwebtoken';
import { getNormalizedRandomizedName } from 'src/common/utils';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
  ) { }

  async findById(id: string) {
    return this.meetingRepository.findOne({ where: { id }, relations: ['evenement']});
  }

  async findAllByEvenementId(id: string) {
    return this.meetingRepository.find({
      where: { evenement: {id} },
      order: { date: 'DESC' }
    });
  }

  async refreshVirtualRoom(meetingId: string) {
    const virtualRoomName = getNormalizedRandomizedName('GBMvirtualRoom' + meetingId)
    await this.meetingRepository.update(meetingId, {virtualAddress: virtualRoomName});
    return this.meetingRepository.findOne(meetingId, {relations: ['evenement']});
  }

  async createInEvenement({ evenementId, physicalAddress, date }: CreateMeetingInput) {
    return this.meetingRepository.save({
      evenement: {id: evenementId},
      physicalAddress,
      date,
    });
  }

  async getToken(meeting: Meeting, user: User) {
    return Jwt.sign({
      "context": {
        "user": {
          "name": `${user.firstname} ${user.lastname}`,
          "email": user.email
        }
      },
      "aud": process.env.APP_JITSI_JWT_APP_ID,
      "iss": 'frontend',
      "sub": "web",
      "room": meeting.virtualAddress
    }, process.env.APP_JITSI_JWT_APP_SECRET)
  }
}
