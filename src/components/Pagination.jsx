import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from 'lucide-react';

const Pagination = ({ totalRows, rowsPerPage, currentPage, totalPages, onPageChange, onRowsPerPageChange }) => {
  return (
    <div className="fixed bottom-0 right-0 left-0 lg:left-[220px] bg-white border-t border-gray-100 h-16 flex items-center justify-between px-4 sm:px-6 z-[40]">
      {/* Left section: Hide on small mobile if space is tight */}
      <div className="hidden sm:flex items-center space-x-2">
        <span className="text-[13px] font-bold text-gray-700 tracking-tight">{totalRows} <span className="text-gray-400 font-medium ml-1 uppercase text-[11px]">Results Found</span></span>
      </div>

      <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-end sm:space-x-8">
        {/* Rows per page selector - Hidden on small mobile */}
        <div className="hidden md:flex items-center space-x-3 group">
          <span className="text-[12px] font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">Rows per page</span>
          <div className="relative">
            <select 
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              className="appearance-none bg-gray-50 border border-gray-200 pl-4 pr-10 py-1.5 rounded-xl text-[13px] font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer hover:bg-gray-100"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-end sm:space-x-6">
          <div className="flex items-center space-x-1.5">
            <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2.5 py-1 rounded-lg">page <span className="text-primary">{currentPage}</span> <span className="mx-1">/</span> {totalPages}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button 
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 p-1.5 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-90"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 p-1.5 border border-indigo-50 rounded-xl text-indigo-500 hover:text-indigo-800 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-primary hover:bg-primary-dark p-1.5 rounded-xl text-white shadow-lg shadow-primary/30 transition disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            >
              <ChevronRight className="w-4 h-4 font-bold" />
            </button>
            <button 
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 p-1.5 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-90"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
