import { Field, ObjectType } from '@nestjs/graphql';
import { CommonModel } from 'src/common/common.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Evenement } from 'src/evenement/evenement.model';

@Entity()
@ObjectType()
export class AppFile extends CommonModel {
  @Column()
  @Field((type) => String)
  name: string;
  
  @Column({ default: '' })
  @Field((type) => String, { defaultValue: '' })
  description: string;

  @Field((type) => String)
  src: string;

  @Column((type) => String)
  bucketName: string

  @Column({ default: false })
  @Field((type) => Boolean, { defaultValue: false })
  isPublic: boolean;

  @ManyToOne(type => Evenement, evenement => evenement.files)
  @Field((type) => Evenement)
  evenement: Evenement
}