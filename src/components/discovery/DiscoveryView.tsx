import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateMatchScore } from '../../utils/matching';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Repeat, 
  Bookmark, 
  Star, 
  CheckCircle2, 
  Check, 
  SlidersHorizontal,
  Globe,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ExperienceLevel, LearningFormat } from '../../types';

export const DiscoveryView: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    categories, 
    savedUserIds, 
    toggleSaveProfile, 
    viewUserProfile, 
    openExchangeModal, 
    openAuthModal,
    isAuthenticated 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [onlyReciprocal, setOnlyReciprocal] = useState<boolean>(false);
  const [onlySaved, setOnlySaved] = useState<boolean>(false);

  // Compute matches and apply multi-faceted filters
  const filteredUsers = useMemo(() => {
    return allUsers
      .filter(u => !currentUser || u.id !== currentUser.id)
      .map(peer => {
        const match = currentUser 
          ? calculateMatchScore(currentUser, peer) 
          : {
              targetUser: peer,
              totalScore: 75,
              isReciprocal: false,
              theyCanTeachYou: peer.teachingSkills,
              youCanTeachThem: peer.learningSkills,
              sharedLanguages: peer.languages,
              formatMatch: true,
              explanation: `Community Match: ${peer.name} teaches ${peer.teachingSkills[0]?.name || 'specialized skills'}.`
            };
        return { peer, match };
      })
      .filter(({ peer, match }) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const nameMatch = peer.name.toLowerCase().includes(q);
          const headlineMatch = peer.headline.toLowerCase().includes(q);
          const teachingMatch = peer.teachingSkills.some(s => s.name.toLowerCase().includes(q));
          const learningMatch = peer.learningSkills.some(s => s.name.toLowerCase().includes(q));
          if (!nameMatch && !headlineMatch && !teachingMatch && !learningMatch) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          const hasCat = peer.teachingSkills.some(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
                         peer.learningSkills.some(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));
          if (!hasCat) return false;
        }

        // Level filter
        if (selectedLevel !== 'all') {
          const hasLevel = peer.teachingSkills.some(s => s.level === selectedLevel);
          if (!hasLevel) return false;
        }

        // Format filter
        if (selectedFormat !== 'all') {
          if (peer.preferredFormat !== selectedFormat && peer.preferredFormat !== 'hybrid') return false;
        }

        // Reciprocal only
        if (onlyReciprocal && !match.isReciprocal) {
          return false;
        }

        // Saved only
        if (onlySaved && !savedUserIds.includes(peer.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.match.totalScore - a.match.totalScore);
  }, [allUsers, currentUser, searchQuery, selectedCategory, selectedLevel, selectedFormat, onlyReciprocal, onlySaved, savedUserIds]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Live Marketplace • {allUsers.length} Active Instructors
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skill Discovery & Matching
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Find peers who can teach you the skills you need and discover who is eager to learn from your experience.
          </p>
        </div>

        {/* Saved Profiles Quick Pill */}
        <button
          onClick={() => setOnlySaved(!onlySaved)}
          className={`self-start md:self-auto px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
            onlySaved 
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-glow-sm' 
              : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-emerald-400 text-emerald-400' : ''}`} />
          <span>Saved Mentors ({savedUserIds.length})</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#121524] rounded-3xl p-5 sm:p-6 border border-white/[0.08] space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill name (Python, Figma, Japanese), mentor name, or keywords..."
            className="w-full bg-[#161928] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap border transition-all ${
              selectedCategory === 'all'
                ? 'bg-violet-600 border-violet-500 text-white shadow-glow-sm'
                : 'bg-white/[0.03] border-white/[0.06] text-slate-300 hover:bg-white/[0.07]'
            }`}
          >
            All Categories
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.name)}
              className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap border transition-all ${
                selectedCategory === c.name
                  ? 'bg-violet-600 border-violet-500 text-white shadow-glow-sm'
                  : 'bg-white/[0.03] border-white/[0.06] text-slate-300 hover:bg-white/[0.07]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Secondary Filters Row: Level, Format, Reciprocal Toggle */}
        <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Level */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Experience:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-[#161928] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="all">Any Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Format */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Format:</span>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="bg-[#161928] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="all">Any Format</option>
                <option value="video">Video Call</option>
                <option value="chat">Chat / Async</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>
          </div>

          {/* Reciprocal Match Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none py-1 px-3 rounded-xl bg-violet-950/40 border border-violet-500/30 text-violet-300 hover:bg-violet-950/60 transition-colors">
            <input
              type="checkbox"
              checked={onlyReciprocal}
              onChange={(e) => setOnlyReciprocal(e.target.checked)}
              className="rounded bg-[#161928] border-white/20 text-violet-600 focus:ring-0 cursor-pointer"
            />
            <Repeat className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">Reciprocal Matches Only</span>
          </label>

        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <p>
          Showing <strong className="text-white">{filteredUsers.length}</strong> matching mentors & learners
        </p>
        {(selectedCategory !== 'all' || selectedLevel !== 'all' || selectedFormat !== 'all' || onlyReciprocal || onlySaved || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSelectedFormat('all');
              setOnlyReciprocal(false);
              setOnlySaved(false);
            }}
            className="text-cyan-400 hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Grid of User Cards */}
      {filteredUsers.length === 0 ? (
        <div className="bg-[#121524] rounded-3xl p-12 text-center border border-white/[0.08] space-y-3">
          <SlidersHorizontal className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No mentors found matching these filters</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search keywords, clearing reciprocal match filters, or selecting &ldquo;All Categories&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setOnlyReciprocal(false);
            }}
            className="mt-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(({ peer, match }) => {
            const isSaved = savedUserIds.includes(peer.id);

            return (
              <div
                key={peer.id}
                className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] hover:border-violet-500/40 hover:shadow-card-hover transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Glow accent */}
                {match.isReciprocal && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
                )}

                <div>
                  {/* Card Header: Avatar, Name, Bookmark, Score */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img 
                        src={peer.avatar} 
                        alt={peer.name} 
                        onClick={() => viewUserProfile(peer)}
                        className="w-13 h-13 rounded-2xl object-cover ring-2 ring-violet-500/30 cursor-pointer shrink-0" 
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 
                            onClick={() => viewUserProfile(peer)}
                            className="text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer truncate"
                          >
                            {peer.name}
                          </h3>
                          {peer.isPro && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              PRO
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate">{peer.headline}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                          <span>{peer.location}</span>
                          <span>•</span>
                          <span className="text-amber-400 font-semibold">⭐ {peer.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => toggleSaveProfile(peer.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                        aria-label="Bookmark profile"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'text-emerald-400 fill-emerald-400' : ''}`} />
                      </button>

                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                        {match.totalScore}%
                      </span>
                    </div>
                  </div>

                  {/* Match Explanation */}
                  <div className={`mt-4 p-3 rounded-xl border text-xs leading-relaxed ${
                    match.isReciprocal 
                      ? 'bg-violet-950/40 border-violet-500/30 text-violet-200' 
                      : 'bg-white/[0.02] border-white/[0.05] text-slate-300'
                  }`}>
                    <p className="font-medium">{match.explanation}</p>
                  </div>

                  {/* Skills Offered */}
                  <div className="mt-4 space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Teaches:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {peer.teachingSkills.map(ts => (
                        <span 
                          key={ts.id} 
                          className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-200 border border-cyan-500/20 font-medium"
                        >
                          {ts.name} <span className="text-[10px] text-cyan-400">({ts.level})</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills Wanted */}
                  <div className="mt-3 space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1">
                      <Repeat className="w-3 h-3" />
                      Wants to Learn:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {peer.learningSkills.map(ls => (
                        <span 
                          key={ls.id} 
                          className="text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-200 border border-violet-500/20 font-medium"
                        >
                          {ls.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta specs: Availability & Format */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {peer.weeklyAvailabilityHours} hrs/wk
                    </span>
                    <span className="capitalize">{peer.preferredFormat} sessions</span>
                    <span className="truncate max-w-[100px]">{peer.languages[0]}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center gap-2">
                  <button
                    onClick={() => viewUserProfile(peer)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-center"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        openExchangeModal(peer);
                      } else {
                        openAuthModal('signup');
                      }
                    }}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-sm transition-all text-center flex items-center justify-center gap-1"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    Request Swap
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
