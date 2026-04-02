import React from 'react';
import { Home, Brain, LayoutGrid, Globe, Monitor, List, Zap, PlusCircle, Repeat, Shield, Book, Key, Building, Plug, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = React.useState('Knowledge Base');

  const sections = [
    {
      title: "MY PROJECTS",
      items: [
        { icon: Home, label: "Agents" },
        { icon: Brain, label: "AI Models" },
        { icon: LayoutGrid, label: "Library" }
      ]
    },
    {
      title: "ORCHESTRATOR",
      items: [
        { icon: Globe, label: "Published" },
        { icon: Monitor, label: "Machines" },
        { icon: List, label: "Queues" },
        { icon: Zap, label: "Triggers" },
        { icon: PlusCircle, label: "Jobs" },
        { icon: Repeat, label: "Executions" },
        { icon: Shield, label: "Vault" }
      ]
    },
    {
      items: [
        { icon: Book, label: "Knowledge Base" },
        { icon: Key, label: "Key Store" }
      ]
    },
    {
      title: "ADMIN",
      items: [
        { icon: Building, label: "Tenant" },
        { icon: Plug, label: "Integrations" }
      ]
    }
  ];

  return (
    <aside 
      className={`fixed top-0 lg:top-[72px] left-0 bottom-0 w-[240px] lg:w-[220px] bg-[#F9FAFB] border-r border-[#E5E7EB] z-[50] transition-transform duration-300 lg:translate-x-0 overflow-y-auto pb-8 no-scrollbar
        ${isOpen ? 'translate-x-0 overflow-hidden' : '-translate-x-full lg:translate-x-0'}`}
    >
      {/* Mobile Close */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#E5E7EB] mb-4">
        <span className="font-bold text-[#1E1B4B]">Menu</span>
        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="py-6 flex flex-col items-start h-full">
        {sections.map((section, sIndex) => (
          <div key={sIndex} className="w-full mb-8 last:mb-0 px-4">
            {section.title && (
              <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 font-inter opacity-70">
                {section.title}
              </h3>
            )}
            <nav className="flex flex-col space-y-1">
              {section.items.map((item, iIndex) => {
                const isActive = activeItem === item.label;
                return (
                  <button
                    key={iIndex}
                    onClick={() => setActiveItem(item.label)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left relative group
                      ${isActive 
                        ? 'bg-[#E0E7FF] text-[#4F46E5] font-bold shadow-sm' 
                        : 'text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-100/50'
                      }`}
                  >
                    {/* Left Border for active item */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-[#4F46E5] rounded-r-lg"></div>
                    )}
                    
                    <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-[#4F46E5]' : 'text-gray-400 transition-colors group-hover:text-gray-600'}`} />
                    <span className={`text-[13px] tracking-tight leading-tight`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
