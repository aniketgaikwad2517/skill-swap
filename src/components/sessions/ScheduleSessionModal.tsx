import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, Video, Sparkles, Check } from 'lucide-react';

export const ScheduleSessionModal: React.FC = () => {
  const { 
    scheduleSessionTarget, 
    closeScheduleSessionModal, 
    currentUser, 
    scheduleSession 
  } = useApp();

  const targetUser = scheduleSessionTarget?.user;
  const request = scheduleSessionTarget?.request;

  const [title, setTitle] = useState(
    request ? `${request.offeredSkill} ⇄ ${request.wantedSkill} Peer Swap` : 'SkillSwap 1-on-1 Learning Session'
  );
  const [skillTeaching, setSkillTeaching] = useState(
    request?.offeredSkill || currentUser?.teachingSkills[0]?.name || 'Engineering'
  );
  const [skillLearning, setSkillLearning] = useState(
    request?.wantedSkill || targetUser?.teachingSkills[0]?.name || 'UI/UX Design'
  );
  
  // Default date: 2 days from now at 17:00
  const defaultDate = new Date(Date.now() + 2 * 24 * 3600 * 1000);
  defaultDate.setHours(17, 0, 0, 0);
  const [scheduledAt, setScheduledAt] = useState(defaultDate.toISOString().slice(0, 16));
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [notes, setNotes] = useState('Bring specific questions, links to code/design files, and prepare learning goals.');

  if (!scheduleSessionTarget || !targetUser || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleSession(
      targetUser.id,
      title,
      skillTeaching,
      skillLearning,
      new Date(scheduledAt).toISOString(),
      durationMinutes,
      notes,
      request?.id
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#0E111C] border border-white/10 p-6 sm:p-7 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeScheduleSessionModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Schedule Learning Session</h3>
            <p className="text-xs text-slate-400">Lock in a calendar slot with {targetUser.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Session Title */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Session Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Date & Time Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Date & Time ({currentUser.timezone.split(' ')[0]})
              </label>
              <input
                type="datetime-local"
                required
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Duration
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes (Recommended)</option>
                <option value={60}>60 Minutes (Deep Dive)</option>
                <option value={90}>90 Minutes (Workshop)</option>
              </select>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">You Are Teaching</label>
              <input
                type="text"
                value={skillTeaching}
                onChange={(e) => setSkillTeaching(e.target.value)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">You Are Learning</label>
              <input
                type="text"
                value={skillLearning}
                onChange={(e) => setSkillLearning(e.target.value)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Agenda & Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Agenda & Preparation Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What files, repos, or questions should be prepared..."
              className="w-full bg-[#161928] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Auto meeting link notice */}
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center gap-2.5 text-xs text-cyan-200">
            <Video className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>A dedicated encrypted SkillSwap video room link will be automatically generated.</span>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeScheduleSessionModal}
              className="py-2.5 px-4 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 shadow-glow-cyan flex items-center gap-1.5 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              Confirm & Generate Link
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
