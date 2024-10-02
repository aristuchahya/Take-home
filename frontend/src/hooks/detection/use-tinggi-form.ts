import { axiosClient } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import useFormStore, { StoreFormData } from "../store/use-form-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "@/components/ui/showtoast";
import { z } from "zod";

interface TinggiForm {
  tinggiBadan: string;
}

const TinggiFormSchema = z.object({
  tinggiBadan: z.string().min(1, {
    message: "Tinggi badan is required",
  }),
});

const findResult = async (babyId: string) => {
  const response = await axiosClient.get(`/baby/${babyId}`);
  console.log(response.data);
  return response.data;
};

export const useTinggiForm = () => {
  const navigate = useNavigate();
  const { babyId, formData, setTinggiBadan } = useFormStore();
  console.log("Form:", formData);

  const createDetect = async (data: StoreFormData, babyId: string) => {
    const response = await axiosClient.post(`/fuzzy-detection/${babyId}`, data);
    console.log(response.data);
    return response.data;
  };

  const { register, setValue, handleSubmit, formState: {errors} } = useForm<TinggiForm>({
    mode: "onChange",
    resolver: zodResolver(TinggiFormSchema),
  });

  const { data: result, isFetching } = useQuery({
    queryKey: ["detect", babyId],
    queryFn: () => findResult(babyId as string),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["detect"],
    mutationFn: () => createDetect(formData, babyId as string),
    onSuccess: () => {
      showToast("Detect Successfully", "success");
      navigate("/result");
    },
    onError: () => {
      showToast("Detect Failed", "error");
    },
  });

  const onSubmit: SubmitHandler<TinggiForm> = async (data) => {
    console.log("Tinggi Badan:", data.tinggiBadan);
    setTinggiBadan(data.tinggiBadan);
    mutate();
  };

  return {register, setValue, handleSubmit, onSubmit, errors,result, isPending, isFetching };
};
