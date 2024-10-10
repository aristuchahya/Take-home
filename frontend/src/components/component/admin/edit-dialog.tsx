import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFuzzyRuleUpdate } from "@/hooks/fuzzy/use-fuzzyRule-update";
import { FuzzyRule } from "@/types/fuzzy-set/fuzzy-rule";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface EditDialogProps {
  selectedItem: FuzzyRule | undefined;
}
export function EditDialog({ selectedItem }: EditDialogProps) {
  const {
    setValue,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    open,
    setOpen,
    register,
  } = useFuzzyRuleUpdate();

  useEffect(() => {
    if (selectedItem) {
      setValue("id", selectedItem.id); // Pastikan id juga diset
      setValue("ageRange", selectedItem.ageRange);
      setValue("weightMin", selectedItem.weightMin);
      setValue("weightMax", selectedItem.weightMax);
      setValue("heightMin", selectedItem.heightMin);
      setValue("heightMax", selectedItem.heightMax);
      setValue("output", selectedItem.output);
      setOpen(true); // Membuka dialog saat selectedItem ada
    }
  }, [selectedItem, setValue, setOpen]);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
          <Button className="w-[120px] bg-white text-black border-none p-0 hover:bg-white ">
            Tambah Aturan
          </Button>
        </DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Aturan Fuzzy</DialogTitle>
            <DialogDescription>Edit aturan fuzzy disini</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Range Usia
                </Label>
                <Select onValueChange={(value) => setValue("ageRange", value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Pilih Variabel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0-6 bulan">0-6 bulan</SelectItem>
                      <SelectItem value="6-12 bulan">6-12 bulan</SelectItem>
                      <SelectItem value="12-24 bulan">12-24 bulan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.ageRange && <p>{errors.ageRange.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Berat Badan Minimal
                </Label>
                <Input
                  {...register("weightMin", { valueAsNumber: true })}
                  step={0.01}
                />
                {errors.weightMin && <p>{errors.weightMin.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Berat Badan Maksimal
                </Label>
                <Input
                  {...register("weightMax", { valueAsNumber: true })}
                  step={0.01}
                />
                {errors.weightMax && <p>{errors.weightMax.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Tinggi Badan Minimal
                </Label>
                <Input
                  {...register("heightMin", { valueAsNumber: true })}
                  step={0.01}
                />
                {errors.heightMin && <p>{errors.heightMin.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Tinggi Badan Maksimal
                </Label>
                <Input
                  {...register("heightMax", { valueAsNumber: true })}
                  step={0.01}
                />
                {errors.heightMax && <p>{errors.heightMax.message}</p>}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Output
                </Label>
                <Select onValueChange={(value) => setValue("output", value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Output" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="STUNTING">Stunting</SelectItem>
                      <SelectItem value="NORMAL">Normal</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.output && <p>{errors.output.message}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
