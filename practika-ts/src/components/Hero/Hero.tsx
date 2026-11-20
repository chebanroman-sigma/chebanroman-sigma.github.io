import HeroContent from "./HeroContent";
import HeroMedia from "./HeroMedia";
import image from "../../assets/hero.png";

function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <HeroContent 
          label="КЛИМАТИЧЕСКИЕ СИСТЕМЫ · 2026"
          title="Идеальный климат для вашего дома и офиса"
          description="Профессиональная установка и обслуживание кондиционеров, вентиляции и систем отопления. Гарантия качества, сертифицированные мастера и быстрый выезд."
        />
        <HeroMedia 
          image={image} 
          productCount={12} 
        />
      </div>
    </section>
  );
}

export default Hero;