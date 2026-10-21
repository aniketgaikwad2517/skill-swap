import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Repeat, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const POPULAR_SKILLS = [
  'Python',
  'React & TypeScript',
  'Figma UI/UX',
  'Design Systems',
  'Conversational Japanese',
  'Growth Marketing',
  'Financial Modeling',
  'Video Editing'
];

export const MatchCalculatorWidget: React.FC = () => {
  const { allUsers, openExchangeModal, openAuthModal, isAuthenticated } = useApp();
  const [haveSkill, setHaveSkill] = useState<string>('Python');
  const [wantSkill, setWantSkill] = useState<string>('Figma UI/UX');

  // Find best matching peer for the selected pair
  const matchedPeer = allUsers.find(u => 
    u.teachingSkills.some(s => s.name.toLowerCase().includes(wantSkill.toLowerCase().split(' ')[0])) ||
    u.learningSkills.some(s => s.name.toLowerCase().includes(haveSkill.toLowerCase().split(' ')[0]))
  ) || allUsers[0];

  const isReciprocal = matchedPeer.learningSkills.some(s => 
    s.name.toLowerCase().includes(haveSkill.toLowerCase().split(' ')[0])
  );

  const matchPercent = isReciprocal ? 98 : 88;

  const handleAction = () => {
    if (isAuthenticated) {
      openExchangeModal(matchedPeer);
    } else {
      openAuthModal('signup');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-violet-500/30 via-white/10 to-cyan-500/20 shadow-2xl backdrop-blur-xl">
      <div className="bg-[#0E111C]/90 rounded-[22px] p-6 sm:p-7 border border-white/[0.08]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Live Reciprocal Match Engine</h4>
              <p className="text-[11px] text-slate-400">Simulate your skill exchange compatibility</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {matchPercent}% Match
          </span>
        </div>

        {/* Two Selectors: You Have ⇄ You Want */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
          {/* Have */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              You Can Teach
            </label>
            <div className="relative">
              <select
                value={haveSkill}
                onChange={(e) => setHaveSkill(e.target.value)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer appearance-none"
              >
                {POPULAR_SKILLS.map(skill => (
                  <option key={`have-${skill}`} value={skill} className="bg-[#121522] text-white">
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Want */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              You Want To Learn
            </label>
            <div className="relative">
              <select
                value={wantSkill}
                onChange={(e) => setWantSkill(e.target.value)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-violet-400 transition-colors cursor-pointer appearance-none"
              >
                {POPULAR_SKILLS.filter(s => s !== haveSkill).map(skill => (
                  <option key={`want-${skill}`} value={skill} className="bg-[#121522] text-white">
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Live Match Card Preview */}
        <div className="p-4 rounded-2xl bg-[#141828]/80 border border-white/[0.08] relative overflow-hidden group">
          <div className="flex items-center gap-3.5">
            <img 
              src={matchedPeer.avatar} 
              alt={matchedPeer.name} 
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/40"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h5 className="text-sm font-bold text-white truncate">{matchedPeer.name}</h5>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-violet-500/20 text-violet-300 font-semibold">
                  ⭐ {matchedPeer.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">{matchedPeer.headline}</p>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                Offers: <strong className="text-white">{wantSkill}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Repeat className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <span>
                Wants: <strong className="text-white">{haveSkill}</strong> ({isReciprocal ? 'Direct Match!' : 'Complementary'})
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleAction}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 flex items-center justify-center gap-2 shadow-glow-sm transition-all"
            >
              <span>Connect & Request Swap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-center text-slate-400 mt-4">
          ✨ Over <strong>1,400+ verified members</strong> currently trading skills with 0 tuition fees.
        </p>

      </div>
    </div>
  );
};
