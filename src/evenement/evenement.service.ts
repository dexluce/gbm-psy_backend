import { Injectable } from '@nestjs/common';
import { Evenement } from './evenement.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PaginationArgs } from 'src/common/pagination';
import { CreateEvenementInput } from './dto/create-evenement-input.dto';
import { Client } from 'minio';

@Injectable()
export class EvenementService {
  private minioClient: Client;

  constructor(
    @InjectRepository(Evenement)
    private readonly evenementsRepository: Repository<Evenement>,
  ) {
    this.minioClient = new Client({
      endPoint: process.env.APP_MINIO_ADDRESS,
      port: 9000,
      useSSL: false,
      accessKey: process.env.APP_MINIO_ACCESS_KEY,
      secretKey: process.env.APP_MINIO_SECRET_KEY
    })
  }

  async getById(id: string) {
    return await this.evenementsRepository.findOne(id);
  }

  async getEvenements({ filter, orderBy, orderDirection, pageSize, pageNumber }: PaginationArgs) {
    const [evenements, total] = await this.evenementsRepository.findAndCount({
      where: filter ? [
        { title: Like('%' + filter + '%') },
      ] : [],
      order: orderBy ? {
        [orderBy]: orderDirection,
      } : {},
      take: pageSize,
      skip: pageNumber * pageSize,
    });

    return {
      items: evenements,
      total: total
    }
  }

  async createEvenement(createEvenementInput: CreateEvenementInput) {
    const randomValueForBucketName = Math.random().toString(36).substring(7);
    const bucketName = (createEvenementInput.title + randomValueForBucketName).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[/\u0020]/g, '').toLowerCase();
    await new Promise((resolve, reject) => {
      this.minioClient.makeBucket(bucketName, 'ch', async (err) => {
        if (err) reject(err);
        resolve();
    })});
    return this.evenementsRepository.save({...createEvenementInput, fileBucketName: bucketName});
  }
}
