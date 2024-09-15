// export enum Result {
//   STUNTING = 'STUNTING',
//   NORMAL = 'NORMAL',
// }

import { OutputType } from '@prisma/client';

export class FuzzySetDto {
  name: string;
  lowerBound?: number;
  upperBound?: number;
  fuzzyVariableId: number;
}

export class FuzzyRuleDto {
  usiaVariable: string;
  usiaFuzzySet: string;
  beratVariable: string;
  beratFuzzySet: string;
  tinggiVariable: string;
  tinggiFuzzySet: string;
  output: OutputType;
}
