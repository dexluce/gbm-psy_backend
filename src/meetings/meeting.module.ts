import { Module } from '@nestjs/common';
import { Meeting } from './meeting.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting]),
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService],
})
export class MeetingModule {}
