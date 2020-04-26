import { Module } from '@nestjs/common';
import { Meeting } from './meeting.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService],
  exports: [
    MeetingService,
  ]
})
export class MeetingModule {}
