import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { GraphQLScalarType } from 'graphql';
import { Stream } from 'stream';

@InputType()
export class CreateFileInput {
  @Field()
  evenementId: string;

  @Field()
  name: string;
  
  @Field({ defaultValue: '' })
  description: string;

  @Field({ defaultValue: false })
  isPublic: boolean;

  @Field((type) => GraphQLUpload)
  file: Stream;
}
