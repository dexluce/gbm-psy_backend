import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Role, Sex } from '../user.model';

@InputType()
export class CreateUserInput {
  @Field((type) => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field((type) => String)
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field((type) => String)
  @IsNotEmpty()
  firstname: string;

  @Field((type) => String)
  @IsNotEmpty()
  lastname: string;

  @Field((type) => Sex)
  sex: Sex;

  @Field((type) => String)
  phone: string;
  
  @Field((type) => String)
  profession: string;

  @Field((type) => String)
  profession_place: string;
  
  @Field((type) => String)
  personnal_address: string;

  @Field((type) => String)
  chargeable_address?: string;

  @Field((type) => Boolean, { defaultValue: false })
  isActive: boolean;

  @Field((type) => Role, { defaultValue: Role.PARTICIPANT })
  role: Role;
}
