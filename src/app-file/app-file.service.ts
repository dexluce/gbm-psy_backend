import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppFile } from './app-file.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileInput } from './dto/create-file.dto';
import { Client } from 'minio';
import { EvenementService } from 'src/evenement/evenement.service';

@Injectable()
export class AppFileService {
  private minioClient: Client;

  constructor(
    @InjectRepository(AppFile)
    private readonly appFileRepository: Repository<AppFile>,
    private readonly evenementService: EvenementService,
  ) {
    this.minioClient = new Client({
      endPoint: process.env.APP_MINIO_ADDRESS,
      port: 9000,
      useSSL: false,
      accessKey: process.env.APP_MINIO_ACCESS_KEY,
      secretKey: process.env.APP_MINIO_SECRET_KEY
    })
  }

  async createFileForEvenement(createFileInput: CreateFileInput) {
    const evenement = await this.evenementService.getById(createFileInput.evenementId);
    const savedFile = await this.minioClient.putObject(
      evenement.fileBucketName,
      createFileInput.name,
      createFileInput.file,
    )
    let appFile = new AppFile();
    appFile.name = createFileInput.name;
    appFile.description = createFileInput.description;
    appFile.isPublic = createFileInput.isPublic;
    appFile.evenement = evenement;
    this.appFileRepository.save(appFile);
  }
}
