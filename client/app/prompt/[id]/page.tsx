import { samplePrompts } from "@/data/prompts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CopyDetailButton from "@/components/copy-detail-button";
import CategoryBadge from "@/components/category-badge";

type Props = { params: Promise<{ id: string }> };

export default async function PromptDetail({ params }: Props) {
  const { id } = await params;
  const prompt = samplePrompts.find((p) => p.id === id);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="w-full mx-auto px-4 py-12">
      <Link href="/explore" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Explore
      </Link>
      
      <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden border-white/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[100px] -z-10" />
        
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <CategoryBadge category={prompt.category} active />
          {prompt.tags.map((tag) => (
            <span key={tag} className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">{prompt.title}</h1>
        <p className="text-xl text-gray-400 mb-12 line-clamp-2">
          {prompt.description}
        </p>
        
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Prompt Content</h3>
          <p className="text-lg md:text-xl text-white font-mono leading-relaxed whitespace-pre-wrap">
            {prompt.content}
          </p>
        </div>
        
        <CopyDetailButton content={prompt.content} copyCount={prompt.copyCount} />
      </div>
    </div>
  );
}
