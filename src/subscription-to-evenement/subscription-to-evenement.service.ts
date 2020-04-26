import { Injectable } from '@nestjs/common';
import { SubscriptionToEvenement } from './subscription-to-evenement.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evenement } from 'src/evenement/evenement.model';
import { User } from 'src/user/user.model';

@Injectable()
export class SubscriptionToEvenementService {
  constructor(
    @InjectRepository(SubscriptionToEvenement)
    private readonly subscriptionToEvenementRepository: Repository<SubscriptionToEvenement>,
  ) { }

  async getUser(subscriptionToEvenement: SubscriptionToEvenement) {
    return (await this.subscriptionToEvenementRepository.findOne({
      where: subscriptionToEvenement,
      relations: ['user'],
    })).user;
  }

  async getEvenement(subscriptionToEvenement: SubscriptionToEvenement) {
    return (await this.subscriptionToEvenementRepository.findOne({
      where: subscriptionToEvenement,
      relations: ['evenement'],
    })).evenement;
  }

  async findAllByEvenement(evenement: Evenement) {
    return this.subscriptionToEvenementRepository.find({ where: evenement });
  }

  async findAllByUser(user: User) {
    return this.subscriptionToEvenementRepository.find({ where: user });
  }
}
