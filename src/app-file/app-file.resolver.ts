import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AppFile } from './app-file.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { AppFileService } from './app-file.service';
import { EvenementService } from 'src/evenement/evenement.service';
import { CreateFileInput } from './dto/create-file.dto';

@Resolver((of) => AppFile)
@UseGuards(GqlAuthGuard)
export class AppFileResolver {
  constructor(
    private appFileService: AppFileService,
  ) {}

  @Mutation(() => AppFile)
  async addFileToEvenement(@Args('data') createUserData: CreateFileInput) {
    this.appFileService.createFileForEvenement(createUserData);
  }
}
