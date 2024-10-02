import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; 
import { useUsiaForm } from "@/hooks/detection/use-usia-form";

export function CardDetectionAge() {
  const {handleSubmit, onSubmit, errors, register } = useUsiaForm();
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Pernyataan 1</CardTitle>
            <CardDescription>Masukkan Rentang Usia</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="flex gap-4">
                <Label className="mt-3">Rentang Usia</Label>
                <Input
                  placeholder="Contoh: 0 - 24 Bulan"
                  type="text" 
                  {...register("usia", { required: "Rentang usia harus diisi" })}
                />
                {errors.usia && (
                  <p className="text-red-500">{errors.usia.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit">Next</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
