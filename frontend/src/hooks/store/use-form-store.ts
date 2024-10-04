import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface StoreFormData {
  date: string;
  birthWeight: number;
  birthHeight: number;
  zsTbu: number;
  zsBBu: number;
}

interface FormState {
  babyId: string | null;
  formData: StoreFormData;
  setBabyId: (id: string) => void;
  setDate: (date: string) => void;
  setBirthWeight: (birthWeight: number) => void;
  setBirthHeight: (birthHeight: number) => void;
  setZsTbu: (zsTbu: number) => void;
  setZsBBu: (zsBBu: number) => void;
}

const useFormStore = create<FormState>()(
  devtools(
    (set) => ({
      babyId: null,
      formData: {
        date: "",
        birthWeight: 0,
        birthHeight: 0,
        zsTbu: 0,
        zsBBu: 0,
      },
      setBabyId: (id) => set(() => ({ babyId: id })),
      setDate: (date) =>
        set((state) => ({ formData: { ...state.formData, date } })),
      setBirthWeight: (birthWeight) =>
        set((state) => ({
          formData: { ...state.formData, birthWeight },
        })),
      setBirthHeight: (birthHeight) =>
        set((state) => ({
          formData: { ...state.formData, birthHeight },
        })),
      setZsTbu: (zsTbu) =>
        set((state) => ({ formData: { ...state.formData, zsTbu } })),
      setZsBBu: (zsBBu) =>
        set((state) => ({ formData: { ...state.formData, zsBBu } })),
    }),
    { name: "form-store" }
  )
);

export default useFormStore;
