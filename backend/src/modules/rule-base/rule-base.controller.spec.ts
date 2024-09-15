import { Test, TestingModule } from '@nestjs/testing';
import { RuleBaseController } from './rule-base.controller';
import { RuleBaseService } from './rule-base.service';

describe('RuleBaseController', () => {
  let controller: RuleBaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuleBaseController],
      providers: [RuleBaseService],
    }).compile();

    controller = module.get<RuleBaseController>(RuleBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
