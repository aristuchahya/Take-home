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
                <Select
                  onValueChange={(value) => setValue("tinggiBadan", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tinggi Badan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="kurang">Kurang(0 - 68 cm)</SelectItem>
                      <SelectItem value="normal">
                        Normal(69 - 100 cm)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
