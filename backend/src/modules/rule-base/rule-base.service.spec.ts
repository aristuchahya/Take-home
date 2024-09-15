import { Test, TestingModule } from '@nestjs/testing';
import { RuleBaseService } from './rule-base.service';

describe('RuleBaseService', () => {
  let service: RuleBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleBaseService],
    }).compile();

    service = module.get<RuleBaseService>(RuleBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
