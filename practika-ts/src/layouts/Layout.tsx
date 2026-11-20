import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <Outlet /> {/* Сюда будут подставляться страницы */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;