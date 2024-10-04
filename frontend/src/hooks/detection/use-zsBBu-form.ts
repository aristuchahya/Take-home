import { axiosClient } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import useFormStore, { StoreFormData } from "../store/use-form-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "@/components/ui/showtoast";
import { z } from "zod";

interface ZsBBuForm {
  zsBBu: number;
}

const ZsBBuFormSchema = z.object({
  zsBBu: z.number({ required_error: "Harus diisi" }),
});

const findResult = async (babyId: string) => {
  const response = await axiosClient.get(`/fuzzy-detection/${babyId}`);
  console.log("result:", response.data);
  return response.data;
};

export const useZsBBuForm = () => {
  const navigate = useNavigate();
  const { babyId, formData, setZsBBu } = useFormStore();
  console.log("Form:", formData);

  const createDetect = async (data: StoreFormData, babyId: string) => {
    const response = await axiosClient.post(`/fuzzy-detection/${babyId}`, data);
    console.log(response.data);
    return response.data;
  };

  const { register, handleSubmit } = useForm<ZsBBuForm>({
    mode: "onChange",
    resolver: zodResolver(ZsBBuFormSchema),
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

  const onSubmit: SubmitHandler<ZsBBuForm> = async (data) => {
    console.log("Tinggi Badan:", data.zsBBu);
    setZsBBu(data.zsBBu);
    mutate();
  };

  return { register, handleSubmit, onSubmit, result, isPending, isFetching };
};
