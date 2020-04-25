import { Module } from '@nestjs/common';
import { SubscriptionToEvenement } from './subscription-to-evenement.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionToEvenement]),
  ],
})
export class SubscriptionToEvenementModule {}
