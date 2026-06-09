import { useState } from "react";
import { BlogPost, LanguageCode } from "../types";
import { BLOG_POSTS, TRANSLATIONS } from "../data";
import { BookOpen, User, Calendar, Folder, ArrowRight, Share2, Printer, ArrowLeft } from "lucide-react";

interface BlogSectionProps {
  currentLang: LanguageCode;
}

export default function BlogSection({ currentLang }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const t = TRANSLATIONS[currentLang];

  const categories = [
    "All",
    "Furniture Trends",
    "Interior Design",
    "Hotel Furniture",
    "Villa Furniture",
    "Manufacturing",
    "Buying Guides"
  ];

  const filteredPosts = selectedCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const handleShare = (title: string) => {
    alert(`Generating shareable SEO link for "${title}"... Copied to dashboard clipboard!`);
  };

  return (
    <div className="w-full space-y-16">
      {/* Introduction Banner header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-label-sm text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
          Elite Design Journals
        </span>
        <h1 className="font-display-lg text-4xl md:text-5xl text-[#1A1A1A]">
          Sourcing Science, Aesthetics & Buyer Guides
        </h1>
        <p className="font-body-md text-stone-500 leading-relaxed text-sm">
          Educating architects, contract buyers, and developers on timber properties, moisture engineering parameters, international compliance regulations, and premium luxury trends.
        </p>
      </div>

      {/* Category selector */}
      <div className="border-b border-[#1A1A1A]/10 pb-4 flex items-center justify-center space-x-6 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActivePost(null);
            }}
            className={`whitespace-nowrap font-label-sm text-xs uppercase tracking-widest pb-2 cursor-pointer transition-colors ${
              selectedCategory === cat ? "text-[#C5A059] border-b-2 border-[#C5A059] font-bold" : "text-stone-500 hover:text-[#1A1A1A]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {!activePost ? (
        /* Blog grid List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group cursor-pointer border border-stone-200 hover:border-[#1A1A1A] p-5 flex flex-col justify-between transition-all duration-300 space-y-4"
            >
              <div className="space-y-4">
                <div className="relative overflow-hidden aspect-[16/10] bg-stone-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-[#1A1A1A] text-white px-2.5 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <div className="flex items-center space-x-4 text-[10px] text-stone-400 font-mono">
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" />{post.date}</span>
                    <span className="flex items-center"><BookOpen className="w-3.5 h-3.5 mr-1" />{post.readTime}</span>
                  </div>
                  <h3 className="font-headline-md text-xl text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-body-md text-xs text-stone-500 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-400">By {post.author.split(" ")[0]}</span>
                <span className="font-label-sm text-[10px] uppercase tracking-widest font-bold text-stone-800 flex items-center group-hover:text-[#C5A059] transition-colors">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Read Single Full Blog Post View */
        <div className="max-w-4xl mx-auto space-y-12 text-left">
          <button
            onClick={() => setActivePost(null)}
            className="flex items-center space-x-2 text-stone-500 hover:text-[#1A1A1A] text-xs font-label-sm uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Design Hub</span>
          </button>

          {/* Featured Image */}
          <div className="aspect-[21/9] bg-stone-100 overflow-hidden border border-stone-200">
            <img
              src={activePost.image}
              alt={activePost.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-bold bg-[#C5A059] text-white px-3 py-1 text-xs">
                {activePost.category}
              </span>
              <h1 className="font-display-lg text-3xl md:text-5xl text-[#1A1A1A] leading-tight">
                {activePost.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-xs text-stone-500 font-mono pt-2">
                <span className="flex items-center"><User className="w-4 h-4 mr-1.5" />{activePost.author}</span>
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" />{activePost.date}</span>
                <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1.5" />{activePost.readTime}</span>
              </div>
            </div>

            <div className="h-[1px] bg-stone-200" />

            {/* Sharing Bar */}
            <div className="flex items-center justify-between py-2 bg-[#F9F9F9] px-6">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Share Sourcing Report</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleShare(activePost.title)}
                  className="p-1 px-3 bg-white hover:bg-stone-100 border text-stone-700 text-xs font-mono flex items-center space-x-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Get Link</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-1 px-3 bg-white hover:bg-stone-100 border text-stone-700 text-xs font-mono flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

            {/* Markdown simulated Body content */}
            <article className="prose prose-stone max-w-none pt-4">
              <div className="whitespace-pre-line font-body-md text-stone-700 text-sm md:text-base leading-relaxed space-y-6">
                {activePost.content}
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
