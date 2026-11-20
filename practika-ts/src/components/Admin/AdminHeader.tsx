import { Link } from "react-router";

function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4 lg:hidden">
        <span className="text-sm font-bold text-slate-900">Админ-панель</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Link 
          to="/" 
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          ← На сайт
        </Link>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          А
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;