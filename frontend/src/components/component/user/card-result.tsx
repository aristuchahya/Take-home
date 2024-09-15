import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTinggiForm } from "@/hooks/detection/use-tinggi-form";

export function CardResult() {
  const { result, isFetching } = useTinggiForm();
  console.log(result);
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card className="w-[300px]">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Hasil Deteksi Stunting</CardTitle>
            <CardDescription className="text-center">
              Berikut adalah hasil deteksi stunting menggunakan metode Fuzzy
              Tsukamoto
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="flex flex-col gap-2 items-center">
                <h1 className="text-2xl font-semibold">{result.name}</h1>
                <h2 className="text-xl font-semibold">{result.age} Bulan</h2>
                <div className="flex gap-2">
                  <h2 className="text-xl font-semibold">Skor Stunting :</h2>
                  <h2 className="text-xl font-medium">{result.score}</h2>
                </div>
                <h2 className="text-xl font-medium">{result.result}</h2>
              </div>
            ) : (
              !isFetching && <p>Loading...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
