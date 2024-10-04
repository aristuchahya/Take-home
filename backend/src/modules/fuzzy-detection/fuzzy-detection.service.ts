import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/services/prisma.service';
import { CreateFuzzyDetectionDto } from './dto/create-fuzzy-detection.dto';
import { FuzzyRule, OutputType } from '@prisma/client';

@Injectable()
export class FuzzyDetectionService {
  constructor(private readonly prisma: PrismaService) {}

  async detectStunting(fuzzyDetection: CreateFuzzyDetectionDto) {
    const { balitaId, date, birthHeight, birthWeight, zsBBu, zsTbu } =
      fuzzyDetection;
    console.log('Input:', { birthWeight, birthHeight, zsTbu, zsBBu });

    const fuzzyRules = await this.prisma.fuzzyRule.findMany();
    console.log('Fuzzy Rules:', fuzzyRules);

    const membershipValues = this.fuzzifyInput(
      birthWeight,
      birthHeight,
      zsTbu,
      zsBBu,
      fuzzyRules,
    );

    const { output, score } = this.applyFuzzyTsukamoto(membershipValues);

    const currentAge = await this.calculateAgeInMonths(balitaId);

    const measurement = await this.prisma.measurement.create({
      data: {
        balitaId,
        date,
        currentWeight: birthWeight,
        currentHeight: birthHeight,
        currentAge,
        outputFuzzy: output,
        fuzzyScore: score,
      },
    });

    return measurement;
  }

  private fuzzifyInput(
    birthWeight: number,
    birthHeight: number,
    zsTbU: number,
    zsBBU: number,
    rules: FuzzyRule[],
  ) {
    const membershipValues = [];

    for (const rule of rules) {
      // Fuzzification for birth weight
      const weightMembership = this.calculateMembership(
        birthWeight,
        rule.weightMin,
        rule.weightMax,
      );

      // Fuzzification for birth height
      const heightMembership = this.calculateMembership(
        birthHeight,
        rule.heightMin,
        rule.heightMax,
      );

      // Store membership values regardless of whether they are zero
      membershipValues.push({
        weightMembership,
        heightMembership,
        zsTbUMembership: this.calculateMembership(zsTbU, -3, 3),
        zsBbUMembership: this.calculateMembership(zsBBU, -3, 3),
        output: rule.output,
      });

      // Log values for debugging
      console.log(
        `Rule: ${rule.output}, Weight Membership: ${weightMembership}, Height Membership: ${heightMembership}`,
      );
    }

    return membershipValues;
  }

  private calculateMembership(input: number, min: number, max: number): number {
    if (input <= min) return 0;
    if (input >= max) return 1;
    return (input - min) / (max - min); // Linear interpolation
  }

  private applyFuzzyTsukamoto(membershipValues: any[]) {
    let numerator = 0;
    let denominator = 0;

    for (const membership of membershipValues) {
      // Calculate the truth degree using minimum of weight, height, Z-scores memberships
      const truthDegree = Math.min(
        membership.weightMembership,
        membership.heightMembership,
        membership.zsTbUMembership,
        membership.zsBbUMembership,
      );

      // Defuzzification step: weighted average based on output type
      const outputScore = this.getOutputScore(membership.output);

      // Weighted average formula
      numerator += truthDegree * outputScore;
      denominator += truthDegree;

      console.log('Truth Degree:', truthDegree);
    }

    // If denominator is zero, no valid rules matched, return default output
    if (denominator === 0) {
      return { output: OutputType.NORMAL, score: 1 }; // Default to NORMAL
    }

    const score = numerator / denominator;
    console.log('Numerator:', numerator);
    console.log('Denominator:', denominator);
    console.log('Score:', score);

    // Return the final output based on the defuzzified score
    const output = score >= 0.5 ? OutputType.NORMAL : OutputType.STUNTING;
    return { output, score };
    console.log('Final Output:', output);
  }

  private getOutputScore(output: OutputType): number {
    if (output === OutputType.STUNTING) return 0; // 0 represents Stunting
    if (output === OutputType.NORMAL) return 1; // 1 represents Normal
  }

  private async calculateAgeInMonths(balitaId: string): Promise<number> {
    const balita = await this.prisma.balita.findUnique({
      where: { id: balitaId },
      select: { birth: true },
    });

    const birthDate = new Date(balita.birth);
    const currentDate = new Date();

    const yearsDifference = currentDate.getFullYear() - birthDate.getFullYear();
    const monthsDifference = currentDate.getMonth() - birthDate.getMonth();
    const ageInMonths = yearsDifference * 12 + monthsDifference;

    // Jika hari lahir lebih besar dari hari saat ini, kurangi 1 bulan
    if (currentDate.getDate() < birthDate.getDate()) {
      return ageInMonths - 1;
    }

    return ageInMonths;
  }

  // async calculateFuzzy(FuzzyDetectionDto: CreateFuzzyDetectionDto) {
  //   const { balitaId, date, currentWeight, currentHeight, currentAge } =
  //     FuzzyDetectionDto;

  //   const fuzzyRules = await this.prisma.fuzzyRule.findMany({
  //     where: {
  //       ageRange: this.getAgeRange(currentAge),
  //     },
  //   });

  //   const { output, score } = this.applyFuzzyLogic(
  //     fuzzyRules,
  //     currentWeight,
  //     currentHeight,
  //   );

  //   const measurement = await this.prisma.measurement.create({
  //     data: {
  //       balitaId,
  //       date,
  //       currentWeight,
  //       currentHeight,
  //       currentAge,
  //       outputFuzzy: output, // Simpan hasil fuzzy
  //       fuzzyScore: score, // Simpan score
  //     },
  //   });

  //   return measurement;
  // }

  // getAgeRange(ageInMonths: number): string {
  //   if (ageInMonths <= 24) return '0-24';
  //   if (ageInMonths <= 36) return '24-36';
  //   return '37+';
  // }

  // applyFuzzyLogic(fuzzyRules, weight: number, height: number) {
  //   let numerator = 0;
  //   let denominator = 0;

  //   for (const rule of fuzzyRules) {
  //     console.log(`Evaluating Rule: ${JSON.stringify(rule)}`);
  //     console.log(`Weight: ${weight}, Height: ${height}`);

  //     const weightDegree = this.getMembershipDegree(
  //       weight,
  //       rule.weightMin,
  //       rule.weightMax,
  //     );
  //     const heightDegree = this.getMembershipDegree(
  //       height,
  //       rule.heightMin,
  //       rule.heightMax,
  //     );

  //     console.log(
  //       `Weight Degree: ${weightDegree}, Height Degree: ${heightDegree}`,
  //     );

  //     if (rule.output === 'STUNTING') {
  //       console.log(
  //         `Weight Degree for Stunting: ${weightDegree}, Height Degree: ${heightDegree}`,
  //       );
  //     } else {
  //       console.log(
  //         `Weight Degree for Normal: ${weightDegree}, Height Degree: ${heightDegree}`,
  //       );
  //     }

  //     const degree = Math.min(weightDegree, heightDegree);

  //     if (degree > 0.1) {
  //       const crispOutput = rule.output === 'STUNTING' ? 0 : 1;
  //       numerator += degree * crispOutput;
  //       denominator += degree;

  //       console.log(
  //         `Degree: ${degree}, Crisp Output: ${crispOutput}, Numerator: ${numerator}, Denominator: ${denominator}`,
  //       );
  //     }
  //   }

  //   const score = denominator === 0 ? 0 : numerator / denominator;
  //   console.log(
  //     `Numerator: ${numerator}, Denominator: ${denominator}, Score: ${score}`,
  //   );

  //   const output = score > 0.5 ? OutputType.NORMAL : OutputType.STUNTING;

  //   return { output, score };
  // }

  // // Fungsi untuk menghitung derajat keanggotaan (membership degree)
  // getMembershipDegree(value: number, min: number, max: number): number {
  //   if (value < min) return 0; // Completely outside the range
  //   if (value > max) return 0; // Completely inside the range
  //   const range = max - min;
  //   return (value - min) / range;
  // }

  async findAll() {
    const measurement = await this.prisma.measurement.findMany({
      include: {
        balita: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return measurement;
  }

  async findOne(balitaId: string) {
    return await this.prisma.measurement.findFirst({
      where: {
        balitaId,
      },
      select: {
        balita: {
          select: {
            name: true,
          },
        },
        fuzzyScore: true,
        outputFuzzy: true,
        date: true,
        currentAge: true,
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
