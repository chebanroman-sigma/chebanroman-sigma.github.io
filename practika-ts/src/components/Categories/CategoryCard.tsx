import type { CategoryCardData } from "../../types";

interface CategoryCardProps {
  category: CategoryCardData;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <a 
      href={category.path} 
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-md"
    >
      {   }
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={category.image} 
          alt={category.title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {   }
      <div className="flex items-center justify-between p-4">
        <span className="font-medium text-slate-900">{category.title}</span>
        {  }
        <svg 
          className="h-4 w-4 text-slate-400 transition-colors group-hover:text-blue-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </a>
  );
}

export default CategoryCard;
