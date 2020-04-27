import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMeetingInput {
  @Field()
  evenementId: string;

  @Field()
  date: string;
  
  @Field({ defaultValue: '' })
  physicalAddress: string;
}
