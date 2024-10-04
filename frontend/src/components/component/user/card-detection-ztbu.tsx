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
import { useZsTbuForm } from "@/hooks/detection/use-zsTbu-form";

export function CardDetectionZsTbu() {
  const { register, handleSubmit, onSubmit, errors } = useZsTbuForm();
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Pertanyaan 3</CardTitle>
            <CardDescription>Masukkan ZTbu</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="flex gap-4">
                <Label className="mt-3">ZTbu</Label>
                <Input
                  type="number"
                  step={0.01}
                  {...register("zsTbu", { valueAsNumber: true })}
                />
                {errors.zsTbu && (
                  <p className="text-red-500">{errors.zsTbu.message}</p>
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
