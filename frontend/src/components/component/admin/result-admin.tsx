import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBaby } from "@/hooks/baby/use-baby";
import { MoreHorizontal } from "lucide-react";

// const data = [
//   {
//     id: 1,
//     name: "Arga",
//     age: "14",
//     gender: "Laki-laki",
//     score: "0.5",
//     result: "Stunting",
//   },
//   {
//     id: 2,
//     name: "Nina",
//     age: "20",
//     gender: "Perempuan",
//     score: "1.0",
//     result: "Normal",
//   },
//   {
//     id: 3,
//     name: "Putri",
//     age: "12",
//     gender: "Perempuan",
//     score: "0.7",
//     result: "Stunting",
//   },
//   {
//     id: 4,
//     name: "Maulana",
//     age: "18",
//     gender: "Laki-laki",
//     score: "1.2",
//     result: "Normal",
//   },
// ];

export function ResultStunting() {
  const { data } = useBaby();
  return (
    <>
      <div className="absolute right-52 top-16">
        <Card className="w-[800px]">
          <CardHeader>
            <CardTitle>Data Hasil</CardTitle>
            <CardDescription>
              Data ini berisi nama balita yang sudah melakukan deteksi stunting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Usia</TableHead>
                  <TableHead>Jenis Kelamin</TableHead>
                  <TableHead>Skor Stunting</TableHead>
                  <TableHead>Hasil</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.balita.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.currentAge}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.balita.gender}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.fuzzyScore}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.outputFuzzy}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Total Deteksi: {data?.length}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
