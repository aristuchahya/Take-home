import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useZsBBuForm } from "@/hooks/detection/use-zsBBu-form";

export function CardResult() {
  const { result, isFetching } = useZsBBuForm();
  console.log(result);
  return (
    <>
      <div className="w-full flex items-center justify-center h-screen">
        <Card className="w-[400px]">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Hasil Deteksi Dini Stunting</CardTitle>
            <CardDescription className="text-center">
              Berikut adalah hasil deteksi stunting menggunakan metode Fuzzy
              Tsukamoto
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="flex flex-col gap-2 items-center">
                <h1 className="text-2xl font-semibold">{result.balita.name}</h1>
                <h2 className="text-xl font-semibold">
                  {result.currentAge} Bulan
                </h2>
                <div className="flex-col gap-2">
                  <h2 className="text-xl font-semibold text-center">
                    Skor Fuzzy :
                  </h2>
                  <h2 className="text-xl font-medium">{result.fuzzyScore}</h2>
                </div>
                <h2 className="text-xl font-medium">{result.outputFuzzy}</h2>
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
