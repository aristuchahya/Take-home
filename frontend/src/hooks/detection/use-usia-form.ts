import { useNavigate } from "react-router-dom";
import useFormStore from "../store/use-form-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UsiaForm {
  usia: string;
}

const UsiaFormSchema = z.object({
  usia: z.string().min(1, {
    message: "Usia is required",
  }),
});

export const useUsiaForm = () => {
  const navigate = useNavigate();
  const { setUsia, formData } = useFormStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UsiaForm>({
    mode: "onChange",
    resolver: zodResolver(UsiaFormSchema),
  });

  const onSubmit: SubmitHandler<UsiaForm> = async (data) => {
    console.log("Usia:", data.usia);
    setUsia(data.usia);
    console.log("Current Form Data:", formData);
    navigate("/weight");
  };

  return {
    setValue,
    handleSubmit,
    onSubmit,
    errors,
    register,
  };
};
