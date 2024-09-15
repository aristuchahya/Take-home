import { axiosClient } from "@/lib/axios";
import { JwtPayload, LoginForm, loginSchema } from "@/types/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/use-auth-store";
import { jwtDecode as jwt_decode } from "jwt-decode";

import { showToast } from "@/components/ui/showtoast";
import { useState } from "react";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/auth/login", data);
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }
      const decoded = jwt_decode<JwtPayload>(token);

      console.log("Decoded JWT Payload:", decoded); // Debug log

      setUser({
        fullName: decoded.fullName,
        username: decoded.username,
        role: decoded.role,
        token,
      });
      showToast("Login successfully", "success");
      setTimeout(() => {
        if (decoded.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (decoded.role === "USER") {
          navigate("/list-baby");
        }
      }, 1000);
    } catch (error) {
      showToast("Login failed", "error");
      console.error("Login error:", error); // Debug log
    } finally {
      setLoading(false); // Hentikan loading
    }
  };

  return { register, handleSubmit, onSubmit, errors, loading };
};
