import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CommonModel } from 'src/common/common.model';
import { SubscriptionToEvenement } from 'src/subscription-to-evenement/subscription-to-evenement.model';

export enum Role {
  ADMIN = 'ADMIN',
  FORMATOR = 'FORMATOR',
  PARTICIPANT = 'PARTICIPANT',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@Entity()
@Unique(["email"])
@ObjectType()
export class User extends CommonModel {
  @Column()
  @Field((type) => String)
  email: string;

  @Column()
  @Field((type) => String, { nullable: true })
  firstname?: string;

  @Column()
  @Field((type) => Boolean)
  isActive: boolean;

  @Column()
  @Field((type) => String, { nullable: true })
  lastname?: string;

  @Column()
  @Field((type) => Role)
  role: Role;

  @OneToMany(type => SubscriptionToEvenement, subscriptionToEvenement => subscriptionToEvenement.user)
  @Field((type) => [SubscriptionToEvenement])
  subscriptionsToEvenement: SubscriptionToEvenement[];

  @Column()
  password: string;
}
