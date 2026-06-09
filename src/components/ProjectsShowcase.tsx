import { useState } from "react";
import { Project, LanguageCode } from "../types";
import { PROJECTS_DATA, TRANSLATIONS } from "../data";
import { MapPin, Calendar, CheckSquare, Award, ArrowRight } from "lucide-react";

interface ProjectsShowcaseProps {
  currentLang: LanguageCode;
}

export default function ProjectsShowcase({ currentLang }: ProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const t = TRANSLATIONS[currentLang];

  const categories = [
    "All",
    "Hotel Projects",
    "Villa Projects",
    "Apartment Projects",
    "Restaurant Projects",
    "Commercial Projects",
  ];

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full space-y-16">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-label-sm text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
          Global Architectural Portfolio
        </span>
        <h1 className="font-display-lg text-4xl md:text-5xl text-[#1A1A1A]">
          Crowning Achievements In Luxury Hospitality & Estates
        </h1>
        <p className="font-body-md text-stone-500 leading-relaxed text-center">
          Explore how Maison Elite combines direct factory scalability with customized CAD detail modeling to satisfy the rigorous guidelines of international architects and boutique developers worldwide.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-[#1A1A1A]/10 pb-4 flex items-center justify-center space-x-6 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveProject(null);
            }}
            className={`whitespace-nowrap font-label-sm text-xs uppercase tracking-widest pb-2 cursor-pointer transition-colors ${
              selectedCategory === cat ? "text-[#C5A059] border-b-2 border-[#C5A059] font-bold" : "text-stone-500 hover:text-[#1A1A1A]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Display Logic */}
      {!activeProject ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group cursor-pointer border border-stone-200 p-6 space-y-6 hover:border-[#1A1A1A] transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[16/10] bg-stone-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-colors duration-300" />
              </div>

              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center text-xs text-stone-500 uppercase tracking-widest font-bold">
                  <span>{project.category}</span>
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" />{project.location}</span>
                </div>
                <h3 className="font-headline-md text-2xl text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors">
                  {project.title}
                </h3>
                <p className="font-body-md text-sm text-stone-500 line-clamp-2">
                  {project.description}
                </p>
                <div className="pt-2 flex items-center space-x-1 text-xs uppercase tracking-widest font-bold text-stone-800 border-b border-[#C5A059] pb-0.5 w-max">
                  <span>Explore Furniture Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Detailed View of Active Project */
        <div className="space-y-12">
          <button
            onClick={() => setActiveProject(null)}
            className="flex items-center space-x-2 text-stone-500 hover:text-[#1A1A1A] text-xs font-label-sm uppercase tracking-widest"
          >
            ← Back to Portfolio Collections
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Gallery / Image Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="aspect-[16/10] bg-stone-50 overflow-hidden border border-stone-200">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {activeProject.gallery && activeProject.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {activeProject.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-[16/10] bg-stone-100 overflow-hidden border">
                      <img src={img} alt="Detail" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Spec / Description details column */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-2">
                <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  {activeProject.category}
                </span>
                <h2 className="font-headline-lg text-3xl md:text-4xl text-[#1A1A1A] leading-tight">
                  {activeProject.title}
                </h2>
                <div className="flex items-center space-x-4 text-xs text-stone-500 font-mono">
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" />{activeProject.location}</span>
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" />{activeProject.timeline}</span>
                </div>
              </div>

              <div className="h-[1px] bg-stone-200" />

              <div className="space-y-4">
                <h4 className="font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] font-bold">
                  Overview & Scope of contract
                </h4>
                <p className="font-body-md text-stone-600 leading-relaxed text-sm">
                  {activeProject.description}
                </p>
              </div>

              {/* Supplied Items */}
              <div className="space-y-3">
                <h4 className="font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] font-bold">
                  Furniture Models Manufactured & Supplied
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono text-stone-700">
                  {activeProject.furnitureSupplied.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckSquare className="w-4 h-4 text-[#C5A059]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements & Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
                <div className="space-y-2">
                  <h4 className="font-label-sm text-xs uppercase tracking-widest text-stone-400 font-bold">
                    Client Directives
                  </h4>
                  <p className="font-body-md text-xs text-[#1A1A1A] leading-relaxed">
                    {activeProject.clientRequirements}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-label-sm text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                    Ultimate Delivery Result
                  </h4>
                  <p className="font-body-md text-xs text-[#1A1A1A] leading-relaxed font-bold">
                    {activeProject.finalResult}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
