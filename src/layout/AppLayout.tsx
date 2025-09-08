import { Sidebar } from "@/components/common/Sidebar";
import { TopBar } from "@/components/common/Topbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <TopBar />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
