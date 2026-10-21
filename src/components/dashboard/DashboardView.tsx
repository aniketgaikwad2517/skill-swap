import React from 'react';
import { useApp } from '../../context/AppContext';
import { calculateMatchScore } from '../../utils/matching';
import { 
  Sparkles, 
  Repeat, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  Bookmark, 
  Plus, 
  Star, 
  Video, 
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  LogOut
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    exchangeRequests, 
    sessions, 
    messages, 
    savedUserIds, 
    setActiveTab, 
    viewUserProfile, 
    openExchangeModal, 
    respondToExchangeRequest,
    setOnboardingOpen,
    logout
  } = useApp();

  if (!currentUser) return null;

  // Profile completion calculation
  let completionScore = 50;
  if (currentUser.teachingSkills.length >= 2) completionScore += 15;
  if (currentUser.learningSkills.length >= 2) completionScore += 15;
  if (currentUser.bio && currentUser.bio.length > 30) completionScore += 10;
  if (currentUser.education || currentUser.companyOrSchool) completionScore += 10;

  // Compute matches for current user
  const peerMatches = allUsers
    .filter(u => u.id !== currentUser.id)
    .map(peer => calculateMatchScore(currentUser, peer))
    .sort((a, b) => b.totalScore - a.totalScore);

  // Incoming pending requests
  const incomingRequests = exchangeRequests.filter(
    r => r.receiverId === currentUser.id && r.status === 'Pending'
  );

  // Upcoming sessions
  const upcomingSessions = sessions.filter(
    s => (s.hostId === currentUser.id || s.guestId === currentUser.id) && s.status === 'Upcoming'
  );

  // Saved profiles
  const savedUsers = allUsers.filter(u => savedUserIds.includes(u.id));

  // Time-of-day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-violet-900/40 via-[#131627] to-cyan-950/30 border border-violet-500/20 shadow-card-dark relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {currentUser.isPro ? 'SkillSwap Pro Member' : 'Free Learning Tier'}
            </div>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 text-xs font-medium transition-colors"
              title="Log out of SkillSwap"
            >
              <LogOut className="w-3 h-3 text-rose-400" />
              <span>Log Out</span>
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {greeting}, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            You have <strong className="text-cyan-400">{peerMatches.filter(m => m.isReciprocal).length} reciprocal matches</strong> ready to swap skills with you this week.
          </p>
        </div>

        {/* Profile Completion Meter */}
        <div className="p-4 rounded-2xl bg-[#0E111D]/80 border border-white/10 shrink-0 w-full md:w-72 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">Profile Strength</span>
            <span className="text-cyan-400 font-mono font-bold">{completionScore}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${completionScore}%` }}
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              {completionScore < 100 ? 'Add more skills & bio details' : 'All sections completed!'}
            </span>
            <button
              onClick={() => setOnboardingOpen(true)}
              className="text-[11px] font-bold text-violet-400 hover:text-violet-300"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Completed Swaps', val: currentUser.completedSwapsCount || 0, icon: Repeat, color: 'text-violet-400' },
          { label: 'Community Rating', val: `⭐ ${currentUser.rating.toFixed(1)}`, icon: Star, color: 'text-amber-400' },
          { label: 'Upcoming Sessions', val: upcomingSessions.length, icon: Calendar, color: 'text-cyan-400' },
          { label: 'Saved Mentors', val: savedUserIds.length, icon: Bookmark, color: 'text-emerald-400' },
        ].map((k, i) => {
          const IconC = k.icon;
          return (
            <div key={i} className="bg-[#121524] rounded-2xl p-5 border border-white/[0.08] flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium">{k.label}</p>
                <p className="text-xl sm:text-2xl font-black text-white mt-1">{k.val}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <IconC className={`w-5 h-5 ${k.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Teaching vs Learning Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skills I Can Teach */}
        <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Skills I Can Teach</h3>
                <p className="text-[11px] text-slate-400">What you offer to the exchange pool</p>
              </div>
            </div>
            <button
              onClick={() => setOnboardingOpen(true)}
              className="py-1 px-3 rounded-lg text-xs font-semibold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Manage
            </button>
          </div>

          <div className="space-y-2.5">
            {currentUser.teachingSkills.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No teaching skills added yet.</p>
            ) : (
              currentUser.teachingSkills.map(skill => (
                <div key={skill.id} className="p-3.5 rounded-2xl bg-[#16192B] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{skill.description || skill.category}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {skill.endorsementsCount || 0} endorsements
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                <Repeat className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Skills I Want to Learn</h3>
                <p className="text-[11px] text-slate-400">Topics you are actively looking to master</p>
              </div>
            </div>
            <button
              onClick={() => setOnboardingOpen(true)}
              className="py-1 px-3 rounded-lg text-xs font-semibold text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Manage
            </button>
          </div>

          <div className="space-y-2.5">
            {currentUser.learningSkills.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No learning goals added yet.</p>
            ) : (
              currentUser.learningSkills.map(skill => (
                <div key={skill.id} className="p-3.5 rounded-2xl bg-[#16192B] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-violet-500/20 text-violet-300 font-semibold border border-violet-500/30">
                        Wishlist
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{skill.description || 'Target skill goal'}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('discovery')}
                    className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    Find Teachers
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* RECOMMENDED SKILL MATCHES */}
      <div className="bg-[#121524] rounded-3xl p-6 sm:p-7 border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h3 className="text-lg font-bold text-white">Recommended Skill Matches</h3>
            </div>
            <p className="text-xs text-slate-400">
              Matched algorithmically by reciprocal skill overlap, availability, and preferred formats
            </p>
          </div>
          <button
            onClick={() => setActiveTab('discovery')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore all members</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {peerMatches.slice(0, 3).map(match => {
            const peer = match.targetUser;
            return (
              <div 
                key={peer.id} 
                className="bg-[#16192B] rounded-2xl p-5 border border-white/[0.06] hover:border-violet-500/40 hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={peer.avatar} 
                        alt={peer.name} 
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/30 cursor-pointer"
                        onClick={() => viewUserProfile(peer)}
                      />
                      <div>
                        <h4 
                          onClick={() => viewUserProfile(peer)}
                          className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors"
                        >
                          {peer.name}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{peer.headline}</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 shrink-0">
                      {match.totalScore}%
                    </span>
                  </div>

                  {/* Match Explanation pill */}
                  <div className="mt-4 p-3 rounded-xl bg-violet-950/30 border border-violet-500/20">
                    <p className="text-xs text-violet-200 leading-relaxed font-medium">
                      {match.explanation}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-4 space-y-2">
                    <div className="text-[11px] text-slate-300">
                      <span className="text-cyan-400 font-semibold">Teaches: </span>
                      {peer.teachingSkills.map(s => s.name).join(', ')}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      <span className="text-violet-400 font-semibold">Wants: </span>
                      {peer.learningSkills.map(s => s.name).join(', ')}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center gap-2">
                  <button
                    onClick={() => viewUserProfile(peer)}
                    className="flex-1 py-2 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-center"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openExchangeModal(peer)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-sm transition-all text-center flex items-center justify-center gap-1"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    Request Swap
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Incoming Requests & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Incoming Exchange Requests */}
        <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Incoming Requests</span>
              {incomingRequests.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-violet-600 text-white">
                  {incomingRequests.length}
                </span>
              )}
            </h3>
            <button
              onClick={() => setActiveTab('requests')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              View all ({exchangeRequests.length})
            </button>
          </div>

          <div className="space-y-3">
            {incomingRequests.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-slate-400">No incoming pending requests right now.</p>
                <button
                  onClick={() => setActiveTab('discovery')}
                  className="text-xs font-bold text-cyan-400 hover:underline"
                >
                  Explore members to send out requests →
                </button>
              </div>
            ) : (
              incomingRequests.map(req => (
                <div key={req.id} className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.06] space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={req.senderAvatar} alt={req.senderName} className="w-10 h-10 rounded-xl object-cover ring-1 ring-violet-500/40" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{req.senderName}</h4>
                        <p className="text-[11px] text-slate-400">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Pending
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-slate-300 space-y-1">
                    <p>
                      <strong className="text-cyan-400">They Teach:</strong> {req.offeredSkill}
                    </p>
                    <p>
                      <strong className="text-violet-400">They Want:</strong> {req.wantedSkill}
                    </p>
                    <p className="text-slate-400 text-[11px] pt-1 italic line-clamp-2">
                      &ldquo;{req.personalMessage}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => respondToExchangeRequest(req.id, 'Accepted')}
                      className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 transition-all text-center"
                    >
                      Accept Swap
                    </button>
                    <button
                      onClick={() => respondToExchangeRequest(req.id, 'Declined')}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Learning Sessions */}
        <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Upcoming Learning Sessions</span>
            </h3>
            <button
              onClick={() => setActiveTab('messages')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Session Manager
            </button>
          </div>

          <div className="space-y-3">
            {upcomingSessions.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-slate-400">No upcoming sessions scheduled.</p>
                <p className="text-[11px] text-slate-500">
                  Accept an exchange request or schedule a time in direct messages.
                </p>
              </div>
            ) : (
              upcomingSessions.map(sess => (
                <div key={sess.id} className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.06] space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{sess.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        With <strong className="text-slate-200">{sess.hostId === currentUser.id ? sess.guestName : sess.hostName}</strong>
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {sess.durationMinutes} min
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>
                      {new Date(sess.scheduledAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
                      at {new Date(sess.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({sess.timezone})
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/[0.04]">
                    <a
                      href={sess.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 transition-all flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Join Meeting Link
                    </a>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Open Chat
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
