import { Injectable, NotFoundException } from '@nestjs/common';
import { FuzzyRuleDto, FuzzySetDto } from './dto/create-rule-base.dto';

import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class RuleBaseService {
  constructor(private readonly prisma: PrismaService) {}

  async createUpdateFuzzySet(fuzzySet: FuzzySetDto) {
    const fuzzySetI = await this.prisma.fuzzySet.upsert({
      where: {
        name_fuzzyVariableId: {
          name: fuzzySet.name,
          fuzzyVariableId: fuzzySet.fuzzyVariableId,
        },
      },
      create: {
        name: fuzzySet.name,
        lowerBound: fuzzySet.lowerBound || 0,
        upperBound: fuzzySet.upperBound || 0,
        fuzzyVariableId: fuzzySet.fuzzyVariableId,
      },
      update: {
        lowerBound: fuzzySet.lowerBound || 0,
        upperBound: fuzzySet.upperBound || 0,
      },
    });

    return fuzzySetI;
  }

  async createFuzzyRule(fuzzyRule: FuzzyRuleDto) {
    const {
      usiaVariable,
      usiaFuzzySet,
      beratVariable,
      beratFuzzySet,
      tinggiVariable,
      tinggiFuzzySet,
      output,
    } = fuzzyRule;

    const usiaVar = await this.findOrCreateVariable(usiaVariable);
    const usiaSet = await this.prisma.fuzzySet.findUnique({
      where: {
        name_fuzzyVariableId: {
          name: usiaFuzzySet,
          fuzzyVariableId: usiaVar.id,
        },
      },
    });

    const beratVar = await this.findOrCreateVariable(beratVariable);
    const beratSet = await this.prisma.fuzzySet.findUnique({
      where: {
        name_fuzzyVariableId: {
          name: beratFuzzySet,
          fuzzyVariableId: beratVar.id,
        },
      },
    });

    const tinggiVar = await this.findOrCreateVariable(tinggiVariable);
    const tinggiSet = await this.prisma.fuzzySet.findUnique({
      where: {
        name_fuzzyVariableId: {
          name: tinggiFuzzySet,
          fuzzyVariableId: tinggiVar.id,
        },
      },
    });

    if (!usiaSet || !beratSet || !tinggiSet) {
      throw new NotFoundException('Fuzzy Set tidak ditemukan');
    }

    const newFuzzyRule = await this.prisma.fuzzyRule.create({
      data: {
        usiaVariableId: usiaVar.id,
        usiaFuzzySetId: usiaSet.id,
        beratVariableId: beratVar.id,
        beratFuzzySetId: beratSet.id,
        tinggiVariableId: tinggiVar.id,
        tinggiFuzzySetId: tinggiSet.id,
        output,
      },
    });

    return newFuzzyRule;
  }

  private async findOrCreateVariable(name: string) {
    return await this.prisma.fuzzyVariable.upsert({
      where: {
        name,
      },
      create: {
        name,
      },
      update: {},
    });
  }

  async updateFuzzyRule(id: number, fuzzyRule: FuzzyRuleDto) {
    const {
      usiaVariable,
      usiaFuzzySet,
      beratVariable,
      beratFuzzySet,
      tinggiVariable,
      tinggiFuzzySet,
      output,
    } = fuzzyRule;

    // Cari atau buat variabel fuzzy untuk usia, berat, dan tinggi
    const usiaVar = await this.findOrCreateVariable(usiaVariable);
    const usiaSet = await this.prisma.fuzzySet.findUnique({
      where: {
        name_fuzzyVariableId: {
          name: usiaFuzzySet,
          fuzzyVariableId: usiaVar.id,
        },
      },
    });

    const beratVar = await this.findOrCreateVariable(beratVariable);
    const beratSet = await this.prisma.fuzzySet.findUnique({
      where: {
        name_fuzzyVariableId: {
          name: beratFuzzySet,
          fuzzyVariableId: beratVar.id,
        },
      },
    });

    const tinggiVar = await this.findOrCreateVariable(tinggiVariable);
    const tinggiSet = await this.prisma.fuzzySet.findUnique({
      where: {
        name_fuzzyVariableId: {
          name: tinggiFuzzySet,
          fuzzyVariableId: tinggiVar.id,
        },
      },
    });

    // Jika tidak menemukan Fuzzy Set, lempar exception
    if (!usiaSet || !beratSet || !tinggiSet) {
      throw new NotFoundException('Fuzzy Set tidak ditemukan');
    }

    // Perbarui fuzzy rule berdasarkan ID
    const updatedFuzzyRule = await this.prisma.fuzzyRule.update({
      where: { id },
      data: {
        usiaVariableId: usiaVar.id,
        usiaFuzzySetId: usiaSet.id,
        beratVariableId: beratVar.id,
        beratFuzzySetId: beratSet.id,
        tinggiVariableId: tinggiVar.id,
        tinggiFuzzySetId: tinggiSet.id,
        output,
      },
    });

    return updatedFuzzyRule;
  }

  async findAllRules() {
    return await this.prisma.fuzzyRule.findMany({
      select: {
        id: true,
        usiaFuzzySet: {
          select: {
            name: true,
          },
        },
        beratFuzzySet: {
          select: {
            name: true,
          },
        },
        tinggiFuzzySet: {
          select: {
            name: true,
          },
        },
        output: true,
      },
    });
  }

  async findAllFuzzySet() {
    return await this.prisma.fuzzySet.findMany({
      select: {
        id: true,
        name: true,
        lowerBound: true,
        upperBound: true,
        fuzzyVariable: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async deleteFuzzyRule(id: number) {
    return await this.prisma.fuzzyRule.delete({
      where: { id },
    });
  }

  async deleteFuzzySet(id: number) {
    const deleteFuzzy = await this.prisma.fuzzySet.delete({
      where: { id },
    });
    console.log('delete fuzzy set:', deleteFuzzy);
    return deleteFuzzy;
  }
}
