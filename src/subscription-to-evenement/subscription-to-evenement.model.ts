import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CommonModel } from 'src/common/common.model';
import { User } from 'src/user/user.model';
import { Evenement } from 'src/evenement/evenement.model';
import { ManyToOne, Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class SubscriptionToEvenement extends CommonModel {
  @ManyToOne(type => User, user => user.subscriptionsToEvenement)
  @Field((type) => User)
  user: User;

  @ManyToOne(type => Evenement, evenement => evenement.subscriptionsToEvenement)
  @Field((type) => Evenement)
  evenement: Evenement;

  @Column({ default: false })
  @Field((type) => Boolean)
  isInstructor: boolean;

  @Column({ default: false })
  @Field((type) => Boolean)
  isValid: boolean;
}
