import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  {
    title: "Jumlah Variabel",
    value: 3,
  },
  {
    title: "Jumlah Aturan",
    value: 8,
  },
  {
    title: "Jumlah Hasil",
    value: 8,
  },
];

export function CardVisit() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 me-40 mt-8">
      {data.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground ms-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
