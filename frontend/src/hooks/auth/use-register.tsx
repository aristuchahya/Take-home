import { showToast } from "@/components/ui/showtoast";
import { axiosClient } from "@/lib/axios";
import { RegisterForm, registerSchema } from "@/types/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const response = await axiosClient.post("/auth/register", data);

      const user = response.data.user;
      if (user) {
        showToast("Register successfully", "success");
        navigate("/login");
      }
    } catch {
      showToast("Register failed", "error");
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};
