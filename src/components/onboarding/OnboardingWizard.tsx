import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Clock, 
  Video, 
  MessageSquare, 
  Users, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { ExperienceLevel, LearningFormat, SkillItem } from '../../types';

export const OnboardingWizard: React.FC = () => {
  const { 
    currentUser, 
    updateProfile, 
    onboardingOpen, 
    setOnboardingOpen, 
    showToast 
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [headline, setHeadline] = useState(currentUser?.headline || 'Full-Stack Developer & Tech Enthusiast');
  const [bio, setBio] = useState(currentUser?.bio || 'Excited to trade skills, connect with industry peers, and learn new creative frameworks.');
  const [location, setLocation] = useState(currentUser?.location || 'San Francisco, CA (PST)');
  const [timezone, setTimezone] = useState(currentUser?.timezone || 'America/Los_Angeles (UTC-7)');
  const [showLocation, setShowLocation] = useState(currentUser?.showLocation ?? true);
  const [education, setEducation] = useState(currentUser?.education || '');
  const [professionalRole, setProfessionalRole] = useState(currentUser?.professionalRole || '');
  const [companyOrSchool, setCompanyOrSchool] = useState(currentUser?.companyOrSchool || '');

  // Skills
  const [teachingSkills, setTeachingSkills] = useState<SkillItem[]>(currentUser?.teachingSkills || [
    {
      id: 'init-t1',
      name: 'Python',
      category: 'Programming & Technology',
      level: 'Advanced',
      yearsOfExperience: 4,
      description: 'FastAPI, scripts, automation.'
    }
  ]);

  const [learningSkills, setLearningSkills] = useState<SkillItem[]>(currentUser?.learningSkills || [
    {
      id: 'init-l1',
      name: 'Figma UI/UX',
      category: 'Design & Creativity',
      level: 'Beginner',
      description: 'Wireframes, auto-layout, design tokens.'
    }
  ]);

  // Skill Add Drafts
  const [newTeachName, setNewTeachName] = useState('');
  const [newTeachLevel, setNewTeachLevel] = useState<ExperienceLevel>('Intermediate');
  const [newTeachCat, setNewTeachCat] = useState('Programming & Technology');

  const [newLearnName, setNewLearnName] = useState('');
  const [newLearnCat, setNewLearnCat] = useState('Design & Creativity');

  // Preferences
  const [preferredFormat, setPreferredFormat] = useState<LearningFormat>(currentUser?.preferredFormat || 'video');
  const [weeklyHours, setWeeklyHours] = useState<number>(currentUser?.weeklyAvailabilityHours || 4);
  const [languages, setLanguages] = useState<string>(currentUser?.languages.join(', ') || 'English (Native)');
  const [learningGoals, setLearningGoals] = useState<string>(
    currentUser?.learningGoals || 'I want to build my indie project and practice with experienced mentors.'
  );

  if (!onboardingOpen) return null;

  const handleAddTeaching = () => {
    if (!newTeachName.trim()) return;
    const item: SkillItem = {
      id: `ts-${Date.now()}`,
      name: newTeachName.trim(),
      category: newTeachCat,
      level: newTeachLevel,
      endorsementsCount: 0
    };
    setTeachingSkills([...teachingSkills, item]);
    setNewTeachName('');
  };

  const handleAddLearning = () => {
    if (!newLearnName.trim()) return;
    const item: SkillItem = {
      id: `ls-${Date.now()}`,
      name: newLearnName.trim(),
      category: newLearnCat,
      level: 'Beginner'
    };
    setLearningSkills([...learningSkills, item]);
    setNewLearnName('');
  };

  const handleFinish = () => {
    updateProfile({
      headline,
      bio,
      location,
      timezone,
      showLocation,
      education,
      professionalRole,
      companyOrSchool,
      teachingSkills,
      learningSkills,
      preferredFormat,
      weeklyAvailabilityHours: weeklyHours,
      languages: languages.split(',').map(l => l.trim()).filter(Boolean),
      learningGoals
    });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback if canvas not available
    }

    setOnboardingOpen(false);
    showToast('🚀 Profile Setup Complete!', 'Your skills are now visible to matching peers worldwide.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#0E111C] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col justify-between overflow-hidden">
        
        {/* Glow accents */}
        <div className="absolute top-0 right-1/4 w-64 h-32 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Stepper */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-violet-600/20 text-violet-400 font-mono text-xs font-bold flex items-center justify-center border border-violet-500/30">
                {step}/4
              </span>
              <h3 className="text-sm font-bold text-white">
                {step === 1 && 'Step 1: Profile & Identity'}
                {step === 2 && 'Step 2: Skills You Can Teach'}
                {step === 3 && 'Step 3: Skills You Want to Learn'}
                {step === 4 && 'Step 4: Format & Availability'}
              </h3>
            </div>
            
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map(s => (
                <div 
                  key={s} 
                  className={`w-8 h-1.5 rounded-full transition-all ${
                    s <= step ? 'bg-gradient-to-r from-violet-500 to-cyan-400' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="py-6 overflow-y-auto space-y-4 max-h-[58vh] pr-1">
          
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Senior Software Engineer • UI/UX Enthusiast"
                  className="w-full bg-[#141726] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Short Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Introduce yourself and explain why you love exchanging skills..."
                  className="w-full bg-[#141726] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full bg-[#141726] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    placeholder="e.g. America/Los_Angeles (PST)"
                    className="w-full bg-[#141726] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="showLocation"
                  checked={showLocation}
                  onChange={(e) => setShowLocation(e.target.checked)}
                  className="rounded bg-[#141726] border-white/20 text-violet-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="showLocation" className="text-xs text-slate-400 cursor-pointer">
                  Show my general location on my public profile card
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Company or Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyOrSchool}
                    onChange={(e) => setCompanyOrSchool(e.target.value)}
                    placeholder="e.g. Acme Corp or Stanford"
                    className="w-full bg-[#141726] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Role / Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={professionalRole}
                    onChange={(e) => setProfessionalRole(e.target.value)}
                    placeholder="e.g. Full-Stack Developer"
                    className="w-full bg-[#141726] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Teaching Skills */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-slate-400">
                What skills do you feel confident teaching or mentoring others in? (Add at least 1)
              </p>

              {/* Add form */}
              <div className="p-4 rounded-2xl bg-[#141726] border border-white/[0.08] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Skill Name</label>
                    <input
                      type="text"
                      value={newTeachName}
                      onChange={(e) => setNewTeachName(e.target.value)}
                      placeholder="e.g. React, Next.js, Figma, Japanese..."
                      className="w-full bg-[#1B1E30] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Your Level</label>
                    <select
                      value={newTeachLevel}
                      onChange={(e) => setNewTeachLevel(e.target.value as ExperienceLevel)}
                      className="w-full bg-[#1B1E30] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <select
                    value={newTeachCat}
                    onChange={(e) => setNewTeachCat(e.target.value)}
                    className="bg-[#1B1E30] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="Programming & Technology">Programming & Tech</option>
                    <option value="Design & Creativity">Design & Creativity</option>
                    <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
                    <option value="Communication & Languages">Communication & Languages</option>
                    <option value="Marketing & Social Media">Marketing & Social Media</option>
                    <option value="Music & Performing Arts">Music & Audio</option>
                    <option value="Finance & Personal Development">Finance & Productivity</option>
                    <option value="Photography & Video Editing">Video & Photo Editing</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleAddTeaching}
                    className="py-1.5 px-4 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Skill
                  </button>
                </div>
              </div>

              {/* Current teaching list */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Skills You Offer ({teachingSkills.length})
                </h4>
                {teachingSkills.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <span className="text-xs font-bold text-white mr-2">{s.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/20">
                        {s.level}
                      </span>
                      <span className="text-[10px] text-slate-500 ml-2">{s.category}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTeachingSkills(teachingSkills.filter(x => x.id !== s.id))}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Learning Wishlist */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-slate-400">
                What are you eager to learn? Our matching engine will pair you with mentors who teach these topics.
              </p>

              {/* Add form */}
              <div className="p-4 rounded-2xl bg-[#141726] border border-white/[0.08] space-y-3">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newLearnName}
                    onChange={(e) => setNewLearnName(e.target.value)}
                    placeholder="e.g. Figma UI/UX, Spanish, SEO, DaVinci Resolve..."
                    className="flex-1 bg-[#1B1E30] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddLearning}
                    className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Goal
                  </button>
                </div>
              </div>

              {/* Wishlist list */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Your Learning Wishlist ({learningSkills.length})
                </h4>
                {learningSkills.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <span className="text-xs font-bold text-white mr-2">{s.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 font-semibold border border-violet-500/20">
                        Wishlist
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLearningSkills(learningSkills.filter(x => x.id !== s.id))}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Specific Learning Goals
                </label>
                <textarea
                  rows={2}
                  value={learningGoals}
                  onChange={(e) => setLearningGoals(e.target.value)}
                  placeholder="e.g. Looking to design my SaaS dashboard in Figma and practice conversational speaking."
                  className="w-full bg-[#141726] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Preferences & Availability */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Preferred Exchange Format
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'video', label: 'Video Call', icon: Video },
                    { id: 'chat', label: 'Chat / Async', icon: MessageSquare },
                    { id: 'in-person', label: 'In-Person', icon: Users },
                    { id: 'hybrid', label: 'Hybrid / Flexible', icon: Sparkles },
                  ].map(fmt => {
                    const FmtIcon = fmt.icon;
                    const isSelected = preferredFormat === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setPreferredFormat(fmt.id as LearningFormat)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isSelected 
                            ? 'bg-violet-600/20 border-violet-500 text-white shadow-glow-sm' 
                            : 'bg-[#141726] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <FmtIcon className="w-5 h-5 mx-auto mb-1.5 text-violet-400" />
                        <span className="text-xs font-semibold block">{fmt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Weekly Availability: <strong className="text-cyan-400">{weeklyHours} hours/week</strong>
                </label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 hr/week</span>
                  <span>5 hrs</span>
                  <span>10 hrs</span>
                  <span>20 hrs/week</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Languages Spoken
                </label>
                <input
                  type="text"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  placeholder="e.g. English (Fluent), Spanish (Conversational)"
                  className="w-full bg-[#141726] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-xs text-emerald-200">
                  You are all set! You can always update your skills, schedule, and visibility from your profile settings.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="py-2.5 px-6 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-glow-cyan flex items-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Launch My Profile</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
