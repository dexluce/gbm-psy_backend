import { Module } from '@nestjs/common';
import { AppFileResolver } from './app-file.resolver';
import { AppFileService } from './app-file.service';

@Module({
  providers: [AppFileResolver, AppFileService]
})
export class AppFileModule {}
