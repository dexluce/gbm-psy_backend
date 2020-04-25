import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';

@ObjectType()
export class Auth {
  @Field({ description: 'JWT Bearer token' })
  token: string;

  @Field((type) => User)
  user: User;
}
