import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";


function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router> 
      {/* Step 1: Premium Color Palette Gradient Background */}
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0c1022] selection:bg-cyan-500/30">
        
        {user ? (
          <>
            {/* குறிப்பு: பழைய <Navbar /> இங்கே தேவையில்லை. 
               ஏனெனில் Dashboard.jsx-ல் புதிய பிரீமியம் நேவிகேஷன் பார் உள்ளது.
            */}
            <Dashboard />
          </>
        ) : (
          /* பயனர் இல்லையென்றால் Auth (Login/Register) பக்கம் காட்டும் */
          <Auth />
        )}

      </div>
    </Router>
  );
}

export default App;