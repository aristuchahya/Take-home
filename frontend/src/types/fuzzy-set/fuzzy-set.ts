import { z } from "zod";

export type FuzzySet = {
  name: string;
  lowerBound: number;
  upperBound: number;
  fuzzyVariableId: number;
};

export const fuzzySetSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  lowerBound: z.number({
    invalid_type_error: "Batas bawah harus berupa angka",
    required_error: "Batas bawah harus diisi",
  }),
  upperBound: z.number({
    invalid_type_error: "Batas atas harus berupa angka",
    required_error: "Batas atas harus diisi",
  }),
  fuzzyVariableId: z.number({
    invalid_type_error: "Variabel harus berupa angka",
    required_error: "Nama variabel harus dipilih",
  }),
});
