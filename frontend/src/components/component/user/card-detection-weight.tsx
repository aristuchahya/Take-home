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
import { useBeratForm } from "@/hooks/detection/use-berat-form";

export function CardDetectionWeight() {
  const { register, handleSubmit, onSubmit, errors } = useBeratForm();

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Pernyataan 2</CardTitle>
          <CardDescription>Masukkan Rentang Berat Badan</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Label className="mt-3">Rentang BB</Label>
              <Input
                placeholder="Contoh: 0 - 8 kg"
                type="text"
                {...register("beratBadan")}
              />
              {errors.beratBadan && (
                <p className="text-red-500">{errors.beratBadan.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Next</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
