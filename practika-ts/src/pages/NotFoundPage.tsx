import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
      <p className="text-xl text-slate-500 mb-8">Такой страницы не существует</p>
      <Link 
        to="/" 
        className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;