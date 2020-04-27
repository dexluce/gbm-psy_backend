import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evenement } from './evenement.model';
import { EvenementResolver } from './evenement.resolver';
import { EvenementService } from './evenement.service';
import { AppFileModule } from 'src/app-file/app-file.module';
import { MeetingModule } from 'src/meeting/meeting.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evenement]),
    AppFileModule,
    MeetingModule,
  ],
  providers: [EvenementResolver, EvenementService],
  exports: [
    EvenementService,
  ],
})
export class EvenementModule {}
