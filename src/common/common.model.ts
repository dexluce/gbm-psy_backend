import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class CommonModel {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: string;

  @Column({ default: () => `now()` })
  @Field((type) => Date)
  createdAt: Date;

  @Column({ default: () => `now()` })
  @Field((type) => Date)
  updatedAt: Date;
}
