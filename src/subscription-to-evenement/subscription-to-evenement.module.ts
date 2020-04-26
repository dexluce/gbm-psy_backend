import { Module } from '@nestjs/common';
import { SubscriptionToEvenement } from './subscription-to-evenement.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionToEvenementService } from './subscription-to-evenement.service';
import { SubscriptionToEvenementController } from './subscription-to-evenement.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionToEvenement]),
  ],
  providers: [SubscriptionToEvenementService],
  controllers: [SubscriptionToEvenementController],
  exports: [SubscriptionToEvenementService],
})
export class SubscriptionToEvenementModule {}
