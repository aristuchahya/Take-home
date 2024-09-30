import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Loader2 } from "lucide-react";

export function EditDialog() {
  const { setValue, handleSubmit, onSubmit, errors, isPending, open, setOpen } =
    useFuzzyRuleUpdate();
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-[120px] bg-white text-black border-none p-0 hover:bg-white ">
            Tambah Aturan
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Aturan Fuzzy</DialogTitle>
            <DialogDescription>Tambahkan aturan baru disini</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Variabel 1
                </Label>
                <Select
                  onValueChange={(value) => setValue("usiaVariable", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Variabel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="usia">Usia</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.usiaVariable && <p>{errors.usiaVariable.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Usia
                </Label>
                <Select
                  onValueChange={(value) => setValue("usiaFuzzySet", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Usia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="muda">Muda(0-24 Bulan)</SelectItem>
                      <SelectItem value="tua">Tua(24-36 Bulan)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.usiaFuzzySet && <p>{errors.usiaFuzzySet.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Variabel 2
                </Label>
                <Select
                  onValueChange={(value) => setValue("beratVariable", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Variabel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="berat badan">Berat Badan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.beratVariable && <p>{errors.beratVariable.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Berat Badan
                </Label>
                <Select
                  onValueChange={(value) => setValue("beratFuzzySet", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Berat Badan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="kurang">Kurang(0 - 8 kg)</SelectItem>
                      <SelectItem value="normal">Normal(9 - 20 kg)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.beratFuzzySet && <p>{errors.beratFuzzySet.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Variabel 3
                </Label>
                <Select
                  onValueChange={(value) => setValue("tinggiVariable", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Variabel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="tinggi badan">Tinggi Badan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.tinggiVariable && (
                  <p>{errors.tinggiVariable.message}</p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Tinggi Badan
                </Label>
                <Select
                  onValueChange={(value) => setValue("tinggiFuzzySet", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Tinggi Badan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="kurang">Kurang(0 - 68 cm)</SelectItem>
                      <SelectItem value="normal">Normal(71 - 95 cm)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.tinggiFuzzySet && (
                  <p>{errors.tinggiFuzzySet.message}</p>
                )}
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
