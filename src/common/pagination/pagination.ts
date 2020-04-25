import { Field, ObjectType, Int, createUnionType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { User } from 'src/user/user.model';
import { Evenement } from 'src/evenement/evenement.model';

export const PaginatedUnion = createUnionType({
  name: 'Paginated',
  types: () => [UserConnection]
});

@ObjectType()
export class UserConnection extends Paginated(User) {}

@ObjectType()
export class EvenementConnection extends Paginated(Evenement) {}

export default function Paginated<TItem>(TItemClass: Type<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: false })
  class PaginatedType {
    @Field((type) => [TItemClass], { nullable: true })
    items: Array<TItem>;

    @Field(type => Int)
    total: number;
  }
  return PaginatedType;
}
