import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import KnowledgeBaseCard from './components/KnowledgeBaseCard';
import Pagination from './components/Pagination';
import CreateKnowledgeBaseModal from './components/CreateKnowledgeBaseModal';
import { Search, Plus, Filter, LayoutGrid, List as ListIcon } from 'lucide-react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  
  // State for knowledge bases
  const [knowledgeBases, setKnowledgeBases] = useState([
    { id: 1, title: "HR Policy 2024", date: "14/07/2025", desc: "Standard company human resources guidelines and benefits information for the upcoming fiscal year." },
    { id: 2, title: "Product Specs v2", date: "15/07/2025", desc: "Detailed technical specifications for the core platform architecture and API endpoints." },
    { id: 3, title: "Marketing Assets", date: "16/07/2025", desc: "Brand guidelines, logos, and campaign materials for the Q3 product launch." },
    { id: 4, title: "Onboarding Docs", date: "17/07/2025", desc: "Comprehensive guide for new engineering hires covering repository structure and CI/CD." },
    { id: 5, title: "Security Protocols", date: "18/07/2025", desc: "Updated security compliance requirements and incident response procedures." },
    { id: 6, title: "Customer Feedback", date: "19/07/2025", desc: "Aggregated user feedback from the latest beta testing phase and feature requests." },
  ]);

  // Filter and pagination logic
  const filteredData = useMemo(() => {
    return knowledgeBases.filter(kb => 
      kb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [knowledgeBases, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleCreateNew = (newData) => {
    const newKB = {
      id: Date.now(),
      title: newData.name || "Untitled",
      date: new Date().toLocaleDateString('en-GB'),
      desc: newData.description || "No description provided."
    };
    setKnowledgeBases([newKB, ...knowledgeBases]);
    setModalOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Overlay for mobile sidebar with smooth fade */}
      <div 
        className={`fixed inset-0 bg-navy/40 backdrop-blur-sm z-[45] lg:hidden transition-all duration-300
          ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Header 
        onMenuClick={toggleSidebar} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* Main Content Area */}
      <main className={`transition-all duration-500 min-h-screen flex flex-col pt-[72px] pb-16 
        ${sidebarOpen ? 'lg:pl-[220px]' : 'lg:pl-[220px] ml-0'}`}>
        
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page Title & Toolbar - Entrance Animation */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 opacity-0 animate-fade-in-up">
            <div className="space-y-0.5">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight transition-all duration-300 cursor-default">
                Knowledge Base
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium opacity-80">Manage and organize your data sources</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="relative group w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:translate-x-1">
                  <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter knowledge..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder-gray-600 font-bold hover:border-gray-300"
                />
              </div>
              
              <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1 transition-all">
                <button 
                  onClick={() => setViewType('grid')}
                  className={`p-1.5 rounded-lg transition-all active:scale-95 ${viewType === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewType('list')}
                  className={`p-1.5 rounded-lg transition-all active:scale-95 ${viewType === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => setModalOpen(true)}
                className="flex flex-1 sm:flex-none items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.03] active:scale-[0.97] hover:shadow-primary/30"
              >
                <Plus className="w-4 h-4" />
                <span>Create New</span>
              </button>
            </div>
          </div>

          {/* Cards Grid or List View with Staggered Entrance Animation */}
          {currentData.length > 0 ? (
            <div className={viewType === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6" 
              : "flex flex-col space-y-3"
            }>
              {currentData.map((kb, index) => (
                <div 
                  key={kb.id} 
                  className={`opacity-0 animate-fade-in-up stagger-${(index % 6) + 1}`}
                >
                  {viewType === 'grid' ? (
                    <KnowledgeBaseCard 
                      title={kb.title} 
                      date={kb.date} 
                      desc={kb.desc} 
                    />
                  ) : (
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-primary transition-colors">{kb.title}</h3>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{kb.desc}</p>
                      </div>
                      <div className="flex items-center space-x-6 mt-3 md:mt-0 text-xs font-medium text-gray-400 shrink-0">
                        <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg font-bold border border-emerald-100">Live</span>
                        <span className="hidden sm:inline opacity-60">Created: {kb.date}</span>
                        <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Plus className="w-3.5 h-3.5 rotate-45" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-gray-25/50 rounded-3xl border-2 border-dashed border-gray-100 opacity-0 animate-scale-in">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner transition-transform duration-500 hover:rotate-12">
                <Search className="w-9 h-9 text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-1">No matches found</h3>
              <p className="text-gray-500 text-sm font-medium">Try refining your search terms.</p>
            </div>
          )}
        </div>

        {/* Global Pagination with subtle entry */}
        <div className="opacity-0 animate-fade-in stagger-6" style={{ animationFillMode: 'forwards' }}>
          <Pagination 
            totalRows={filteredData.length} 
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </div>
      </main>

      {/* Create New Modal */}
      <CreateKnowledgeBaseModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateNew}
      />
    </div>
  );
}

export default App;
