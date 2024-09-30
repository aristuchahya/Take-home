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
import { useTinggiForm } from "@/hooks/detection/use-tinggi-form";

export function CardDetectionHeight() {
  const { setValue, handleSubmit, onSubmit } = useTinggiForm();
  
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Pernyataan 3</CardTitle>
            <CardDescription>Masukkan Rentang Tinggi Badan</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="flex gap-4">
                <Label className="mt-3">Rentang TB</Label>
                <Input
                  placeholder="Contoh: 0 - 68 cm"
                  type="text" 
                  // {...register("tinggiBadan", { required: "Rentang tinggi badan harus diisi" })}
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
