import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { nullable: true })
  pageNumber?: number;

  @Field((type) => Int, { nullable: true })
  pageSize?: number;
}
