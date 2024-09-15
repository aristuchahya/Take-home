import { Dimension } from "@/components/component/admin/dimension";
import { Header } from "@/components/component/admin/header";
import { Sidebar } from "@/components/component/admin/sidebar";

export function DimensionPage() {
  return (
    <>
      <div className="flex justify-end">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <Dimension />
        </div>
      </div>
    </>
  );
}
