interface BrandProps {
  name: string;
}

function Brand({ name }: BrandProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
        К
      </div>
      <span className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900">
        {name}
      </span>
    </div>
  );
}

export default Brand;
