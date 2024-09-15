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

export function TableRule() {
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
  } = useFuzzyRule();
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Variabel 1
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("usiaVariable", value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Variabel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="usia">Usia</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.usiaVariable && (
                      <p>{errors.usiaVariable.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Usia
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("usiaFuzzySet", value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Usia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="muda">Muda(0-24 Bulan)</SelectItem>
                          <SelectItem value="tua">Tua(24-36 Bulan)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.usiaFuzzySet && (
                      <p>{errors.usiaFuzzySet.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Variabel 2
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("beratVariable", value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Variabel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="berat badan">
                            Berat Badan
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.beratVariable && (
                      <p>{errors.beratVariable.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weight" className="text-right">
                      Berat Badan
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("beratFuzzySet", value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Berat Badan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="kurang">
                            Kurang(0 - 8 kg)
                          </SelectItem>
                          <SelectItem value="normal">
                            Normal(9 - 20 kg)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.beratFuzzySet && (
                      <p>{errors.beratFuzzySet.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Variabel 3
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("tinggiVariable", value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Variabel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="tinggi badan">
                            Tinggi Badan
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.tinggiVariable && (
                      <p>{errors.tinggiVariable.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weight" className="text-right">
                      Tinggi Badan
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("tinggiFuzzySet", value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Tinggi Badan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="kurang">
                            Kurang(0 - 68 cm)
                          </SelectItem>
                          <SelectItem value="normal">
                            Normal(71 - 95 cm)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.tinggiFuzzySet && (
                      <p>{errors.tinggiFuzzySet.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weight" className="text-right">
                      Output
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("output", value)}
                    >
                      <SelectTrigger className="w-[180px]">
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
                <TableHead>Usia</TableHead>
                <TableHead>Berat Badan</TableHead>

                <TableHead className="hidden md:table-cell">
                  Tinggi Badan
                </TableHead>
                <TableHead className="hidden md:table-cell ">Output</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item) => (
                <TableRow>
                  <TableCell className="font-medium">
                    {item.usiaFuzzySet.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.beratFuzzySet.name}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {item.tinggiFuzzySet.name}
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
                        <DropdownMenuItem>
                          <EditDialog />
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
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
