import { useNavigate } from "react-router-dom";
import useFormStore from "../store/use-form-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface BirthWeightForm {
  birthWeight: number;
}

const BirthWeightFormSchema = z.object({
  birthWeight: z.number().min(1, { message: "Harus diisi" }),
});

export const useBirthWeightForm = () => {
  const navigate = useNavigate();
  const { setBirthWeight, formData } = useFormStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BirthWeightForm>({
    mode: "onChange",
    resolver: zodResolver(BirthWeightFormSchema),
  });

  const onSubmit: SubmitHandler<BirthWeightForm> = async (data) => {
    console.log("Usia:", data.birthWeight);
    setBirthWeight(data.birthWeight);
    console.log("Current Form Data:", formData);
    navigate("/height");
  };

  return {
    setValue,
    handleSubmit,
    onSubmit,
    errors,
    register,
  };
};
