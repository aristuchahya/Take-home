import { Header } from "@/components/component/admin/header";
import { ListQuestion } from "@/components/component/admin/list-question";
import { Sidebar } from "@/components/component/admin/sidebar";

export function QuestionsPage() {
  return (
    <>
      <div className="flex justify-end">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <ListQuestion />
        </div>
      </div>
    </>
  );
}
