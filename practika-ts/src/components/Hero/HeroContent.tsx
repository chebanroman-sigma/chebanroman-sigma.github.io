import HeroActions from "./HeroActions";

function HeroContent({ label, title, description }) {
  return (
    <div className="max-w-xl">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
        {label}
      </p>
      <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-slate-500">
        {description}
      </p>
      <HeroActions />
    </div>
  );
}

export default HeroContent;