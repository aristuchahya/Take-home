import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BabyService } from './baby.service';
import { CreateBabyDto } from './dto/create-baby.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('baby')
export class BabyController {
  constructor(private readonly babyService: BabyService) {}

  @Public()
  @Post()
  create(@Body() createBabyDto: CreateBabyDto) {
    return this.babyService.createBaby(createBabyDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.babyService.findAll();
  }

  @Public()
  @Get(':babyId')
  findOne(@Param('babyId') babyId: string) {
    return this.babyService.findOne(+babyId);
  }
}
