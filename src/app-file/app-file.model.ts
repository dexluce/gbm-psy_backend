import { Field, ObjectType } from '@nestjs/graphql';
import { CommonModel } from 'src/common/common.model';
import { Column, Entity } from 'typeorm';

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

  @Column({ default: false })
  @Field((type) => Boolean, { defaultValue: false })
  isPublic: boolean;

  @Column()
  fileBucketName: string
}