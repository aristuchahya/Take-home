import { CardVisit } from "@/components/component/admin/card-admin";
import { Header } from "@/components/component/admin/header";
import { Sidebar } from "@/components/component/admin/sidebar";

export function DashboardAdmin() {
  return (
    <>
      <div className="flex justify-end">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <CardVisit />
        </div>
      </div>
    </>
  );
}
