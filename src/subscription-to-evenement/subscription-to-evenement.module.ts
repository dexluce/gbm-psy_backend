import { Module } from '@nestjs/common';
import { SubscriptionToEvenement } from './subscription-to-evenement.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionToEvenementService } from './subscription-to-evenement.service';
import { SubscriptionToEvenementResolver } from './subscription-to-evenement.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionToEvenement]),
  ],
  providers: [SubscriptionToEvenementService, SubscriptionToEvenementResolver],
  exports: [SubscriptionToEvenementService],
})
export class SubscriptionToEvenementModule {}
