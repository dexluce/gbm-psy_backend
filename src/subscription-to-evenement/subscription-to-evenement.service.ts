import { Injectable } from '@nestjs/common';
import { SubscriptionToEvenement } from './subscription-to-evenement.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evenement } from 'src/evenement/evenement.model';

@Injectable()
export class SubscriptionToEvenementService {
  constructor(
    @InjectRepository(SubscriptionToEvenement)
    private readonly subscriptionToEvenementRepository: Repository<SubscriptionToEvenement>,
  ) { }

  async findAllByEvenement(evenement: Evenement) {
    return this.subscriptionToEvenementRepository.find({ where: evenement });
  }
}
