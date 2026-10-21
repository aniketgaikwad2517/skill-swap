import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Sparkles, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { currentUser, upgradeToPro, isAuthenticated, openAuthModal } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const handleUpgrade = () => {
    if (!isAuthenticated) {
      openAuthModal('signup');
      return;
    }
    upgradeToPro();
  };

  const proPrice = billingCycle === 'yearly' ? '$11' : '$14';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Transparent, Fair Membership
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Keep Skills Free. Supercharge Your Reach.
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Core skill exchanges are 100% free forever. Upgrade to <strong>SkillSwap Pro</strong> for priority matchmaking, verified instructor badges, and deep calendar integrations.
        </p>

        {/* Monthly / Yearly Switch */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
            Billed Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 rounded-full bg-[#181C2E] border border-white/20 p-1 relative transition-colors cursor-pointer"
            aria-label="Toggle billing interval"
          >
            <div 
              className={`w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
            <span>Billed Annually</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Save 22%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* FREE PLAN */}
        <div className="bg-[#121524] rounded-3xl p-8 border border-white/[0.08] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Community</span>
              <h3 className="text-2xl font-black text-white mt-1">Free Forever</h3>
              <p className="text-xs text-slate-400 mt-1">Everything you need to exchange knowledge and connect with peers.</p>
            </div>

            <div className="pt-2">
              <span className="text-4xl font-black text-white">$0</span>
              <span className="text-xs text-slate-400 ml-1">/ month</span>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              {[
                'Unlimited 1-on-1 skill exchanges',
                'Profile with 3 teaching & 3 learning skills',
                'Smart reciprocal matching score',
                'Direct messaging & chat attachments',
                'Encrypted video room links',
                'Community knowledge feed access'
              ].map(feat => (
                <div key={feat} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={!currentUser?.isPro}
              className="w-full py-3 rounded-xl text-xs font-bold text-slate-300 bg-white/[0.05] border border-white/10"
            >
              {!currentUser?.isPro ? 'Current Plan' : 'Free Tier'}
            </button>
          </div>
        </div>

        {/* PRO PLAN */}
        <div className="bg-gradient-to-b from-[#18152E] via-[#141728] to-[#0E111E] rounded-3xl p-8 border-2 border-violet-500/50 shadow-glow-violet flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
            RECOMMENDED
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Advanced Learner & Mentor</span>
              <h3 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
                <span>SkillSwap Pro</span>
                <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-1">For active builders, power swappers, and verified instructors.</p>
            </div>

            <div className="pt-2">
              <span className="text-4xl font-black text-white">{proPrice}</span>
              <span className="text-xs text-slate-400 ml-1">/ month {billingCycle === 'yearly' ? '(billed yearly)' : ''}</span>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              {[
                'Everything in Free, plus:',
                'Verified Mentor & Pro Gold Badge',
                '3x higher discovery ranking in search',
                'Unlimited teaching & learning skills',
                'Advanced filtering (timezones, seniority, verified reviews)',
                'Priority match notifications for new requests',
                'Google Calendar & Outlook auto-synchronization'
              ].map(feat => (
                <div key={feat} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 font-bold" />
                  <span className={feat.startsWith('Everything') ? 'font-bold text-violet-300' : ''}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleUpgrade}
              className={`w-full py-3.5 rounded-xl text-xs font-bold text-white transition-all shadow-glow-violet ${
                currentUser?.isPro
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500'
              }`}
            >
              {currentUser?.isPro ? '✓ Pro Membership Active' : 'Upgrade to SkillSwap Pro'}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Test mode active: instant toggle without charging real cards.
            </p>
          </div>

        </div>

      </div>

      {/* Feature Comparison Table */}
      <div className="bg-[#121524] rounded-3xl p-6 sm:p-8 border border-white/[0.08] max-w-4xl mx-auto space-y-4">
        <h3 className="text-lg font-bold text-white mb-4">Detailed Plan Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400">
                <th className="py-3 font-semibold">Features</th>
                <th className="py-3 font-semibold text-center w-32">Free</th>
                <th className="py-3 font-semibold text-center w-32 text-violet-400">SkillSwap Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              <tr>
                <td className="py-3.5">Monthly 1-on-1 Swaps</td>
                <td className="py-3.5 text-center font-medium">Unlimited</td>
                <td className="py-3.5 text-center font-bold text-cyan-300">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5">Skills Listed on Profile</td>
                <td className="py-3.5 text-center">Up to 6</td>
                <td className="py-3.5 text-center font-bold text-cyan-300">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5">Search Priority Score</td>
                <td className="py-3.5 text-center">Standard</td>
                <td className="py-3.5 text-center font-bold text-cyan-300">3x Priority Boost</td>
              </tr>
              <tr>
                <td className="py-3.5">Verified Instructor Badge</td>
                <td className="py-3.5 text-center text-slate-500">—</td>
                <td className="py-3.5 text-center font-bold text-amber-400">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3.5">Calendar Auto-Sync</td>
                <td className="py-3.5 text-center text-slate-500">—</td>
                <td className="py-3.5 text-center font-bold text-cyan-300">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3.5">Community Post Publishing</td>
                <td className="py-3.5 text-center">✓ Standard</td>
                <td className="py-3.5 text-center font-bold text-cyan-300">✓ Featured Author</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
