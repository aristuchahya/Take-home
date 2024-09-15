import { z } from "zod";
export type FuzzyRule = {
  id: string;
  usiaVariable: string;
  usiaFuzzySet: string;
  beratVariable: string;
  beratFuzzySet: string;
  tinggiVariable: string;
  tinggiFuzzySet: string;
  output: string;
};

export const fuzzyRuleSchema = z.object({
  usiaVariable: z
    .string()
    .min(1, { message: "Variabel usia tidak boleh kosong" }),
  usiaFuzzySet: z
    .string()
    .min(1, { message: "Fuzzy Set usia tidak boleh kosong" }),
  beratVariable: z
    .string()
    .min(1, { message: "Variabel berat badan tidak boleh kosong" }),
  beratFuzzySet: z
    .string()
    .min(1, { message: "Fuzzy Set berat badan tidak boleh kosong" }),
  tinggiVariable: z
    .string()
    .min(1, { message: "Variabel tinggi badan tidak boleh kosong" }),
  tinggiFuzzySet: z
    .string()
    .min(1, { message: "Fuzzy Set tinggi badan tidak boleh kosong" }),
  output: z.string().min(1, { message: "Output tidak boleh kosong" }),
});
