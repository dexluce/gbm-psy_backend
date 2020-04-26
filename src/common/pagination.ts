import { Field, ArgsType , Int, createUnionType, InterfaceType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { Evenement } from 'src/evenement/evenement.model';
import { Meeting } from 'src/meetings/meeting.model';

export enum OrderDirectionEnum { ASC='ASC', DESC='DESC' }
  registerEnumType(OrderDirectionEnum, {
    name: 'OrderDirection',
  });

@ArgsType()
export class PaginationArgs {
  @Field((type) => String, { nullable: true, defaultValue: '' })
  orderBy: string

  @Field((type) => OrderDirectionEnum, { nullable: true, defaultValue: OrderDirectionEnum.ASC })
  orderDirection: OrderDirectionEnum;
 
  @Field((type) => String, { nullable: true, defaultValue: '' })
  filter: string

  @Field((type) => Int, { nullable: true, defaultValue: 0 })
  pageNumber: number

  @Field((type) => Int, { nullable: true, defaultValue: 5 })
  pageSize: number
}

export const PaginableRessourceUnion = createUnionType({
  name: 'PaginableRessource',
  types: () => [User, Evenement, Meeting],
})

@InterfaceType()
export abstract class PaginatedList<PaginableRessources> {
  @Field((type) => [PaginableRessourceUnion])
  items: PaginableRessources[];
  @Field((type) => Int)
  total: number;
}

@ObjectType({
  implements: [PaginatedList],
})
export class MeetingPaginatedList implements PaginatedList<Meeting> { items: Meeting[]; total: number; }