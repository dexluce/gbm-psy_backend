import { Injectable } from '@nestjs/common';
import { Evenement } from './evenement.model';
import { EvenementOrder } from './evenement.order';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PaginationArgs } from 'src/common/pagination/pagination-args';

@Injectable()
export class EvenementService {
  constructor(
    @InjectRepository(Evenement)
    private readonly evenementsRepository: Repository<Evenement>,
  ) {}
  async getEvenements({pageNumber,pageSize}: PaginationArgs, filter: string, orderBy: EvenementOrder) {
    const [evenements, total] = await this.evenementsRepository.findAndCount({
      where: filter ? [
        { title: Like('%' + filter + '%') },
      ] : [],
      order: orderBy ? {
        [orderBy.field]: orderBy.direction,
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
