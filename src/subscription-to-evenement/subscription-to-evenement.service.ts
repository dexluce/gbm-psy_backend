import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createSubscriptionToEvenement(data: {
    userId: string,
    evenementId: string,
    isInstructor: boolean,
    isValid: boolean,
    isCertified: boolean,
  }) {
    return this.subscriptionToEvenementRepository.save(data);
  }

  async updateSubscriptionToEvenement(data: {
    id: string,
    isValid?: boolean,
    isCertified?: boolean,
  }) {
    let subscriptionToEvenement = await this.subscriptionToEvenementRepository.findOne(data.id);
    if (!subscriptionToEvenement) {
      throw new NotFoundException(`L'inscription en question n'existe pas en base de donnée`);
    }

    if (data.isValid !== undefined) subscriptionToEvenement.isValid = data.isValid;
    if (data.isCertified !== undefined) subscriptionToEvenement.isCertified = data.isCertified;

    await this.subscriptionToEvenementRepository.update(data.id, subscriptionToEvenement);

    return subscriptionToEvenement;
  }
}
