import React from 'react';
import { useApp } from '../../context/AppContext';
import { MatchCalculatorWidget } from './MatchCalculatorWidget';
import { 
  ArrowRight, 
  Sparkles, 
  Repeat, 
  CheckCircle2, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Star, 
  Code, 
  Palette, 
  Briefcase, 
  Globe, 
  TrendingUp, 
  Music, 
  PieChart, 
  Video,
  ExternalLink
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Code,
  Palette,
  Briefcase,
  Globe,
  TrendingUp,
  Music,
  PieChart,
  Video
};

export const LandingPage: React.FC = () => {
  const { 
    setActiveTab, 
    openAuthModal, 
    allUsers, 
    categories, 
    openExchangeModal, 
    isAuthenticated,
    viewUserProfile 
  } = useApp();

  const handleStartSwapping = () => {
    if (isAuthenticated) {
      setActiveTab('discovery');
    } else {
      openAuthModal('signup');
    }
  };

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="w-full relative pt-12 pb-24 md:pt-20 md:pb-32 mesh-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 shadow-glow-sm">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs sm:text-sm font-semibold text-violet-300">
                Your Skills Have Value. Exchange Them.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Learn Something New.{' '}
              <span className="text-gradient-brand block sm:inline">
                Teach What You Know.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Connect with people who have the skills you want and share the knowledge you already possess. Grow together through meaningful, 1-on-1 skill exchanges.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleStartSwapping}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-violet transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Start Swapping</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setActiveTab('discovery')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Skills</span>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Social Proof metrics */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {allUsers.slice(0, 4).map(u => (
                    <img key={u.id} src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-[#090A10]" />
                  ))}
                </div>
                <span><strong>2,800+</strong> active swappers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span><strong>4.95 / 5</strong> average session rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Zero tuition or subscription lock-in</span>
              </div>
            </div>

          </div>

          {/* Interactive Hero Widget: Live Match Preview */}
          <div className="mt-14 lg:mt-16">
            <MatchCalculatorWidget />
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full py-20 bg-[#0B0D16] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Simple 5-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              How SkillSwap Works
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              No money changes hands. Trade your existing expertise for the exact skills you want to master.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                desc: 'Set up your bio, experience, time zone, and preferred learning formats.',
                icon: Users,
                color: 'text-violet-400'
              },
              {
                step: '02',
                title: 'Add Skills You Teach',
                desc: 'List what you know well: code, design, language, growth, or audio.',
                icon: Sparkles,
                color: 'text-purple-400'
              },
              {
                step: '03',
                title: 'Choose Desired Skills',
                desc: 'Specify what you want to learn and your specific goals.',
                icon: CheckCircle2,
                color: 'text-cyan-400'
              },
              {
                step: '04',
                title: 'Match With People',
                desc: 'Our engine identifies high-affinity reciprocal and mentor matches.',
                icon: Repeat,
                color: 'text-blue-400'
              },
              {
                step: '05',
                title: 'Schedule & Swap',
                desc: 'Connect via 1-on-1 video sessions with integrated calendar invites.',
                icon: Calendar,
                color: 'text-emerald-400'
              }
            ].map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div 
                  key={s.step} 
                  className="bg-[#121524] rounded-2xl p-6 border border-white/[0.08] hover:border-violet-500/40 transition-all hover:-translate-y-1 relative group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-600 group-hover:text-violet-400 transition-colors font-mono">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      <IconComp className={`w-5 h-5 ${s.color}`} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* POPULAR SKILL CATEGORIES */}
      <section className="w-full py-20 bg-[#090A10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Explore Marketplace
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Popular Skill Categories
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('discovery')}
              className="mt-4 sm:mt-0 text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              <span>View all categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(cat => {
              const IconComponent = CATEGORY_ICONS[cat.iconName] || Code;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveTab('discovery')}
                  className="bg-[#121522] rounded-2xl p-6 border border-white/[0.08] hover:border-violet-500/50 hover:bg-[#161a2b] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-violet-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {cat.popularSkills.slice(0, 3).map(skill => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FEATURED COMMUNITY MEMBERS */}
      <section className="w-full py-20 bg-[#0B0E18] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Verified Mentors & Swappers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Featured Community Members
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Connect with talented professionals and passionate craftspeople ready to exchange skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allUsers.slice(0, 6).map(member => (
              <div 
                key={member.id}
                className="bg-[#121524] rounded-2xl p-6 border border-white/[0.08] hover:border-violet-500/40 hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top user row */}
                  <div className="flex items-start gap-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-violet-500/30 shrink-0 cursor-pointer"
                      onClick={() => viewUserProfile(member)}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 
                          onClick={() => viewUserProfile(member)}
                          className="text-base font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer truncate"
                        >
                          {member.name}
                        </h4>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          ⭐ {member.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{member.headline}</p>
                      <p className="text-[11px] text-slate-500 mt-1">{member.location}</p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="mt-5 space-y-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Teaches:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.teachingSkills.map(ts => (
                          <span 
                            key={ts.id} 
                            className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-200 border border-cyan-500/20 font-medium"
                          >
                            {ts.name} <span className="text-[10px] text-cyan-400">({ts.level})</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-violet-400 mb-1.5 flex items-center gap-1">
                        <Repeat className="w-3 h-3" />
                        Wants to learn:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.learningSkills.map(ls => (
                          <span 
                            key={ls.id} 
                            className="text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-200 border border-violet-500/20 font-medium"
                          >
                            {ls.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                  <button
                    onClick={() => viewUserProfile(member)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-center"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => openExchangeModal(member)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-sm transition-all text-center flex items-center justify-center gap-1"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    Connect & Swap
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PLATFORM BENEFITS */}
      <section className="w-full py-20 bg-[#090A10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Why Learn Through Exchange
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Transform Your Career Without Tuition Fees
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Learn Without Expensive Courses',
                desc: 'Bootcamps charge thousands for pre-recorded lectures. SkillSwap gives you live, bespoke 1-on-1 human guidance in exchange for your own knowledge.',
                icon: Sparkles,
                border: 'border-violet-500/20'
              },
              {
                title: 'Exchange Real-World Knowledge',
                desc: 'Learn the unwritten heuristics, production secrets, and industry edge cases that never make it into sanitized textbooks.',
                icon: Briefcase,
                border: 'border-cyan-500/20'
              },
              {
                title: 'Build a High-Value Network',
                desc: 'Every swap creates an authentic, mutual relationship with another driven professional across Silicon Valley and global tech hubs.',
                icon: Users,
                border: 'border-indigo-500/20'
              },
              {
                title: 'Develop Practical, Tested Skills',
                desc: 'Teaching reinforces what you know, while hands-on pair sessions help you build tangible portfolio projects with direct feedback.',
                icon: Code,
                border: 'border-emerald-500/20'
              },
              {
                title: 'Meet Like-Minded Creators',
                desc: 'Join a vetted global community of builders, founders, designers, and polymaths committed to continuous mastery.',
                icon: Globe,
                border: 'border-purple-500/20'
              },
              {
                title: 'Zero Pressure & Full Flexibility',
                desc: 'Schedule sessions when it fits your week — whether 30-minute async chat sessions or deep 60-minute video pairings.',
                icon: Calendar,
                border: 'border-blue-500/20'
              }
            ].map(b => {
              const IconC = b.icon;
              return (
                <div key={b.title} className={`bg-[#121522] rounded-2xl p-7 border ${b.border} hover:border-violet-500/50 transition-all`}>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                    <IconC className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SAMPLE TESTIMONIALS (Clearly labeled development preview) */}
      <section className="w-full py-20 bg-[#0B0D16] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Community Reviews (Sample Preview)
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Loved by Engineers, Designers & Founders
            </h2>
            <p className="text-xs text-slate-400 mt-2 italic">
              *Sample testimonials curated during platform development to illustrate real member experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'I exchanged my Python backend knowledge with Elena for Figma auto-layout and component design. Within 3 weeks, I designed and coded my entire startup SaaS without hiring a designer.',
                author: 'Alex Rivera',
                role: 'Senior Software Engineer',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
                skillTrade: 'Python ⇄ Figma UI/UX'
              },
              {
                quote: 'Learning conversational Japanese with Kenji was incredible. In return, I walked him through building an interactive React web app. The mutual accountability makes learning 10x faster than any app.',
                author: 'Sarah Jenkins',
                role: 'VP of Growth',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
                skillTrade: 'Growth Strategy ⇄ Japanese Fluency'
              },
              {
                quote: 'Lucas taught me DaVinci Resolve color grading and studio lighting. I taught him Python video batching scripts. We both gained invaluable production skills without spending a dime on courses.',
                author: 'Marcus Vance',
                role: 'AI Researcher @ MIT',
                avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
                skillTrade: 'Machine Learning ⇄ DaVinci Resolve'
              }
            ].map(t => (
              <div key={t.author} className="bg-[#121524] rounded-2xl p-7 border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover ring-1 ring-violet-500/40" />
                    <div>
                      <h5 className="text-xs font-bold text-white">{t.author}</h5>
                      <p className="text-[10px] text-slate-400">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 font-semibold border border-violet-500/20">
                    {t.skillTrade}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="w-full py-20 bg-gradient-to-b from-[#090A10] via-[#101322] to-[#07080D] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-tr from-violet-900/30 via-[#141829] to-cyan-900/20 border border-violet-500/30 shadow-2xl relative overflow-hidden">
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1.5px] mx-auto mb-6 shadow-glow-violet">
              <div className="w-full h-full bg-[#0E101A] rounded-[14px] flex items-center justify-center">
                <Repeat className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Exchange Your Skills?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mt-4 leading-relaxed">
              Join thousands of driven professionals exchanging design, code, languages, and business strategies.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleStartSwapping}
                className="w-full sm:w-auto px-9 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-violet transition-all transform hover:-translate-y-0.5"
              >
                Create Free Account
              </button>
              <button
                onClick={() => setActiveTab('discovery')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-all"
              >
                Browse All Skills
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-6">
              Instant setup • No credit card required • Public & private profile controls
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
