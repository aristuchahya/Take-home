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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFuzzySet } from "@/hooks/fuzzy/use-fuzzySet";
import { MoreHorizontal } from "lucide-react";

export function ListQuestion() {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    data,
    isPending,
    open,
    setOpen,
    handleDelete,
  } = useFuzzySet();
  return (
    <>
      <div className="absolute right-52 top-16">
        <Card className="w-[800px]">
          <CardHeader>
            <CardTitle>Data Fuzzy Set</CardTitle>
            <CardDescription>
              Data ini berisi semua data fuzzy set.
            </CardDescription>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-[150px] ">Tambah Fuzzy Set</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Form Fuzzy Set</DialogTitle>
                  <DialogDescription>
                    Tambahkan fuzzy set baru disini
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nama
                      </Label>
                      <div className="flex flex-col w-[200px]">
                        <Input
                          id="name"
                          placeholder="Masukkan Fuzzy Set"
                          className="w-[180px]"
                          type="text"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-[12px] text-red-500 mt-1 ">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="lower" className="text-right">
                        Batas Bawah
                      </Label>
                      <div className="flex flex-col w-[200px]">
                        <Input
                          id="lower"
                          placeholder="Masukkan Batas Bawah"
                          className="w-[180px]"
                          type="number"
                          {...register("lowerBound", { valueAsNumber: true })}
                        />
                        {errors.lowerBound && (
                          <p className="text-[12px] text-red-500 mt-1 ">
                            {errors.lowerBound.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="upper" className="text-right">
                        Batas Atas
                      </Label>
                      <div className="flex flex-col w-[200px]">
                        <Input
                          id="upper"
                          placeholder="Masukkan Batas Atas"
                          className="w-[180px]"
                          type="number"
                          {...register("upperBound", { valueAsNumber: true })}
                        />
                        {errors.upperBound && (
                          <p className="text-[12px] text-red-500 mt-1 ">
                            {errors.upperBound.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="weight" className="text-right">
                        Nama Variabel
                      </Label>
                      <div className="flex flex-col w-[200px]">
                        <Select
                          onValueChange={(value) =>
                            setValue("fuzzyVariableId", parseInt(value, 10))
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Pilih Variabel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="1">Usia</SelectItem>
                              <SelectItem value="2">Berat Badan</SelectItem>
                              <SelectItem value="3">Tinggi Badan</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.fuzzyVariableId && (
                          <p className="text-[12px] text-red-500 mt-1 ">
                            {errors.fuzzyVariableId.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={isPending}
                      onClick={() => setOpen(false)}
                    >
                      {isPending ? "Saving..." : "Submit"}
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
                  <TableHead>Nama</TableHead>
                  <TableHead>Batas Atas</TableHead>
                  <TableHead>Batas Bawah</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Variabel
                  </TableHead>

                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-medium">
                      {item.lowerBound}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.upperBound}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.fuzzyVariable.name}
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
                            <Dialog open={open} onOpenChange={setOpen}>
                              <DialogTrigger asChild>
                                <Button className="text-black bg-white p-0 hover:bg-white">
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Form Fuzzy Set</DialogTitle>
                                  <DialogDescription>
                                    Tambahkan fuzzy set baru disini
                                  </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="name"
                                        className="text-right"
                                      >
                                        Nama
                                      </Label>
                                      <div className="flex flex-col w-[200px]">
                                        <Input
                                          id="name"
                                          placeholder="Masukkan Fuzzy Set"
                                          className="w-[180px]"
                                          type="text"
                                          {...register("name")}
                                        />
                                        {errors.name && (
                                          <p className="text-[12px] text-red-500 mt-1 ">
                                            {errors.name.message}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="lower"
                                        className="text-right"
                                      >
                                        Batas Bawah
                                      </Label>
                                      <div className="flex flex-col w-[200px]">
                                        <Input
                                          id="lower"
                                          placeholder="Masukkan Batas Bawah"
                                          className="w-[180px]"
                                          type="number"
                                          {...register("lowerBound", {
                                            valueAsNumber: true,
                                          })}
                                        />
                                        {errors.lowerBound && (
                                          <p className="text-[12px] text-red-500 mt-1 ">
                                            {errors.lowerBound.message}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="upper"
                                        className="text-right"
                                      >
                                        Batas Atas
                                      </Label>
                                      <div className="flex flex-col w-[200px]">
                                        <Input
                                          id="upper"
                                          placeholder="Masukkan Batas Atas"
                                          className="w-[180px]"
                                          type="number"
                                          {...register("upperBound", {
                                            valueAsNumber: true,
                                          })}
                                        />
                                        {errors.upperBound && (
                                          <p className="text-[12px] text-red-500 mt-1 ">
                                            {errors.upperBound.message}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="weight"
                                        className="text-right"
                                      >
                                        Nama Variabel
                                      </Label>
                                      <div className="flex flex-col w-[200px]">
                                        <Select
                                          onValueChange={(value) =>
                                            setValue(
                                              "fuzzyVariableId",
                                              parseInt(value, 10)
                                            )
                                          }
                                        >
                                          <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Pilih Variabel" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="1">
                                                Usia
                                              </SelectItem>
                                              <SelectItem value="2">
                                                Berat Badan
                                              </SelectItem>
                                              <SelectItem value="3">
                                                Tinggi Badan
                                              </SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                        {errors.fuzzyVariableId && (
                                          <p className="text-[12px] text-red-500 mt-1 ">
                                            {errors.fuzzyVariableId.message}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      disabled={isPending}
                                      onClick={() => setOpen(false)}
                                    >
                                      {isPending ? "Saving..." : "Submit"}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(item.id)}
                          >
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
              Jumlah data Fuzzy Set {data?.length}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
