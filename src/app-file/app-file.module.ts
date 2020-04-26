import { Module } from '@nestjs/common';
import { AppFileService } from './app-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppFile } from './app-file.model';
import { AppFileResolver } from './app-file.resolver';
import { EvenementModule } from 'src/evenement/evenement.module';

@Module({
  providers: [AppFileService, AppFileResolver],
  imports: [
    TypeOrmModule.forFeature([AppFile]),
    EvenementModule,
  ],
})
export class AppFileModule {}
