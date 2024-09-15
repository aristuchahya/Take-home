import { Header } from "@/components/component/admin/header";
import { Sidebar } from "@/components/component/admin/sidebar";
import { TableRule } from "@/components/component/admin/table-rule";

export function TableRulePage() {
  return (
    <>
      <div className="flex justify-end">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <TableRule />
        </div>
      </div>
    </>
  );
}
