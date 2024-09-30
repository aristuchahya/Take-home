import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/services/prisma.service';
import { CreateFuzzyDetectionDto } from './dto/create-fuzzy-detection.dto';
import { OutputType } from '@prisma/client';

@Injectable()
export class FuzzyDetectionService {
  constructor(private readonly prisma: PrismaService) {}
  async calculateFuzzy(FuzzyDetectionDto: CreateFuzzyDetectionDto) {
    const { balitaId, date, currentWeight, currentHeight, currentAge } =
      FuzzyDetectionDto;

    const fuzzyRules = await this.prisma.fuzzyRule.findMany({
      where: {
        ageRange: this.getAgeRange(currentAge),
      },
    });

    const { output, score } = this.applyFuzzyLogic(
      fuzzyRules,
      currentWeight,
      currentHeight,
    );

    const measurement = await this.prisma.measurement.create({
      data: {
        balitaId,
        date,
        currentWeight,
        currentHeight,
        currentAge,
        outputFuzzy: output, // Simpan hasil fuzzy
        fuzzyScore: score, // Simpan score
      },
    });

    return measurement;
  }

  getAgeRange(ageInMonths: number): string {
    if (ageInMonths <= 24) return '0-24';
    if (ageInMonths <= 36) return '24-36';
    return '37+';
  }

  applyFuzzyLogic(fuzzyRules, weight: number, height: number) {
    let numerator = 0;
    let denominator = 0;

    for (const rule of fuzzyRules) {
      console.log(`Evaluating Rule: ${JSON.stringify(rule)}`);
      console.log(`Weight: ${weight}, Height: ${height}`);

      const weightDegree = this.getMembershipDegree(
        weight,
        rule.weightMin,
        rule.weightMax,
      );
      const heightDegree = this.getMembershipDegree(
        height,
        rule.heightMin,
        rule.heightMax,
      );

      console.log(
        `Weight Degree: ${weightDegree}, Height Degree: ${heightDegree}`,
      );

      if (rule.output === 'STUNTING') {
        console.log(
          `Weight Degree for Stunting: ${weightDegree}, Height Degree: ${heightDegree}`,
        );
      } else {
        console.log(
          `Weight Degree for Normal: ${weightDegree}, Height Degree: ${heightDegree}`,
        );
      }

      const degree = Math.min(weightDegree, heightDegree);

      if (degree > 0.1) {
        const crispOutput = rule.output === 'STUNTING' ? 0 : 1;
        numerator += degree * crispOutput;
        denominator += degree;

        console.log(
          `Degree: ${degree}, Crisp Output: ${crispOutput}, Numerator: ${numerator}, Denominator: ${denominator}`,
        );
      }
    }

    const score = denominator === 0 ? 0 : numerator / denominator;
    console.log(
      `Numerator: ${numerator}, Denominator: ${denominator}, Score: ${score}`,
    );

    const output = score > 0.5 ? OutputType.NORMAL : OutputType.STUNTING;

    return { output, score };
  }

  // Fungsi untuk menghitung derajat keanggotaan (membership degree)
  getMembershipDegree(value: number, min: number, max: number): number {
    if (value < min) return 0; // Completely outside the range
    if (value > max) return 0; // Completely inside the range
    const range = max - min;
    return (value - min) / range;
  }

  findAll() {
    return `This action returns all fuzzyDetection`;
  }

  async findOne(balitaId: string) {
    return await this.prisma.measurement.findMany({
      where: {
        balitaId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} fuzzyDetection`;
  }
}
