import { z } from "zod";

type Balita = {
  name: string;
};
export type BabyForm = {
  id: string;
  name: string;
  birth: string;
  gender: string;
  birthWeight: number;
  birthHeight: number;
  currentAge: number;
  fuzzyScore?: number;
  outputFuzzy?: string;
  balita: Balita;
};

export const babySchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  birth: z.string().min(1, { message: "Harus diisi" }),
  birthWeight: z.number({ required_error: "Harus diisi" }),
  birthHeight: z.number({ required_error: "Harus diisi" }),
  gender: z.string().min(1, { message: "Harus diisi" }),
});
