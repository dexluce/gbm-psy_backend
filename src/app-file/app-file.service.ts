import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppFile } from './app-file.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'minio';
import { CreateFileForEvenementDto } from './dto/create-file-for-evenement.dto';

@Injectable()
export class AppFileService {
  minioClient: Client
  constructor(
    @InjectRepository(AppFile)
    private readonly appFileRepository: Repository<AppFile>,
  ) {
    this.minioClient = new Client({
      endPoint: process.env.APP_MINIO_ADDRESS,
      port: 9000,
      useSSL: false,
      accessKey: process.env.APP_MINIO_ACCESS_KEY,
      secretKey: process.env.APP_MINIO_SECRET_KEY
    })
  }

  async createFileForEvenement({
      evenement,
      name,
      description,
      isPublic
    }: CreateFileForEvenementDto) {
    let appFile = new AppFile();
    appFile.name = name;
    appFile.description = description;
    appFile.isPublic = isPublic;
    appFile.evenement = evenement;
    return this.appFileRepository.save(appFile);
  }
}
