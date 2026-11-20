import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminCategoriesPage from "./pages/AdminCategoriesPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminAddProductPage from "./pages/AdminAddProductPage";
import AdminEditProductPage from "./pages/AdminEditProductPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Публичная часть */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Авторизация */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Админка — только для авторизованных */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/add" element={<AdminAddProductPage />} />
            <Route path="products/edit/:id" element={<AdminEditProductPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;