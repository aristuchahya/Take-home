import { showToast } from "@/components/ui/showtoast";
import { axiosClient } from "@/lib/axios";
import { FuzzyRule } from "@/types/fuzzy-set/fuzzy-rule";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useFuzzyRuleUpdate = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const updateRule = async (data: FuzzyRule) => {
    const res = await axiosClient.patch(`/fuzzy-rule/${data.id}`, data);
    console.log("updated:", res);
    return res.data;
  };

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FuzzyRule>({
    defaultValues: {
      usiaVariable: "",
      usiaFuzzySet: "",
      beratVariable: "",
      beratFuzzySet: "",
      tinggiVariable: "",
      tinggiFuzzySet: "",
      output: "",
    },
  });

  const { mutate, isPending } = useMutation<FuzzyRule, Error, FuzzyRule>({
    mutationFn: updateRule,
    mutationKey: ["fuzzy-rule"],
    onSuccess: () => {
      showToast("Update Fuzzy Rule Successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["fuzzy-rule"] });
      setOpen(false);
    },
    onError: () => {
      showToast("Update Fuzzy Rule Failed", "error");
    },
  });

  const onSubmit: SubmitHandler<FuzzyRule> = (data) => {
    mutate(data);
  };

  return { setValue, handleSubmit, onSubmit, isPending, setOpen, open, errors };
};
