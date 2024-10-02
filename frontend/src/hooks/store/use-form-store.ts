import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface StoreFormData {
  usia: string;
  beratBadan: string;
  tinggiBadan: string;
}

interface FormState {
  babyId: string | null;
  formData: StoreFormData;
  setBabyId: (id: string) => void;
  setUsia: (usia: string) => void;
  setBeratBadan: (beratBadan: string) => void;
  setTinggiBadan: (tinggiBadan: string) => void;
}

const useFormStore = create<FormState>()(
  devtools(
    (set) => ({
      babyId: null,
      formData: {
        usia: "",
        beratBadan: "",
        tinggiBadan: "",
      },
      setBabyId: (id) => set(() => ({ babyId: id })),
      setUsia: (usia) =>
        set((state) => ({ formData: { ...state.formData, usia } })),
      setBeratBadan: (beratBadan) =>
        set((state) => ({ formData: { ...state.formData, beratBadan } })),
      setTinggiBadan: (tinggiBadan) =>
        set((state) => ({ formData: { ...state.formData, tinggiBadan } })),
    }),
    { name: "form-store" }
  ) 
);

export default useFormStore;
