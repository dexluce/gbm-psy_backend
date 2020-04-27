import { Module } from '@nestjs/common';
import { Meeting } from './meeting.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from './meeting.service';
import { MeetingResolver } from './meeting.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting]),
  ],
  providers: [MeetingService, MeetingResolver],
  exports: [
    MeetingService,
  ]
})
export class MeetingModule {}
