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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBeratForm } from "@/hooks/detection/use-berat-form";

export function CardDetectionWeight() {
  const { setValue, handleSubmit, onSubmit, errors } = useBeratForm();
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Pernyataan 2</CardTitle>
            <CardDescription>Masukkan Rentang Berat Badan</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="flex gap-4">
                <Label className="mt-3">Rentang BB</Label>
                <Select
                  onValueChange={(value) => setValue("beratBadan", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Berat Badan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="kurang">Kurang(0 - 8 kg)</SelectItem>
                      <SelectItem value="normal">Normal(9 - 24 kg)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
    </>
  );
}
