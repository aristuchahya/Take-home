import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuzzyDetectionDto } from './dto/create-fuzzy-detection.dto';

import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class FuzzyDetectionService {
  constructor(private readonly prisma: PrismaService) {}

  async detectFuzzyResult(
    fuzzyDetect: CreateFuzzyDetectionDto,
    babyId: number,
  ) {
    const { usia, beratBadan, tinggiBadan } = fuzzyDetect;

    const fuzzyRules = await this.prisma.fuzzyRule.findMany({
      include: {
        usiaFuzzySet: true,
        beratFuzzySet: true,
        tinggiFuzzySet: true,
      },
    });

    let result = 'NORMAL';
    let maxMembership = 0;
    let totalWeight = 0;
    let totalWeightedOutput = 0;

    for (const rule of fuzzyRules) {
      const usiaMatch =
        rule.usiaFuzzySet.name.toLowerCase() === usia.toLowerCase();
      const beratMatch =
        rule.beratFuzzySet.name.toLowerCase() === beratBadan.toLowerCase();
      const tinggiMatch =
        rule.tinggiFuzzySet.name.toLowerCase() === tinggiBadan.toLowerCase();

      if (usiaMatch && beratMatch && tinggiMatch) {
        const ruleStrength = 1;

        const outputValue = rule.output === 'STUNTING' ? 0 : 1;

        totalWeight += ruleStrength;
        console.log('totalWeight:', totalWeight);

        totalWeightedOutput += ruleStrength * outputValue;
        console.log('totalWeightedOutput:', totalWeightedOutput);

        if (ruleStrength > maxMembership) {
          maxMembership = ruleStrength;
          result = rule.output;
        }
      }
    }

    const score = totalWeight === 0 ? 0 : totalWeightedOutput / totalWeight;

    const updatedBaby = await this.prisma.baby.update({
      where: {
        id: babyId,
      },
      data: {
        score,
        result,
      },
    });

    if (!updatedBaby) throw new NotFoundException('Baby not found');

    return { result, score };
  }
}
