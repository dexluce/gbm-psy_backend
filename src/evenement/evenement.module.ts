import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evenement } from './evenement.model';
import { EvenementResolver } from './evenement.resolver';
import { EvenementService } from './evenement.service';
import { AppFileModule } from 'src/app-file/app-file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evenement]),
    AppFileModule
  ],
  providers: [EvenementResolver, EvenementService],
  exports: [
    EvenementService,
  ],
})
export class EvenementModule {}
