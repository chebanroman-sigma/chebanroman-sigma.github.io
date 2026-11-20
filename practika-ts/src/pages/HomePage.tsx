import Hero from "../components/Hero/Hero";
import CategoryList from "../components/Categories/CategoryList";
import ProductList from "../components/Products/ProductList";
import FeatureList from "../components/Features/FeatureList"; // Импорт

function HomePage() {
  return (
    <>
      <Hero />
      <CategoryList />
      <ProductList />
      <FeatureList /> {/* Добавили преимущества */}
    </>
  );
}

export default HomePage;