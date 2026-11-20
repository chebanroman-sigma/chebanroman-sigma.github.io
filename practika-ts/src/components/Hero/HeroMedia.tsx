import ProductCounter from "./ProductCounter";

function HeroMedia({ image, productCount }) {
  return (
    // relative нужен, чтобы счетчик (absolute) позиционировался относительно этой картинки
    <div className="relative">
      <img 
        src={image} 
        alt="Климатическое оборудование" 
        className="h-[400px] w-full rounded-2xl object-cover shadow-lg"
      />
      
      {/* Передаем количество брендов в дочерний компонент */}
      <ProductCounter count={productCount} />
    </div>
  );
}

export default HeroMedia;