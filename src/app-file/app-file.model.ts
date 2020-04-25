import { Field, ObjectType } from '@nestjs/graphql';
import { CommonModel } from 'src/common/common.model';

@ObjectType()
export class AppFile extends CommonModel {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  url: string;
}