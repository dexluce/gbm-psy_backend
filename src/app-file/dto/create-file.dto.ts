import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;
  
  @Field({ defaultValue: '' })
  description: string;

  @Field({ defaultValue: false })
  isPublic: boolean;
}
