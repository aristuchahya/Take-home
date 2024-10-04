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

import { useBirthWeightForm } from "@/hooks/detection/use-birthweight-form";

export function CardDetectionBirthWeight() {
  const { register, handleSubmit, onSubmit, errors } = useBirthWeightForm();
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Pertanyaan 1</CardTitle>
            <CardDescription>Masukkan Berat badan saat lahir</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="flex gap-4">
                <Label className="mt-3">BB Lahir</Label>
                <Input
                  type="number"
                  step={0.01}
                  {...register("birthWeight", { valueAsNumber: true })}
                />
                {errors.birthWeight && (
                  <p className="text-red-500">{errors.birthWeight.message}</p>
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
