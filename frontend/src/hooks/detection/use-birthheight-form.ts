import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useFormStore from "../store/use-form-store";
interface BirthHeightForm {
  birthHeight: number;
}

const BirthHeightFormSchema = z.object({
  birthHeight: z.number({ required_error: "Harus diisi" }),
});

export const useBirthHeightForm = () => {
  const navigate = useNavigate();
  const { setBirthHeight } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BirthHeightForm>({
    mode: "onChange",
    resolver: zodResolver(BirthHeightFormSchema),
  });

  const onSubmit: SubmitHandler<BirthHeightForm> = async (data) => {
    console.log("Berat badan lahir:", data.birthHeight);
    setBirthHeight(data.birthHeight);
    console.log("Current Form Data:", useFormStore.getState().formData);
    navigate(`/zstbu`);
  };

  return { register, handleSubmit, onSubmit, errors };
};
