import { Injectable } from '@nestjs/common';
import { Evenement } from './evenement.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PaginationArgs } from 'src/common/pagination';
import { CreateEvenementInput } from './dto/create-evenement-input.dto';
import { AppFileService } from 'src/app-file/app-file.service';

@Injectable()
export class EvenementService {
  constructor(
    @InjectRepository(Evenement)
    private readonly evenementsRepository: Repository<Evenement>,
    private appFileService: AppFileService,
  ) { }

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
    const bucketName = await this.appFileService.createBucket(createEvenementInput.title);
    return this.evenementsRepository.save({...createEvenementInput, fileBucketName: bucketName});
  }
}
