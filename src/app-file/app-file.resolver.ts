import { Resolver, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { AppFile } from './app-file.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { AppFileService } from './app-file.service';

@Resolver((of) => AppFile)
@UseGuards(GqlAuthGuard)
export class AppFileResolver {
  constructor(
    private appFileService: AppFileService,
  ) {}

  @ResolveField('src')
  async src(@Parent() appFile: AppFile) {
    return this.appFileService.resolveSrc(appFile);
  }
}
