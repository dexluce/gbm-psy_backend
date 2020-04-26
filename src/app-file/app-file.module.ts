import { Module } from '@nestjs/common';
import { AppFileService } from './app-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppFile } from './app-file.model';
import { AppFileResolver } from './app-file.resolver';

@Module({
  providers: [AppFileService, AppFileResolver],
  imports: [
    TypeOrmModule.forFeature([AppFile]),
  ],
  exports: [
    AppFileService,
  ],
})
export class AppFileModule {}
