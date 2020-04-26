import { Injectable } from '@nestjs/common';
import { Evenement } from './evenement.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PaginationArgs } from 'src/common/pagination';

@Injectable()
export class EvenementService {
  constructor(
    @InjectRepository(Evenement)
    private readonly evenementsRepository: Repository<Evenement>,
  ) {}
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
}
