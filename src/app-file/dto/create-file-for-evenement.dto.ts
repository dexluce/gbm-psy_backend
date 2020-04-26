import { InputType, Field } from '@nestjs/graphql';
import { Evenement } from 'src/evenement/evenement.model';

@InputType()
export class CreateFileForEvenementDto {
  @Field((type) => Evenement)
  evenement: Evenement

  @Field()
  name: string;
  
  @Field({ defaultValue: '' })
  description: string;

  @Field({ defaultValue: false })
  isPublic: boolean;
}
