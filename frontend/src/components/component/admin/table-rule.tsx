import { Loader2, MoreHorizontal } from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFuzzyRule } from "@/hooks/fuzzy/use-fuzzy-rule";
import { EditDialog } from "./edit-dialog";
import { Input } from "@/components/ui/input";
import { useFuzzyRuleUpdate } from "@/hooks/fuzzy/use-fuzzyRule-update";
import { useState } from "react";

export function TableRule() {
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    data,
    isPending,
    open,
    setOpen,
    handleDelete,
    register,
  } = useFuzzyRule();

  const { handleEdit } = useFuzzyRuleUpdate();

  const handleRowEdit = (item: any) => {
    console.log("Editing item:", item);
    setSelectedItem(item); // Set item yang akan diedit
    handleEdit(item); // Panggil handleEdit untuk mengisi form
  };
  return (
    <div className="absolute right-52 top-16">
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Data Aturan Fuzzy</CardTitle>
          <CardDescription>
            Data berisi variabel usia, berat badan dan tinggi badan.
          </CardDescription>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-[120px] ">Tambah Aturan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Form Aturan Fuzzy</DialogTitle>
                <DialogDescription>
                  Tambahkan aturan baru disini
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4 ">
                    <Label htmlFor="name" className="text-right">
                      Range Usia (Bulan)
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("ageRange", value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Pilih Variabel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="0-24">0-24</SelectItem>
                          <SelectItem value="25-36">25-36</SelectItem>
                          <SelectItem value="37+">37+</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.ageRange && <p>{errors.ageRange.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Berat Badan Minimal
                    </Label>
                    <Input
                      className="w-[200px]"
                      type="number"
                      step={0.01}
                      {...register("weightMin", { valueAsNumber: true })}
                    />
                    {errors.weightMin && <p>{errors.weightMin.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Berat Badan Maksimal
                    </Label>
                    <Input
                      className="w-[200px]"
                      type="number"
                      step={0.01}
                      {...register("weightMax", { valueAsNumber: true })}
                    />
                    {errors.weightMax && <p>{errors.weightMax.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weight" className="text-right">
                      Tinggi Badan Minimal
                    </Label>
                    <Input
                      className="w-[200px]"
                      type="number"
                      step={0.01}
                      {...register("heightMin", { valueAsNumber: true })}
                    />
                    {errors.heightMin && <p>{errors.heightMin.message}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Tinggi Badan Maksimal
                    </Label>
                    <Input
                      className="w-[200px]"
                      type="number"
                      step={0.01}
                      {...register("heightMax", { valueAsNumber: true })}
                    />
                    {errors.heightMax && <p>{errors.heightMax.message}</p>}
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weight" className="text-right">
                      Output
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("output", value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Pilih Output" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="STUNTING">Stunting</SelectItem>
                          <SelectItem value="NORMAL">Normal</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.output && <p>{errors.output.message}</p>}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => setOpen(false)}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Usia</TableHead>
                <TableHead>Berat Badan Minimal</TableHead>
                <TableHead>Berat Badan Maksimal</TableHead>
                <TableHead className="hidden md:table-cell">
                  Tinggi Badan Minimal
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Tinggi Badan Maksimal
                </TableHead>
                <TableHead className="hidden md:table-cell ">Output</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.ageRange}</TableCell>
                  <TableCell className="font-medium">
                    {item.weightMin}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {item.weightMax}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.heightMin}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.heightMax}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {item.output.toLowerCase()}
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
                        <DropdownMenuItem onClick={() => handleRowEdit(item)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                          Delete
                        </DropdownMenuItem>
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
            Jumlah Fuzzy Rule {data?.length}
          </div>
        </CardFooter>
      </Card>
      {selectedItem && <EditDialog selectedItem={selectedItem} />}
    </div>
  );
}
