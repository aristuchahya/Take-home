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
import { useZsBBuForm } from "@/hooks/detection/use-zsBBu-form";

export function CardDetectionZsBBu() {
  const { register, handleSubmit, onSubmit } = useZsBBuForm();
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Pernyataan 4</CardTitle>
            <CardDescription>Masukkan ZsBBu </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="flex gap-4">
                <Label className="mt-3">ZsBBu</Label>
                <Input
                  type="number"
                  step={0.01}
                  {...register("zsBBu", { valueAsNumber: true })}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
