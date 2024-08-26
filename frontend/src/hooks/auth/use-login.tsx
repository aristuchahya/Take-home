import { axiosClient } from "@/lib/axios";
import { LoginForm, loginSchema } from "@/types/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/use-auth-store";

import { showToast } from "@/components/ui/showtoast";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await axiosClient.post("/auth/login", data);

      const { user, token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      setUser({
        fullName: user.fullName,
        username: user.username,
        token,
      });

      showToast("Login successfully", "success");
      navigate("/");
    } catch {
      showToast("Login failed", "error");
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};
