import { Header } from "@/components/component/admin/header";
import { ResultStunting } from "@/components/component/admin/result-admin";
import { Sidebar } from "@/components/component/admin/sidebar";

export function ResultAdminPage() {
  return (
    <>
      <div className="flex justify-end">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <ResultStunting />
        </div>
      </div>
    </>
  );
}
