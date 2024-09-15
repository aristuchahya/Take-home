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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

const data = [
  {
    id: 1,
    name: "Usia",
    description:
      "Umur atau usia manusia adalah waktu yang terlewati sejak kelahiran.",
  },
  {
    id: 2,
    name: "Berat Badan",
    description:
      "Berat badan manusia adalah jumlah massa tubuh seseorang yang biasanya diukur dalam satuan kilogram (kg) atau pound (lbs).",
  },
  {
    id: 3,
    name: "Tinggi Badan",
    description:
      "Tinggi badan manusia adalah ukuran jarak vertikal dari telapak kaki ke puncak kepala ketika berdiri tegak.",
  },
];

export function Dimension() {
  return (
    <>
      <div className="absolute right-52 top-16">
        <Card className="w-[800px]">
          <CardHeader>
            <CardTitle>Data Dimensi</CardTitle>
            <CardDescription>
              Data ini berisi nama dimensi serta keterangan dari variabel.
            </CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-[150px] ">Tambah Dimensi</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Form Dimensi</DialogTitle>
                  <DialogDescription>
                    Tambahkan dimensi baru disini
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="variable" className="text-right">
                      Variabel
                    </Label>
                    <Input
                      id="variable"
                      placeholder="Masukkan Nama Variabel"
                      className="w-[180px]"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="desc" className="text-right">
                      Keterangan
                    </Label>
                    <Input
                      id="desc"
                      placeholder="Masukkan Keterangan Variabel"
                      className="w-[180px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">No.</span>
                  </TableHead>
                  <TableHead>Nama Dimensi</TableHead>
                  <TableHead>Keterangan</TableHead>

                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                      <h2 className="text-center">{item.id}</h2>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-medium">
                      {item.description}
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
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
