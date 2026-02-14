import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = isLogin ? await loginUser(formData) : await registerUser(formData);

    if (result.success) {
    
      alert(isLogin ? "Login successful!" : "Account created successfully!");
      localStorage.setItem('userInfo', JSON.stringify(result));
      window.location.href = '/';
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent font-inter px-4 relative overflow-hidden">
      {/* Background Glows to match FlowStack Pro */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10"></div>

      <div className="w-full max-w-md relative p-[1px] rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 shadow-2xl">
        <div className="bg-[#0b1220]/90 backdrop-blur-2xl rounded-[31px] p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-tighter mb-2">
              ✨ {isLogin ? 'Welcome Back' : 'Join FlowStack'}
            </h1>
            <p className="text-gray-500 text-sm">Elevate your productivity today.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <input
                type="text" placeholder="Full Name"
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600 shadow-inner"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            )}
            <input
              type="email" placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600 shadow-inner"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password" placeholder="Password"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600 shadow-inner"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-[1.02] active:scale-95 text-white font-bold rounded-2xl py-4 mt-4 transition-all duration-300 shadow-lg shadow-cyan-500/20 text-sm tracking-wide"
            >
              {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 text-xs hover:text-cyan-400 transition-colors tracking-wide"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already a member? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;