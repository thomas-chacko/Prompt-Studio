import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  active?: boolean;
}

export default function CategoryBadge({ category, active = false }: CategoryBadgeProps) {
  return (
    <Link
      href={`/category/${category.toLowerCase()}`}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex-shrink-0 whitespace-nowrap",
        active
          ? "bg-brand-purple/20 border-brand-purple/50 text-white shadow-[0_0_15px_rgba(112,0,255,0.3)]"
          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
      )}
    >
      {category}
    </Link>
  );
}
