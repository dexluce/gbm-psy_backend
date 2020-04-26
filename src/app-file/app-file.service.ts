import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppFile } from './app-file.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'minio';
import { CreateFileForEvenementDto } from './dto/create-file-for-evenement.dto';
import { Evenement } from 'src/evenement/evenement.model';
import { promises } from 'dns';
import { rejects } from 'assert';

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

  async findAll(evenement: Evenement) {
    return this.appFileRepository.find({ where: evenement });
  }

  async createFileForEvenement({
      evenement,
      name,
      description,
      isPublic,
      bucketName,
    }: CreateFileForEvenementDto) {
    let appFile = new AppFile();
    appFile.name = name;
    appFile.description = description;
    appFile.isPublic = isPublic;
    appFile.evenement = evenement;
    appFile.bucketName = bucketName;
    return this.appFileRepository.save(appFile);
  }

  async createBucket(baseName: string) {
    const randomValueForBucketName = Math.random().toString(36).substring(7);
    const bucketName = (baseName + randomValueForBucketName).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[/\u0020]/g, '').toLowerCase();

    return await new Promise<string>((resolve, reject) => {
      this.minioClient.makeBucket(bucketName, 'ch', async (err) => {
        if (err) reject(err);
        resolve(bucketName);
    })});
  }

  async resolveSrc({ bucketName, name }: AppFile) {
    return new Promise((resolve, reject) => {
      this.minioClient.presignedUrl('GET', bucketName, name, 24*60*60, (err, presignedUrl) => {
        if (err) reject(err);
        resolve(presignedUrl);
      })
    }) 
  }
}
