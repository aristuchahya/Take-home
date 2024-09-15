import { showToast } from "@/components/ui/showtoast";
import { axiosClient } from "@/lib/axios";
import { FuzzyRule, fuzzyRuleSchema } from "@/types/fuzzy-set/fuzzy-rule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const getFuzzyRules = async () => {
  try {
    const response = await axiosClient.get("/rule-base");
    console.log("data fuzzy rule:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createFuzzyRule = async (data: FuzzyRule) => {
  const response = await axiosClient.post("/rule-base/fuzzy-rule", data);
  return response.data;
};
export const useFuzzyRule = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FuzzyRule>({
    mode: "onChange",
    resolver: zodResolver(fuzzyRuleSchema),
  });

  const { data, isSuccess } = useQuery<FuzzyRule[]>({
    queryKey: ["fuzzy-rule"],
    queryFn: getFuzzyRules,
  });

  const { mutate, isPending } = useMutation<FuzzyRule, Error, FuzzyRule>({
    mutationKey: ["fuzzy-rule"],
    onSuccess: () => {
      showToast("Create Fuzzy Rule Successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["fuzzy-rule"] });
      reset();
      setOpen(false);
    },

    onError: () => {
      showToast("Create Fuzzy Rule Failed", "error");
    },
    mutationFn: createFuzzyRule,
  });

  useEffect(() => {
    if (isSuccess) {
      showToast("Get Fuzzy Rule Successfully", "success");
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<FuzzyRule> = async (data) => {
    mutate(data);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosClient.delete(`/rule-base/fuzzy-rule/${id}`);
      showToast("Delete Fuzzy Rule Successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["fuzzy-rule"] });
    } catch {
      showToast("Delete Fuzzy Rule Failed", "error");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    onSubmit,
    data,
    isPending,
    open,
    setOpen,
    handleDelete,
  };
};
