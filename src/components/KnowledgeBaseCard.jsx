import React from 'react';
import { MoreVertical, Calendar, ArrowUpRight } from 'lucide-react';

const KnowledgeBaseCard = ({ title, date, desc }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between min-h-[200px] h-full hover:-translate-y-2 hover:border-primary/20 active:scale-[0.98] cursor-pointer">
      {/* Decorative Blur Background (Animating on Hover) */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 group-hover:scale-150 transition-all duration-700 pointer-events-none"></div>
      
      <div className="flex flex-col flex-1 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-8">
            <h3 className="font-extrabold text-gray-900 text-base sm:text-xl leading-[1.2] group-hover:text-primary transition-colors duration-400 font-inter">
              {title}
            </h3>
          </div>
          <div className="flex items-center space-x-1">
             <button className="shrink-0 text-gray-300 hover:text-gray-900 hover:bg-gray-100 p-2.5 rounded-2xl transition-all active:scale-90 group/btn relative">
              <MoreVertical className="w-5 h-5 transition-transform group-hover/btn:rotate-90 duration-300" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-500 text-[13px] sm:text-[14px] leading-relaxed line-clamp-3 font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          {desc}
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between relative z-10 bg-gradient-to-t from-white via-white/50 to-transparent">
        <div className="flex items-center space-x-2.5 text-gray-400 group/date">
           <Calendar className="w-4 h-4 opacity-50 group-hover/date:text-primary transition-colors duration-300" />
           <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest group-hover/date:text-gray-600 transition-colors">
             {date}
           </span>
        </div>
        
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-100/50 shadow-sm transition-all group-hover:bg-emerald-100">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
          <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-tighter">Live</span>
          <ArrowUpRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all -ml-1" />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseCard;
