import { showToast } from "@/components/ui/showtoast";
import { axiosClient } from "@/lib/axios";
import { FuzzySet, fuzzySetSchema } from "@/types/fuzzy-set/fuzzy-set";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const getAllfuzzySet = async () => {
  try {
    const response = await axiosClient.get("/rule-base/fuzzy-set");
    console.log("data fuzzy:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createFuzzySet = async (data: FuzzySet) => {
  const response = await axiosClient.post("/rule-base/fuzzy-set", data);
  return response.data;
};
export const useFuzzySet = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FuzzySet>({
    mode: "onChange",
    resolver: zodResolver(fuzzySetSchema),
  });

  const { data, isSuccess } = useQuery<FuzzySet[]>({
    queryKey: ["fuzzy-set"],
    queryFn: getAllfuzzySet,
  });

  const { mutate, isPending } = useMutation<FuzzySet, Error, FuzzySet>({
    mutationFn: createFuzzySet,
    onSuccess: () => {
      showToast("Create Fuzzy Set Successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["fuzzy-set"] });
      reset();
      setOpen(false);
    },
    onError: () => {
      showToast("Create Fuzzy Set Failed", "error");
    },
  });

  useEffect(() => {
    if (isSuccess) {
      showToast("Get Fuzzy Set Successfully", "success");
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<FuzzySet> = async (data) => {
    mutate(data);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosClient.delete(`/rule-base/fuzzy-set/${id}`);
      showToast("Delete Fuzzy Set Successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["fuzzy-set"] });
    } catch (error) {
      console.error(error);
      showToast("Delete Fuzzy Set Failed", "error");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    data,
    isPending,
    open,
    setOpen,
    handleDelete,
  };
};
