import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EditProfileModal } from './EditProfileModal';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Repeat, 
  CheckCircle2, 
  Edit3, 
  Bookmark, 
  Calendar, 
  ShieldCheck,
  Video,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { UserProfile } from '../../types';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    selectedUserProfile, 
    savedUserIds, 
    toggleSaveProfile, 
    openExchangeModal, 
    reviews, 
    setActiveTab 
  } = useApp();

  const [editModalOpen, setEditModalOpen] = useState(false);

  // If viewing selectedUserProfile, show that user, otherwise show currentUser
  const user: UserProfile | null = selectedUserProfile || currentUser;

  if (!user) return null;

  const isOwnProfile = currentUser?.id === user.id;
  const isSaved = savedUserIds.includes(user.id);

  // Filter reviews for this profile
  const userReviews = reviews.filter(r => r.revieweeId === user.id);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner & Header Card */}
      <div className="bg-[#121524] rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl relative">
        
        {/* Cover Gradient */}
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-violet-900/60 via-[#181D33] to-cyan-900/40 relative">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Top Actions on Banner */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {!isOwnProfile && (
              <button
                onClick={() => toggleSaveProfile(user.id)}
                className="p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-white backdrop-blur-md transition-colors"
                aria-label="Save profile"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'text-emerald-400 fill-emerald-400' : ''}`} />
              </button>
            )}

            {isOwnProfile && (
              <button
                onClick={() => setEditModalOpen(true)}
                className="py-2 px-4 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          
          {/* Avatar positioning */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-5">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-[#121524] shadow-2xl bg-[#090A10]" 
              />
              {user.isPro && (
                <div className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-black" />
                  PRO
                </div>
              )}
            </div>

            {/* CTAs for other user's profile */}
            {!isOwnProfile && (
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <button
                  onClick={() => openExchangeModal(user)}
                  className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-glow-violet flex items-center gap-1.5 transition-all"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Request Skill Swap</span>
                </button>
              </div>
            )}
          </div>

          {/* Name & Headline */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user.name}</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {user.rating.toFixed(1)} ({user.reviewsCount} reviews)
              </span>
              <span className="text-xs text-slate-400">
                • {user.completedSwapsCount} completed swaps
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-medium">
              {user.headline}
            </p>

            {/* Location & Timezone info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              {user.showLocation && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {user.location}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {user.timezone}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                {user.languages.join(', ')}
              </span>
              <span className="text-slate-500">Member since {user.memberSince}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-5 pt-5 border-t border-white/[0.06]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About & Background</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {user.bio}
            </p>
          </div>

          {/* Education & Professional History */}
          {(user.education || user.professionalRole || user.companyOrSchool) && (
            <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {user.education && (
                <div className="flex items-center gap-2.5 text-slate-300">
                  <GraduationCap className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>{user.education}</span>
                </div>
              )}
              {(user.professionalRole || user.companyOrSchool) && (
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{user.professionalRole} {user.companyOrSchool ? `at ${user.companyOrSchool}` : ''}</span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Skills Matrix: Teaching & Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skills Offered */}
        <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Skills {user.name.split(' ')[0]} Can Teach</h3>
          </div>

          <div className="space-y-3">
            {user.teachingSkills.map(skill => (
              <div key={skill.id} className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30">
                      {skill.level}
                    </span>
                  </div>
                  {skill.yearsOfExperience && (
                    <span className="text-xs text-slate-400 font-mono">
                      {skill.yearsOfExperience} yrs exp
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{skill.description}</p>
                <div className="text-[11px] text-slate-500 pt-1">
                  ⭐ {skill.endorsementsCount || 0} peer endorsements
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Desired */}
        <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2">
            <Repeat className="w-4 h-4 text-violet-400" />
            <h3 className="text-base font-bold text-white">Skills {user.name.split(' ')[0]} Wants to Learn</h3>
          </div>

          <div className="space-y-3">
            {user.learningSkills.map(skill => (
              <div key={skill.id} className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 font-semibold border border-violet-500/30">
                    Target Goal
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{skill.description}</p>
              </div>
            ))}

            <div className="p-4 rounded-2xl bg-[#16192B]/60 border border-white/[0.04]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Learning Objectives:
              </span>
              <p className="text-xs text-slate-300 italic">
                &ldquo;{user.learningGoals}&rdquo;
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Learning Availability & Preferred Format */}
      <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-1">Preferred Format</span>
          <p className="text-sm font-bold text-white capitalize flex items-center gap-1.5">
            <Video className="w-4 h-4 text-cyan-400" />
            {user.preferredFormat} Sessions
          </p>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-1">Weekly Commitment</span>
          <p className="text-sm font-bold text-white flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-violet-400" />
            ~{user.weeklyAvailabilityHours} hours/week available
          </p>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-1">Typical Slots</span>
          <p className="text-xs text-slate-300">
            {user.availableDays?.join(', ') || 'Flexible Evenings & Weekends'}
          </p>
        </div>
      </div>

      {/* Peer Reviews & Swap Feedback */}
      <div className="bg-[#121524] rounded-3xl p-6 sm:p-7 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <h3 className="text-base font-bold text-white">Verified Peer Reviews ({userReviews.length})</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Rating Average: ⭐ {user.rating.toFixed(1)}
          </span>
        </div>

        {userReviews.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No reviews logged yet.</p>
        ) : (
          <div className="space-y-3">
            {userReviews.map(rev => (
              <div key={rev.id} className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{rev.reviewerName}</h4>
                      <p className="text-[10px] text-slate-500">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic pt-1">&ldquo;{rev.comment}&rdquo;</p>
                <div className="text-[10px] text-cyan-400 font-medium">
                  Skill Exchanged: {rev.skillReviewed}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} />

    </div>
  );
};
