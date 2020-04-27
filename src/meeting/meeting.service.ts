import { Injectable } from '@nestjs/common';
import { Evenement } from 'src/evenement/evenement.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.model';
import { Repository } from 'typeorm';
import { CreateMeetingInput } from './dto/create-meeting-input.dto';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
  ) { }

  async findAllByEvenement(evenement: Evenement) {
    return this.meetingRepository.find({ where: evenement });
  }

  async createInEvenement({ evenementId, physicalAddress, date }: CreateMeetingInput) {
    return this.meetingRepository.save({
      evenement: {id: evenementId},
      physicalAddress,
      date,
    });
  }
}
