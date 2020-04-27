import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMeetingInput {
  @Field((type) => String)
  evenementId: string;

  @Field((type) => Date)
  date: Date;
  
  @Field((type) => String, { defaultValue: '' })
  physicalAddress: string;
}
