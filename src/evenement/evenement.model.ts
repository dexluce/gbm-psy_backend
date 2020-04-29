import { Field, ObjectType } from '@nestjs/graphql';
import { CommonModel } from 'src/common/common.model';
import { SubscriptionToEvenement } from 'src/subscription-to-evenement/subscription-to-evenement.model';
import { Meeting } from 'src/meeting/meeting.model';
import { AppFile } from 'src/app-file/app-file.model';
import { Column, OneToMany, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Evenement extends CommonModel {
  @Column()
  @Field((type) => String)
  title: string;

  @Column('text', { nullable: true })
  @Field((type) => String, { nullable: true })
  description: string;

  @OneToMany(type => SubscriptionToEvenement, subscriptionToEvenement => subscriptionToEvenement.evenement)
  @Field((type) => [SubscriptionToEvenement])
  subscriptionsToEvenement: SubscriptionToEvenement[];

  @OneToMany(type => Meeting, meeting => meeting.evenement)
  @Field((type) => [Meeting])
  meetings: Meeting[];
  
  @Column()
  @Field((type) => Boolean)
  isActive: boolean;

  @Column()
  @Field((type) => Boolean)
  isPublic: boolean;

  @Column()
  fileBucketName: string
  
  @OneToMany(type => AppFile, appFile => appFile.evenement)
  @Field((type) => [AppFile])
  files: AppFile[];
}
