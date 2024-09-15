import { showToast } from "@/components/ui/showtoast";
import { axiosClient } from "@/lib/axios";
import { BabyForm, babySchema } from "@/types/baby/baby";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useFormStore from "../store/use-form-store";

const getAllBaby = async () => {
  try {
    const response = await axiosClient.get("/baby");
    console.log("data baby:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const useBaby = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createBaby = async (data: BabyForm) => {
    try {
      const response = await axiosClient.post("/baby", data);
      console.log("create baby:", response.data);
      const babyId = response.data.id;
      setBabyId(babyId);
      return response.data;
    } catch {
      showToast("Create Baby Failed", "error");
    }
  };

  const { setBabyId } = useFormStore();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<BabyForm>({
    mode: "onChange",
    resolver: zodResolver(babySchema),
  });

  const { data, isLoading, isSuccess, isFetching } = useQuery<BabyForm[]>({
    queryKey: ["baby"],
    queryFn: getAllBaby,
  });

  const { mutate, isPending } = useMutation<BabyForm, Error, BabyForm>({
    mutationKey: ["baby"],
    mutationFn: createBaby,
    onSuccess: () => {
      showToast("Create Baby Successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["baby"] });
      reset();
      navigate("/age");
    },
    onError: () => {
      showToast("Create Baby Failed", "error");
    },
  });

  const onSubmit: SubmitHandler<BabyForm> = (data) => {
    mutate(data);
  };

  return {
    register,
    setValue,
    errors,
    handleSubmit,
    data,
    isLoading,
    isSuccess,
    onSubmit,
    isPending,
    isFetching,
  };
};
