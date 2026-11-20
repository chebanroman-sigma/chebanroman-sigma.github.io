import { Outlet } from "react-router";
import Sidebar from "../components/Admin/Sidebar";
import AdminHeader from "../components/Admin/AdminHeader";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Боковое меню (скрыто на мобильных) */}
      <Sidebar />
      
      {/* Основная часть */}
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          <Outlet /> {/* Сюда будут подставляться страницы админки */}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;