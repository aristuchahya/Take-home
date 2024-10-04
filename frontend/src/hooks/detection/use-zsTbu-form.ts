import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useFormStore from "../store/use-form-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ZsTbuForm {
  zsTbu: number;
}

const ZsTbuFormSchema = z.object({
  zsTbu: z.number({ required_error: "Harus diisi" }),
});

export const useZsTbuForm = () => {
  const navigate = useNavigate();
  const { setZsTbu } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ZsTbuForm>({
    mode: "onChange",
    resolver: zodResolver(ZsTbuFormSchema),
  });

  const onSubmit: SubmitHandler<ZsTbuForm> = async (data) => {
    setZsTbu(data.zsTbu);
    navigate("/zsbbu");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
