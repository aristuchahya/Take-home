import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useFormStore from "../store/use-form-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
interface DateForm {
  date: string;
}

const DateFormSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
});

export const useDateForm = () => {
  const navigate = useNavigate();
  const { setDate, formData } = useFormStore();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<DateForm>({
    mode: "onChange",
    resolver: zodResolver(DateFormSchema),
  });

  const onSubmit: SubmitHandler<DateForm> = async (data) => {
    data.date = new Date(data.date).toISOString();
    setDate(data.date);
    navigate("/weight");
    console.log("Current Form Data:", formData);
  };

  return {
    setValue,
    handleSubmit,
    errors,
    onSubmit,
  };
};
