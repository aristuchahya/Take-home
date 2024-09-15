import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBaby } from "@/hooks/baby/use-baby";

export default function BalitaForm() {
  const { register, handleSubmit, setValue, onSubmit, errors, isLoading } =
    useBaby();
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
                  <Label className="mt-3">Umur</Label>
                  <Input
                    id="age"
                    placeholder="Umur Balita"
                    type="number"
                    {...register("age", { valueAsNumber: true })}
                  />
                  {errors.age && (
                    <p className="text-red-500">{errors.age.message}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <Label className="mt-3">Jenis Kelamin</Label>
                  <Select onValueChange={(value) => setValue("gender", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>
                        <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
