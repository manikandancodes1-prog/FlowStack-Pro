import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlignLeft, MessageSquare, Tag, Clock } from 'lucide-react';

const Modal = ({ isOpen, onClose, card }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* மங்கலான பின்னணி */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* பாப்-அப் பெட்டி */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#1e293b] border border-white/10 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="mt-1 text-primary"><AlignLeft size={24} /></div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{card?.title}</h2>
                  <p className="text-sm text-gray-500 font-medium">in list <span className="underline cursor-pointer hover:text-primary">To Do</span></p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* இடது பக்கம்: விவரங்கள் */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <div className="flex items-center gap-3 text-gray-300 font-semibold mb-3">
                    <AlignLeft size={18} /> விவரம் (Description)
                  </div>
                  <textarea 
                    placeholder="இந்த வேலையைப் பற்றி விரிவாகச் சேர்க்கவும்..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-gray-300 outline-none focus:border-primary/50 h-32 resize-none transition-all"
                  />
                </div>
              </div>

              {/* வலது பக்கம்: ஆப்ஷன்கள் */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</p>
                <button className="w-full bg-white/5 hover:bg-white/10 p-3 rounded-xl text-sm flex items-center gap-3 transition-all">
                  <Tag size={16} /> Labels
                </button>
                <button className="w-full bg-white/5 hover:bg-white/10 p-3 rounded-xl text-sm flex items-center gap-3 transition-all">
                  <Clock size={16} /> Due Date
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;