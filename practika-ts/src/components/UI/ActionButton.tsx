import type { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "danger";
  title?: string;
}

function ActionButton({ icon, onClick, variant = "default", title }: ActionButtonProps) {
  const baseClasses = "rounded-md p-2 transition-colors";
  const variants: Record<string, string> = {
    default: "text-slate-400 hover:bg-slate-100 hover:text-slate-600",
    primary: "text-slate-400 hover:bg-blue-50 hover:text-blue-600",
    danger: "text-slate-400 hover:bg-red-50 hover:text-red-600",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`${baseClasses} ${variants[variant] || variants.default}`}
    >
      {icon}
    </button>
  );
}

export default ActionButton;
