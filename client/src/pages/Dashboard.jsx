import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCard, getCards, updateCard, deleteCard } from '../services/cardService';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from "framer-motion";

// --- Step 1: Column Component ---
const Column = ({ id, status, children, newCardTitle, setNewCardTitle, handleAddCard }) => {
  const { setNodeRef } = useDroppable({ id });
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-[1px] rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 shadow-2xl"
    >
      <div ref={setNodeRef} className="bg-[#0b1220]/90 backdrop-blur-2xl rounded-[31px] p-6 w-80 min-h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-cyan-400 font-black uppercase text-[10px] tracking-[0.3em] opacity-80">{status}</h2>
          <span className="bg-white/5 text-[10px] px-2 py-0.5 rounded-full text-gray-500">{React.Children.count(children)}</span>
        </div>

        <div className="flex-grow flex flex-col gap-4">
          {React.Children.count(children) > 0 ? children : (
            <div className="text-gray-500 text-[11px] text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              No tasks yet 🚀 <br/> 
              <span className="opacity-50">Start building your workflow.</span>
            </div>
          )}
        </div>
        
        {status === 'TO DO' && (
          <div className="mt-6 space-y-3">
            <input 
              className="w-full bg-white/5 border border-white/10 p-3 rounded-2xl text-sm text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600 shadow-inner"
              value={newCardTitle} 
              onChange={(e) => setNewCardTitle(e.target.value)} 
              placeholder="Task name..."
              onKeyDown={(e) => e.key === 'Enter' && handleAddCard()}
            />
            <button 
              onClick={handleAddCard} 
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-[1.02] active:scale-95 text-white font-bold rounded-2xl py-3 transition-all duration-300 shadow-lg shadow-cyan-500/20 w-full text-sm"
            >
              + Create Task
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Step 2: Sortable Task Card Component ---
const SortableCard = ({ card, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card._id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  const handleTitleUpdate = () => {
    if (newTitle.trim() !== card.title) onUpdate(card._id, { title: newTitle });
    setIsEditing(false);
  };

  const pColor = card.priority === 'High' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]' 
               : card.priority === 'Medium' ? 'bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.4)]' 
               : 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]';

  return (
    <div 
      ref={setNodeRef} style={style} 
      className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-4 border border-white/10 hover:shadow-[0_0_25px_rgba(0,255,255,0.15)] hover:ring-1 hover:ring-cyan-400/40 transition-all duration-300 cursor-grab active:cursor-grabbing group mb-1"
    >
      <div className="flex justify-between items-start gap-3">
        <div className={`w-1.5 h-10 rounded-full shrink-0 ${pColor}`} />
        <div {...attributes} {...listeners} className="flex-grow py-1">
          {isEditing ? (
            <input 
              autoFocus className="bg-black/40 text-white border border-cyan-500/50 rounded-lg px-2 py-1 w-full outline-none text-xs"
              value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleTitleUpdate} onKeyDown={(e) => e.key === 'Enter' && handleTitleUpdate()}
            />
          ) : (
            <p onClick={() => setIsEditing(true)} className="text-gray-200 text-[13px] font-semibold tracking-wide leading-relaxed">
              {card.title}
            </p>
          )}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(card._id); }} className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
      
      <div className="flex gap-2 mt-4 ml-4">
        {['Low', 'Medium', 'High'].map((p) => (
          <button
            key={p} onClick={() => onUpdate(card._id, { priority: p })}
            className={`text-[9px] px-2 py-0.5 rounded-full border transition-all ${card.priority === p ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10 shadow-[0_0_8px_rgba(34,211,238,0.2)]' : 'border-white/5 text-gray-500 hover:border-white/20'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Step 3: Main Dashboard Component ---
const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const token = user?.token;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards(token);
        setCards(data);
      } catch (error) { console.error("Fetch error:", error); }
    };
    if (token) fetchCards();
    else navigate('/login');
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload(); 
  };

  const handleAddCard = async () => {
    if (!newCardTitle.trim()) return;
    try {
      const savedCard = await createCard({ title: newCardTitle, status: 'TO DO', priority: 'Low' }, token);
      setCards(prev => [savedCard, ...prev]);
      setNewCardTitle("");
    } catch (error) { console.error("Add error:", error); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Archiving this task. Proceed?")) {
      try {
        await deleteCard(id, token);
        setCards(prev => prev.filter(c => c._id !== id));
      } catch (error) { console.error("Delete error:", error); }
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await updateCard(id, updates, token);
      setCards(prev => prev.map(c => c._id === id ? updated : c));
    } catch (error) { console.error("Update error:", error); }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeCard = cards.find(c => c._id === activeId);

    // Column change logic
    if (activeCard && ['TO DO', 'IN PROGRESS', 'DONE'].includes(overId) && activeCard.status !== overId) {
      handleUpdate(activeId, { status: overId });
      return;
    }

    // Reordering within same column logic
    if (activeId !== overId) {
      setCards((items) => {
        const oldIndex = items.findIndex((i) => i._id === activeId);
        const newIndex = items.findIndex((i) => i._id === overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-[#05080d] text-white font-inter selection:bg-cyan-500/30">
        
        {/* Background Glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-cyan-500/[0.07] blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-purple-500/[0.07] blur-[150px] rounded-full"></div>
        </div>

        {/* Navbar */}
        <nav className="bg-[#0b1220]/60 backdrop-blur-2xl border-b border-white/[0.08] px-10 py-5 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-16">
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-tighter cursor-default">
              ✨ FlowStack<span className="text-white/20 font-light ml-1">Pro</span>
            </h1>
            <div className="relative hidden md:block group">
              <input 
                type="text" placeholder="Search workflow..."
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-2.5 text-sm w-80 focus:w-96 focus:border-cyan-500/40 focus:bg-white/[0.05] outline-none transition-all duration-500 placeholder:text-gray-600"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white/[0.03] px-3 py-1.5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-[12px] font-bold shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <p className="text-xs text-gray-300 font-medium hidden sm:block">{user?.name}</p>
            </div>
            <button onClick={handleLogout} className="bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white px-5 py-2 rounded-2xl text-[11px] font-bold transition-all duration-300 shadow-lg hover:shadow-red-500/20">
              LOGOUT
            </button>
          </div>
        </nav>

        {/* Kanban Board */}
        <div className="p-10 flex flex-wrap gap-10 justify-center xl:justify-start">
          {['TO DO', 'IN PROGRESS', 'DONE'].map((status) => (
            <Column 
              key={status} id={status} status={status} 
              newCardTitle={newCardTitle} setNewCardTitle={setNewCardTitle} handleAddCard={handleAddCard}
            >
              <SortableContext items={filteredCards.filter(c => c.status === status).map(c => c._id)} strategy={verticalListSortingStrategy}>
                <AnimatePresence>
                  {filteredCards.filter(c => c.status === status).map(card => (
                    <motion.div
                      key={card._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SortableCard card={card} onDelete={handleDelete} onUpdate={handleUpdate} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </SortableContext>
            </Column>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default Dashboard;