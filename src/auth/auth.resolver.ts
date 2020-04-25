import { LoginInput } from './dto/login.input';
import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { SignupInput } from './dto/signup.input';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    const token = await this.authService.login(email.toLowerCase(), password);
    return {
      token,
    };
  }

  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    return await this.authService.getUserFromToken(auth.token);
  }
}
