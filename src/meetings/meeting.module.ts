import { Module } from '@nestjs/common';
import { Meeting } from './meeting.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting]),
  ],
})
export class MeetingModule {}
