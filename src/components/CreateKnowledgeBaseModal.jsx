import React, { useState } from 'react';
import { X, ChevronDown, CheckCircle, Info } from 'lucide-react';

const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  vectorStore: 'Qrant',
  llmModel: 'text-embedding-ada-002'
};

const CreateKnowledgeBaseModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Instead of useEffect, we'll reset when we submit or discard.
  // We can also reset when the modal is first opened by managing it in the parent
  // but for simplicity here we'll just handle it on close and submit actions.

  const handleClose = () => {
    setFormData(INITIAL_FORM_STATE);
    onClose();
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      onCreate(formData);
      setIsSubmitting(false);
      setFormData(INITIAL_FORM_STATE); // Reset after creation
    }, 600);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-end transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
    >
      {/* Dynamic Overlay */}
      <div 
        className="absolute inset-0 bg-navy/60 backdrop-blur-[3px] transition-all cursor-pointer" 
        onClick={handleClose} 
      />
      
      {/* Responsive Slide-in Panel */}
      <div 
        className={`relative w-full sm:w-[460px] bg-white h-full shadow-2xl flex flex-col transition-transform duration-500 ease-out transform sm:rounded-l-2xl overflow-hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 py-8 border-b border-gray-100 bg-gray-25/50">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              Create New Knowledge <span className="text-primary/10 select-none">Base</span>
            </h2>
            <div className="flex items-center space-x-2 text-[13px] text-gray-500">
              <Info className="w-3.5 h-3.5 text-primary" />
              <p>Quick answers from documents and websites.</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 p-2.5 rounded-2xl transition-all active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-8 scrollbar-none">
          <div className="space-y-2 group">
            <label className="text-[13px] font-bold text-gray-700 tracking-wide uppercase transition-colors group-focus-within:text-primary">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. Company Handbook"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-25 hover:bg-white focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder-gray-400 font-medium"
              />
              <p className="text-[11px] text-gray-400 mt-1.5 ml-1 italic">Knowledge base names cannot be edited later.</p>
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-[13px] font-bold text-gray-700 tracking-wide uppercase transition-colors group-focus-within:text-primary">
              Description
            </label>
            <textarea 
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What kind of data will this contain?"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-25 hover:bg-white focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder-gray-400 resize-none font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 tracking-wide uppercase">
                Vector Store
              </label>
              <div className="relative group/select">
                <select 
                  name="vectorStore"
                  value={formData.vectorStore}
                  onChange={handleChange}
                  className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] bg-gray-50 font-semibold text-gray-700 hover:bg-gray-100 transition-colors focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer"
                >
                  <option value="Qrant">Qrant (Recommended)</option>
                  <option value="Pinecone">Pinecone</option>
                  <option value="Milvus">Milvus</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover/select:text-gray-600 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 tracking-wide uppercase">
                LLM Model
              </label>
              <div className="relative group/select">
                <select 
                  name="llmModel"
                  value={formData.llmModel}
                  onChange={handleChange}
                  className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] bg-gray-50 font-semibold text-gray-700 hover:bg-gray-100 transition-colors focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer"
                >
                  <option value="text-embedding-ada-002">Ada-002 (OpenAI)</option>
                  <option value="titan-embed-v1">Titan-V1 (AWS)</option>
                  <option value="palm-2">PaLM 2 (Google)</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover/select:text-gray-600 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-6 border-t border-gray-50 bg-gray-25/30 flex items-center justify-between">
           <button 
            type="button"
            onClick={handleClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
          >
            Discard
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.name.trim()}
            className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-10 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>{isSubmitting ? 'Processing...' : 'Create base'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateKnowledgeBaseModal;
