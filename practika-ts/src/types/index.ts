/** Товар (из API / db.json) */
export interface Product {
  id: string | number;
  title: string;
  category: string;
  price: string;
  count?: string | number;
  description?: string;
  image?: string;
  rating?: number;
  oldPrice?: string | null;
}

/** Категория (из API) */
export interface Category {
  id: string | number;
  name: string;
  slug: string;
  count: number;
}

/** Категория для главной (статические данные) */
export interface CategoryCardData {
  id: number;
  title: string;
  image: string;
  path: string;
}

/** Заказ */
export interface Order {
  id: string | number;
  customer: string;
  amount: number;
  status: string;
  date: string;
  comment?: string;
}

/** Данные формы товара */
export interface ProductFormData {
  title: string;
  category: string;
  price: string;
  count?: string | number;
  description?: string;
  image?: string;
}

/** Статистика дашборда */
export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  newUsers: number;
  recentOrders: Order[];
  categoryChartData: CategoryChartItem[];
  revenueChartData: RevenueChartItem[];
  trends: {
    products: number;
    orders: number;
    revenue: number;
    users: number;
  };
}

export interface CategoryChartItem {
  name: string;
  value: number;
  color: string;
}

export interface RevenueChartItem {
  month: string;
  amount: number;
  count: number;
}

/** Активный фильтр в каталоге */
export interface ActiveFilter {
  type: "category" | "minPrice" | "maxPrice";
  label: string;
}

/** Пропсы для ProductForm */
export interface ProductFormProps {
  initialData?: Partial<Product>;
  categories: Category[];
  onSave: (data: ProductFormData) => void | Promise<void>;
  onCancel: () => void;
}

/** Пользователь */
export interface User {
  id: string | number;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

/** Ответ логина */
export interface AuthResponse {
  token: string;
  user: Omit<User, "password">;
}

/** Данные для логина */
export interface LoginCredentials {
  email: string;
  password: string;
}