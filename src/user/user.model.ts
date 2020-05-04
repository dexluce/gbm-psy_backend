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

export enum Sex {
  MONSIEUR = 'MONSIEUR',
  MADAME = 'MADAME',
}

registerEnumType(Sex, {
  name: 'Sex',
  description: 'User sex',
});

@Entity()
@Unique(["email"])
@ObjectType()
export class User extends CommonModel {
  @Column()
  @Field((type) => Sex)
  sex: Sex;

  @Column()
  @Field((type) => String)
  firstname?: string;

  @Column()
  @Field((type) => String)
  lastname?: string;

  @Column()
  @Field((type) => String)
  email: string;
  
  @Column()
  @Field((type) => String)
  phone: string;
  
  @Column()
  @Field((type) => String)
  profession: string;

  @Column()
  @Field((type) => String)
  profession_place: string;
  
  @Column()
  @Field((type) => String)
  personnal_address: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  chargeable_address: string;

  @Column()
  password: string;

  @Column()
  @Field((type) => Boolean)
  isActive: boolean;

  @Column()
  @Field((type) => Role)
  role: Role;
  
  @OneToMany(type => SubscriptionToEvenement, subscriptionToEvenement => subscriptionToEvenement.user)
  @Field((type) => [SubscriptionToEvenement])
  subscriptionsToEvenement: SubscriptionToEvenement[];
}
