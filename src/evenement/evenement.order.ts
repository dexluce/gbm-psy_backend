import { Field, InputType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum EvenementOrderField {
  id = 'id',
  title = 'title',
}

registerEnumType(EvenementOrderField, {
  name: 'EvenementOrderField',
  description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class EvenementOrder extends Order {
  @Field((type) => EvenementOrderField)
  field: EvenementOrderField;
}
