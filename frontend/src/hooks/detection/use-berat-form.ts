import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useFormStore from "../store/use-form-store";
interface BeratForm {
  beratBadan: string;
}

const BeratFormSchema = z.object({
  beratBadan: z.string().min(1, {
    message: "Berat badan is required",
  }),
});

export const useBeratForm = () => {
  const navigate = useNavigate();
  const { setBeratBadan } = useFormStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BeratForm>({
    mode: "onChange",
    resolver: zodResolver(BeratFormSchema),
  });

  const onSubmit: SubmitHandler<BeratForm> = async (data) => {
    console.log("Berat Badan:", data.beratBadan);
    setBeratBadan(data.beratBadan);
    console.log("Current Form Data:", useFormStore.getState().formData);
    navigate(`/height`);
  };

  return {register, setValue, handleSubmit, onSubmit, errors };
};
