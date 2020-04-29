import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEvenementInput {
  @Field()
  title: string;
  
  @Field({ defaultValue: '' })
  description: string;

  @Field({ defaultValue: false })
  isActive: boolean;

  @Field({ defaultValue: false })
  isPublic: boolean;
}
