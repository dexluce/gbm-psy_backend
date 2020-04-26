import { Test, TestingModule } from '@nestjs/testing';
import { AppFileService } from './app-file.service';

describe('AppFileService', () => {
  let service: AppFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppFileService],
    }).compile();

    service = module.get<AppFileService>(AppFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
