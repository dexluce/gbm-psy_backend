import { Module } from '@nestjs/common';
import { Meeting } from './meeting.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from './meeting.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting]),
  ],
  providers: [MeetingService],
  exports: [
    MeetingService,
  ]
})
export class MeetingModule {}
