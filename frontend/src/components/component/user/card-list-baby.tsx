import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBaby } from "@/hooks/baby/use-baby";

// const data = [
//   {
//     id: 1,
//     name: "Arga",
//     age: "12 Bulan",
//     result: "Normal",
//   },
//   {
//     id: 2,
//     name: "Bulan",
//     age: "16 Bulan",
//     result: "Stunting",
//   },
//   {
//     id: 3,
//     name: "Caca",
//     age: "24 Bulan",
//     result: "Normal",
//   },
//   {
//     id: 4,
//     name: "Dina",
//     age: "14 Bulan",
//     result: "Stunting",
//   },
// ];

export function CardListBaby() {
  const { data } = useBaby();
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Hasil Deteksi</CardTitle>
            <CardDescription>
              Hasil berdasarkan dari data yang dimasukkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Hasil deteksi bayi stunting</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[150px] sm:table-cell">
                    Nama
                  </TableHead>
                  <TableHead className="hidden w-[150px] sm:table-cell">
                    Usia
                  </TableHead>
                  <TableHead className="hidden w-[150px] sm:table-cell">
                    Skor
                  </TableHead>
                  <TableHead className="hidden w-[150px] sm:table-cell">
                    Hasil Deteksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.balita.name}</TableCell>
                    <TableCell>{item.currentAge} Bulan</TableCell>
                    <TableCell>{item.fuzzyScore}</TableCell>
                    <TableCell>{item.outputFuzzy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
