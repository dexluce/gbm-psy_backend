import { Injectable } from '@nestjs/common';
import { Evenement } from 'src/evenement/evenement.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.model';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
  ) { }

  async findAllByEvenement(evenement: Evenement) {
    return this.meetingRepository.find({ where: evenement });
  }
}
