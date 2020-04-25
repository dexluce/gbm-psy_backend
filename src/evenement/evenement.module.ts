import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evenement } from './evenement.model';
import { EvenementResolver } from './evenement.resolver';
import { EvenementService } from './evenement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evenement]),
  ],
  providers: [EvenementResolver, EvenementService],
})
export class EvenementModule {}
