import CategoryBadge from "@/components/category-badge";
import { categories } from "@/data/prompts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 cursor-pointer inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Categories</h1>
      <p className="text-xl text-gray-400 mb-12 max-w-2xl">
        Find the perfect prompt for your specific use case. From coding to marketing, we have you covered.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat} className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">{cat}</h3>
            <p className="text-sm text-gray-400">100+ prompts</p>
          </div>
        ))}
      </div>
    </div>
  );
}
