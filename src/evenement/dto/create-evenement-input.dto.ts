import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEvenementInput {
  @Field()
  title: string;
  
  @Field({ defaultValue: '' })
  description: string;

  @Field({ defaultValue: false })
  isValid: boolean;
}
