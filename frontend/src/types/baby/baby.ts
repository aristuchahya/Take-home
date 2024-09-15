import { z } from "zod";

export type BabyForm = {
  name: string;
  age: number;
  gender: string;
  score?: number;
  result?: string;
};

export const babySchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  age: z.number({
    invalid_type_error: "Umur berupa angka",
    required_error: "Umur harus diisi",
  }),
  gender: z.string().min(1, { message: "Harus diisi" }),
});
