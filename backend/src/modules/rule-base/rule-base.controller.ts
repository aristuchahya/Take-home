import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Param,
  NotFoundException,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { RuleBaseService } from './rule-base.service';
import { FuzzyRuleDto, FuzzySetDto } from './dto/create-rule-base.dto';

import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from '../auth/dto/create-auth.dto';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('rule-base')
export class RuleBaseController {
  constructor(private readonly ruleBaseService: RuleBaseService) {}

  @Post('fuzzy-rule')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async createFuzzyRule(@Body() fuzzyRule: FuzzyRuleDto) {
    return this.ruleBaseService.createFuzzyRule(fuzzyRule);
  }

  @Patch('fuzzy-rule/:id')
  @Public()
  async updatedFuzzyRule(
    @Body() fuzzyRule: FuzzyRuleDto,
    @Param('id') id: string,
  ) {
    try {
      const updatedFuzzyRule = await this.ruleBaseService.updateFuzzyRule(
        +id,
        fuzzyRule,
      );
      return { message: 'Fuzzy Rule has been updated', data: updatedFuzzyRule };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Fuzzy Rule not found');
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Post('fuzzy-set')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async createFuzzySet(@Body() fuzzySet: FuzzySetDto) {
    return this.ruleBaseService.createUpdateFuzzySet(fuzzySet);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async findAll() {
    return this.ruleBaseService.findAllRules();
  }

  @Get('fuzzy-set')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async findAllFuzzySet() {
    return this.ruleBaseService.findAllFuzzySet();
  }

  @Delete('fuzzy-rule/:id')
  @Public()
  async deleteFuzzyRule(@Param('id') id: string) {
    try {
      await this.ruleBaseService.deleteFuzzyRule(+id);
      return { message: 'Fuzzy Rule has been deleted' };
    } catch (error) {
      throw new NotFoundException('Fuzzy Rule not found');
    }
  }

  @Delete('fuzzy-set/:id')
  @Public()
  async deleteFuzzySet(@Param('id') id: string) {
    try {
      await this.ruleBaseService.deleteFuzzySet(+id);
      return { message: 'Fuzzy Set has been deleted' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
