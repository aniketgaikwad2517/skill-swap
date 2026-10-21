import React from 'react';
import { useApp } from '../../context/AppContext';
import { Repeat, Heart, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, openAuthModal, isAuthenticated } = useApp();

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#07080D] pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-violet-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.07]">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1.5px] shadow-glow-violet">
                <div className="w-full h-full bg-[#0E101A] rounded-[10px] flex items-center justify-center">
                  <Repeat className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Skill<span className="text-gradient-brand">Swap</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier social learning and peer skill-exchange platform. Share what you know, master what you don&apos;t, and accelerate your career through collaborative 1-on-1 exchanges.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Matching Engine v2.4
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Verified Mentors
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => setActiveTab('discovery')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  Skill Marketplace
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('landing')} 
                  className="hover:text-cyan-400 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('community')} 
                  className="hover:text-cyan-400 transition-colors"
                >
                  Community Articles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('pricing')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-amber-300/90 hover:text-amber-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  SkillSwap Pro
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => setActiveTab('discovery')} 
                  className="hover:text-violet-400 transition-colors"
                >
                  Programming & Tech
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('discovery')} 
                  className="hover:text-violet-400 transition-colors"
                >
                  UI/UX & Product Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('discovery')} 
                  className="hover:text-violet-400 transition-colors"
                >
                  B2B Growth & Marketing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('discovery')} 
                  className="hover:text-violet-400 transition-colors"
                >
                  Language & Fluency
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('discovery')} 
                  className="hover:text-violet-400 transition-colors"
                >
                  Video & Audio Production
                </button>
              </li>
            </ul>
          </div>

          {/* Action / Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Get Started
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Your skills have value. Start matching with verified peers and swap knowledge today.
            </p>
            {!isAuthenticated ? (
              <button
                onClick={() => openAuthModal('signup')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-sm transition-all"
              >
                Join SkillSwap Free
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('discovery')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 transition-all"
              >
                Find A Match Now
              </button>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkillSwap Inc. Designed for collaborative learning.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Community Guidelines</span>
          </div>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for lifelong learners
          </p>
        </div>
      </div>
    </footer>
  );
};
