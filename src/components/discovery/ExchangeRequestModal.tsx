import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Repeat, Clock, Calendar, Sparkles, Send } from 'lucide-react';

export const ExchangeRequestModal: React.FC = () => {
  const { 
    exchangeModalTarget, 
    closeExchangeModal, 
    currentUser, 
    sendExchangeRequest 
  } = useApp();

  const [offeredSkill, setOfferedSkill] = useState<string>(
    currentUser?.teachingSkills[0]?.name || 'Full-Stack Development'
  );
  const [wantedSkill, setWantedSkill] = useState<string>(
    exchangeModalTarget?.teachingSkills[0]?.name || 'Design Systems'
  );
  const [personalMessage, setPersonalMessage] = useState<string>(
    `Hi ${exchangeModalTarget?.name.split(' ')[0]}! I would love to connect for a skill exchange. I can share hands-on tips from my experience in ${currentUser?.teachingSkills[0]?.name || 'engineering'}, and learn ${exchangeModalTarget?.teachingSkills[0]?.name || 'design'} from you!`
  );
  const [suggestedTimes, setSuggestedTimes] = useState<string>('Tuesday 6:00 PM PST or Saturday 11:00 AM PST');
  const [durationMinutes, setDurationMinutes] = useState<number>(45);

  if (!exchangeModalTarget || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendExchangeRequest(
      exchangeModalTarget.id,
      offeredSkill,
      wantedSkill,
      personalMessage,
      suggestedTimes,
      durationMinutes
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#0E111C] border border-white/10 p-6 sm:p-7 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeExchangeModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
            <Repeat className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Send Skill Exchange Request</h3>
            <p className="text-xs text-slate-400">Propose a mutual 1-on-1 knowledge swap</p>
          </div>
        </div>

        {/* Target Profile Brief */}
        <div className="p-3.5 rounded-2xl bg-[#141726] border border-white/[0.06] flex items-center gap-3 mb-5">
          <img 
            src={exchangeModalTarget.avatar} 
            alt={exchangeModalTarget.name} 
            className="w-11 h-11 rounded-xl object-cover ring-1 ring-violet-500/40" 
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">{exchangeModalTarget.name}</h4>
            <p className="text-xs text-slate-400 truncate">{exchangeModalTarget.headline}</p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 shrink-0">
            ⭐ {exchangeModalTarget.rating.toFixed(1)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Skill you will teach */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Skill You Will Teach (Offered)
            </label>
            <select
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {currentUser.teachingSkills.map(s => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.level})
                </option>
              ))}
              <option value="General Engineering & Tech">General Tech & Strategy</option>
            </select>
          </div>

          {/* Skill you want to learn */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Skill You Want To Learn (Wanted)
            </label>
            <select
              value={wantedSkill}
              onChange={(e) => setWantedSkill(e.target.value)}
              className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-400 cursor-pointer"
            >
              {exchangeModalTarget.teachingSkills.map(s => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.level})
                </option>
              ))}
            </select>
          </div>

          {/* Suggested Times */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Suggested Days / Times
              </label>
              <input
                type="text"
                value={suggestedTimes}
                onChange={(e) => setSuggestedTimes(e.target.value)}
                placeholder="e.g. Weekday evenings, Saturday"
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Session Duration
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value={30}>30 Minutes (Quick focus)</option>
                <option value={45}>45 Minutes (Recommended)</option>
                <option value={60}>60 Minutes (Deep dive)</option>
              </select>
            </div>
          </div>

          {/* Personal message */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Personal Note / Project Context
            </label>
            <textarea
              rows={3}
              required
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              placeholder="Explain what specific challenges you're working on and how you can help each other..."
              className="w-full bg-[#161928] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeExchangeModal}
              className="py-2.5 px-4 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-glow-sm flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Send Request
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
