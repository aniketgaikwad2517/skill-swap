import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Save, ShieldCheck } from 'lucide-react';
import { LearningFormat } from '../../types';

export const EditProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { currentUser, updateProfile } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [headline, setHeadline] = useState(currentUser?.headline || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [timezone, setTimezone] = useState(currentUser?.timezone || '');
  const [showLocation, setShowLocation] = useState(currentUser?.showLocation ?? true);
  const [education, setEducation] = useState(currentUser?.education || '');
  const [professionalRole, setProfessionalRole] = useState(currentUser?.professionalRole || '');
  const [companyOrSchool, setCompanyOrSchool] = useState(currentUser?.companyOrSchool || '');
  const [preferredFormat, setPreferredFormat] = useState<LearningFormat>(currentUser?.preferredFormat || 'video');
  const [weeklyHours, setWeeklyHours] = useState(currentUser?.weeklyAvailabilityHours || 5);
  const [languagesStr, setLanguagesStr] = useState(currentUser?.languages.join(', ') || 'English');
  const [learningGoals, setLearningGoals] = useState(currentUser?.learningGoals || '');
  const [visibility, setVisibility] = useState<'public' | 'members-only'>(currentUser?.visibility || 'public');

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      headline,
      bio,
      avatar,
      location,
      timezone,
      showLocation,
      education,
      professionalRole,
      companyOrSchool,
      preferredFormat,
      weeklyAvailabilityHours: weeklyHours,
      languages: languagesStr.split(',').map(l => l.trim()).filter(Boolean),
      learningGoals,
      visibility
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#0E111C] border border-white/10 p-6 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-xl font-bold text-white mb-4">Edit Profile & Privacy Settings</h3>

        <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 max-h-[65vh] pr-2">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Profile Photo URL</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Professional Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#161928] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Timezone</label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Education Background</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. B.S. in Computer Science"
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Company / Organization</label>
              <input
                type="text"
                value={companyOrSchool}
                onChange={(e) => setCompanyOrSchool(e.target.value)}
                placeholder="e.g. Acme Tech Studio"
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Preferred Format</label>
              <select
                value={preferredFormat}
                onChange={(e) => setPreferredFormat(e.target.value as LearningFormat)}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white cursor-pointer"
              >
                <option value="video">Video Call</option>
                <option value="chat">Chat / Async</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Availability (hrs/wk)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Profile Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as 'public' | 'members-only')}
                className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white cursor-pointer"
              >
                <option value="public">Public to Everyone</option>
                <option value="members-only">Members Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Learning Goals</label>
            <textarea
              rows={2}
              value={learningGoals}
              onChange={(e) => setLearningGoals(e.target.value)}
              className="w-full bg-[#161928] border border-white/10 rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-glow-sm flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
