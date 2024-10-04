import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBaby } from "@/hooks/baby/use-baby";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export default function BalitaForm() {
  const { register, handleSubmit, setValue, onSubmit, errors, isLoading } =
    useBaby();
  const [date, setDate] = useState<Date>();
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Biodata</CardTitle>
            <CardDescription>Biodata untuk mendaftarkan balita</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Label className="mt-3">Nama</Label>
                  <Input
                    placeholder="Nama Balita"
                    type="text"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <Label className="mt-3">Tgl Lahir</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          setValue("birth", selectedDate?.toISOString() || "");
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.birth && (
                    <p className="text-red-500">{errors.birth.message}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <Label className="mt-3">Jenis Kelamin</Label>
                  <Select onValueChange={(value) => setValue("gender", value)}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>
                        <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender.message}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Label className="mt-3">Berat Lahir</Label>
                  <Input
                    placeholder="Berat Balita"
                    type="number"
                    step={0.01}
                    {...register("birthWeight", { valueAsNumber: true })}
                  />
                  {errors.birthWeight && (
                    <p className="text-red-500">{errors.birthWeight.message}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Label className="mt-3">Tinggi Lahir</Label>
                  <Input
                    placeholder="Tinggi Balita"
                    type="number"
                    step={0.01}
                    {...register("birthHeight", { valueAsNumber: true })}
                  />
                  {errors.birthHeight && (
                    <p className="text-red-500">{errors.birthHeight.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
