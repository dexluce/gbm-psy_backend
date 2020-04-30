import { Injectable } from '@nestjs/common';
import { Evenement } from './evenement.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Connection } from 'typeorm';
import { PaginationArgs } from 'src/common/pagination';
import { CreateEvenementInput } from './dto/create-evenement-input.dto';
import { AppFileService } from 'src/app-file/app-file.service';
import { Meeting } from 'src/meeting/meeting.model';

@Injectable()
export class EvenementService {
  constructor(
    @InjectRepository(Evenement)
    private readonly evenementsRepository: Repository<Evenement>,
    private connection: Connection,
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
  
  async getFiles(evenement: Evenement) {
    return (await this.evenementsRepository.findOne({
      where: {evenement},
      relations: ['files']
    })).files;
  }

  async getMeetings(evenement: Evenement) {
    return this.connection.createQueryBuilder(Meeting, 'meeting')
    .where("meeting.evenementId = :evenementId", { evenementId: evenement.id })
    .orderBy('meeting.date', 'ASC')
    .getMany();

    return (await this.evenementsRepository.findOne({
      where: {evenement},
      relations: ['meetings']
    })).meetings;
  }

  async getSubscriptionsToEvenement(evenement: Evenement) {
    return (await this.evenementsRepository.findOne({
      where: evenement,
      relations: ['subscriptionsToEvenement'],
    })).subscriptionsToEvenement;
  }
}
