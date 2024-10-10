import { showToast } from "@/components/ui/showtoast";
import { axiosClient } from "@/lib/axios";
import { FuzzyRule, fuzzyRuleSchema } from "@/types/fuzzy-set/fuzzy-rule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useFuzzyRuleUpdate = () => {
  const [open, setOpen] = useState(false);
  // const [id, setId] = useState<string>("");
  const queryClient = useQueryClient();
  const updateRule = async (data: FuzzyRule) => {
    const res = await axiosClient.patch(`/fuzzy-rule/${data.id}`, data);
    console.log("updated:", res);
    return res.data;
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FuzzyRule>({
    resolver: zodResolver(fuzzyRuleSchema),
    defaultValues: {
      id: "",
    },
  });

  const { mutate, isPending } = useMutation<FuzzyRule, Error, FuzzyRule>({
    mutationFn: async (data: FuzzyRule) => {
      return await updateRule(data);
    },
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

  const handleEdit = (data: FuzzyRule) => {
    console.log("Editing data:", data);
    setValue("id", data.id);
    setValue("ageRange", data.ageRange);
    setValue("heightMin", data.heightMin);
    setValue("heightMax", data.heightMax);
    setValue("weightMin", data.weightMin);
    setValue("weightMax", data.weightMax);
    setValue("output", data.output);
    setOpen(true);
  };

  const onSubmit: SubmitHandler<FuzzyRule> = () => {
    const currentValues = getValues();

    mutate(currentValues);
  };

  return {
    setValue,
    handleSubmit,
    onSubmit,
    isPending,
    setOpen,
    open,
    errors,
    handleEdit,
    register,
  };
};
