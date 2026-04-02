import React from 'react';
import { ChevronDown, Search, Bell } from 'lucide-react';

const Header = ({ onMenuClick, searchQuery, setSearchQuery }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 flex justify-center animate-fade-in-up">
      <header className="w-full h-12 bg-[#1E1B4B] rounded-lg flex items-center justify-between px-6 shadow-2xl shadow-[#1E1B4B]/30 border border-white/5 transition-all duration-300">
        {/* Left side: Logo & Dropdown */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2.5 transition-transform hover:scale-[1.05] active:scale-95 group cursor-pointer">
            {/* Custom Logo Recreated from Screenshot */}
            <div className="w-7 h-7 flex items-center justify-center p-0.5 relative">
               <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#4F46E5] fill-[#4F46E5]" xmlns="http://www.w3.org/2000/svg">
                 {/* Circle part */}
                 <circle cx="8" cy="14" r="5" className="fill-[#4F46E5]" />
                 <circle cx="8" cy="14" r="2.5" className="fill-[#1E1B4B]" />
                 {/* Diagonal bar part */}
                 <path d="M12 4L20 20H15L10 8L12 4Z" className="fill-[#4F46E5]" />
               </svg>
            </div>
            <span className="font-extrabold text-white text-[17px] tracking-tight leading-none">Worcspace</span>
          </div>
          
          <button className="flex items-center space-x-1.5 bg-[#2E2A5B] hover:bg-[#3E3A6B] transition-all px-3 py-1.5 rounded-full text-[11px] font-bold text-white shadow-inner">
            <span>Worcspace 1</span>
            <ChevronDown className="w-3 h-3 text-white/60" />
          </button>
        </div>

        {/* Center: Search Bar (Exact Match) */}
        <div className="flex-1 max-w-[400px] mx-4 relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:translate-x-0.5">
            <Search className="h-3.5 w-3.5 text-white/30 group-focus-within:text-white/80 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-12 py-1.5 bg-[#16143D] border border-transparent rounded-lg text-xs leading-5 text-white placeholder-white/30 focus:border-white/10 transition-all outline-none"
            placeholder="Search..."
          />
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none transition-opacity duration-300 group-focus-within:opacity-100 opacity-60">
            <span className="text-[10px] bg-white/10 border border-white/5 px-1.5 py-0.5 rounded text-white/40 font-mono tracking-tighter">⌘K</span>
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center space-x-4">
          <button className="text-white/50 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all active:scale-90">
            <Bell className="w-4 h-4 shadow-sm" />
          </button>
          <div className="relative group">
            <button className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-[13px] hover:ring-4 hover:ring-[#4F46E5]/15 transition-all shadow-lg shadow-[#4F46E5]/20 group-hover:scale-105 active:scale-95 duration-300 overflow-hidden">
              GK
            </button>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1E1B4B] rounded-full group-hover:scale-110 transition-transform shadow-sm"></div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
