import { Controller, Post, Body, Param } from '@nestjs/common';
import { FuzzyDetectionService } from './fuzzy-detection.service';
import { CreateFuzzyDetectionDto } from './dto/create-fuzzy-detection.dto';

import { Public } from 'src/common/decorator/public.decorator';

@Controller('fuzzy-detection')
export class FuzzyDetectionController {
  constructor(private readonly fuzzyDetectionService: FuzzyDetectionService) {}

  @Public()
  @Post(':babyId')
  createDetectFuzzy(
    @Body() createFuzzyDetectionDto: CreateFuzzyDetectionDto,
    @Param('babyId') babyId: string,
  ) {
    return this.fuzzyDetectionService.detectFuzzyResult(
      createFuzzyDetectionDto,
      +babyId,
    );
  }
}
