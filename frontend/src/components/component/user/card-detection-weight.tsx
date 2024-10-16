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
import { useBirthHeightForm } from "@/hooks/detection/use-birthheight-form";

export function CardDetectionBirthHeight() {
  const { register, handleSubmit, onSubmit, errors } = useBirthHeightForm();
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Pertanyaan 2</CardTitle>
            <CardDescription>Masukkan Tinggi Badan Saat Lahir</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="flex gap-4">
                <Label className="mt-3">TB Lahir</Label>
                <Input
                  type="number"
                  step={0.01}
                  {...register("birthHeight", { valueAsNumber: true })}
                />
                {errors.birthHeight && (
                  <p className="text-red-500">{errors.birthHeight.message}</p>
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
