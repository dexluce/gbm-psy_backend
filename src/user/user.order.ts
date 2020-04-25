import { Field, InputType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum UserOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  firstName = 'firstName',
  lastName = 'lastName',
  email = 'email',
}

registerEnumType(UserOrderField, {
  name: 'UserOrderField',
  description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class UserOrder extends Order {
  @Field((type) => UserOrderField)
  field: UserOrderField;
}
