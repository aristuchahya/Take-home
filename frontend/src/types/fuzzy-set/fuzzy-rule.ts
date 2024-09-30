import { z } from "zod";
export type FuzzyRule = {
  id: string;
  ageRange: string;
  weightMin: number;
  weightMax: number;
  heightMin: number;
  heightMax: number;
  output: string;
};

export const fuzzyRuleSchema = z.object({
  ageRange: z.string().min(1, { message: "Range usia tidak boleh kosong" }),
  weightMin: z.number().positive({ message: "Must be a positive number" }),
  weightMax: z.number().positive({ message: "Must be a positive number" }),
  heightMin: z.number().positive({ message: "Must be a positive number" }),
  heightMax: z.number().positive({ message: "Must be a positive number" }),
  output: z.string().min(1, { message: "Output tidak boleh kosong" }),
});
