import React from 'react';
import { Layout, Bell, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-lg border border-white/10 p-3 rounded-2xl shadow-2xl">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="bg-[#6366f1] p-2 rounded-lg">
            <Layout className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Trello<span className="text-[#6366f1] text-2xl">.</span></span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-xl w-96">
          <Search className="text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search boards..." 
            className="bg-transparent border-none outline-none px-3 text-sm w-full text-white"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <Bell size={20} className="text-gray-400" />
          <div className="w-8 h-8 bg-gradient-to-tr from-[#6366f1] to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
            TM
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;