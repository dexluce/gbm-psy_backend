import { Field, ObjectType } from '@nestjs/graphql';
import { CommonModel } from 'src/common/common.model';
import { Evenement } from 'src/evenement/evenement.model';
import { Column, ManyToOne, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Meeting extends CommonModel {
  @Column()
  @Field((type) => Date)
  date: Date;

  @Column({ default: '' })
  @Field((type) => String, { nullable: true })
  virtualAddress: string;

  @Column({ default: '' })
  @Field((type) => String, { nullable: true })
  physicalAddress: string;

  @ManyToOne(type => Evenement, evenement => evenement.meetings)
  @Field((type) => Evenement)
  evenement: Evenement;
}
