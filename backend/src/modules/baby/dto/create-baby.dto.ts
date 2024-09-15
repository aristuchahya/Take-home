import { Gender } from '@prisma/client';

export class CreateBabyDto {
  name: string;
  age: number;
  gender: Gender;
}
