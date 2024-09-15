import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBabyDto } from './dto/create-baby.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class BabyService {
  constructor(private readonly prisma: PrismaService) {}
  async createBaby(createBabyDto: CreateBabyDto) {
    const baby = await this.prisma.baby.create({
      data: {
        ...createBabyDto,
      },
    });

    if (!baby) throw new BadRequestException('Create Baby Failed');

    return baby;
  }

  async findAll() {
    return await this.prisma.baby.findMany();
  }

  async findOne(babyId: number) {
    return await this.prisma.baby.findUnique({
      where: { id: babyId },
    });
  }
}
