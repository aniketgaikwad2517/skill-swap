import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  Users, 
  Repeat, 
  Trash2, 
  CheckCircle2, 
  Plus, 
  Sparkles, 
  BarChart3, 
  RotateCcw,
  Star,
  Search,
  Check
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    categories, 
    communityPosts, 
    adminModerateUser, 
    adminDeletePost, 
    adminAddCategory, 
    resetAllDemoData,
    exchangeRequests,
    sessions 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'categories' | 'moderation' | 'analytics'>('users');
  const [userSearch, setUserSearch] = useState('');

  // Add category state
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatSkills, setNewCatSkills] = useState('Rust, Zig, Elixir');

  if (!currentUser?.isAdmin) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Administrative Access Restricted</h2>
        <p className="text-sm text-slate-400">
          This portal is reserved for authorized platform administrators.
        </p>
      </div>
    );
  }

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    adminAddCategory(
      newCatName.trim(),
      'Code',
      newCatDesc.trim() || 'Community curated skill category.',
      newCatSkills.split(',').map(s => s.trim()).filter(Boolean)
    );
    setNewCatName('');
    setNewCatDesc('');
  };

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            SkillSwap Administration & Governance
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage users, moderate user-submitted content, update skill taxonomies, and view platform metrics.
          </p>
        </div>

        <button
          onClick={resetAllDemoData}
          className="self-start sm:self-auto py-2 px-3.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Sample Data</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121524] rounded-2xl p-5 border border-white/[0.08]">
          <span className="text-xs text-slate-400 font-medium">Total Registered Members</span>
          <p className="text-2xl font-black text-white mt-1">{allUsers.length + 1}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+18% this month</span>
        </div>

        <div className="bg-[#121524] rounded-2xl p-5 border border-white/[0.08]">
          <span className="text-xs text-slate-400 font-medium">Active Exchange Proposals</span>
          <p className="text-2xl font-black text-white mt-1">{exchangeRequests.length}</p>
          <span className="text-[10px] text-cyan-400 font-semibold">100% peer reciprocity</span>
        </div>

        <div className="bg-[#121524] rounded-2xl p-5 border border-white/[0.08]">
          <span className="text-xs text-slate-400 font-medium">Scheduled Video Sessions</span>
          <p className="text-2xl font-black text-white mt-1">{sessions.length}</p>
          <span className="text-[10px] text-violet-400 font-semibold">98.4% attendance</span>
        </div>

        <div className="bg-[#121524] rounded-2xl p-5 border border-white/[0.08]">
          <span className="text-xs text-slate-400 font-medium">Pro Subscriptions</span>
          <p className="text-2xl font-black text-amber-400 mt-1">
            {allUsers.filter(u => u.isPro).length + (currentUser.isPro ? 1 : 0)}
          </p>
          <span className="text-[10px] text-amber-300 font-semibold">ARR $2,480 (Demo)</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 text-xs">
        {[
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'categories', label: 'Skill Taxonomy', icon: Repeat },
          { id: 'moderation', label: 'Content Moderation', icon: ShieldAlert },
          { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
        ].map(tab => {
          const TabIcon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-2 px-4 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white bg-white/[0.03]'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white">Community Members Directory</h3>
            
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search member name or email..."
                className="w-full bg-[#161928] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] text-slate-400">
                  <th className="py-3 px-3">User</th>
                  <th className="py-3 px-3">Rating</th>
                  <th className="py-3 px-3">Teaching Skills</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-white leading-tight">{u.name}</p>
                          <p className="text-[10px] text-slate-500 leading-tight">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-semibold text-amber-400">⭐ {u.rating.toFixed(1)}</span>
                    </td>

                    <td className="py-3 px-3 max-w-[200px] truncate">
                      {u.teachingSkills.map(s => s.name).join(', ') || 'None added'}
                    </td>

                    <td className="py-3 px-3">
                      {u.isPro ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          PRO
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] text-slate-400 bg-white/[0.04]">
                          Free
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right space-x-1.5">
                      <button
                        onClick={() => adminModerateUser(u.id, 'togglePro')}
                        className="py-1 px-2 rounded-lg text-[10px] font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20"
                      >
                        Toggle Pro
                      </button>
                      <button
                        onClick={() => adminModerateUser(u.id, 'verify')}
                        className="py-1 px-2 rounded-lg text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20"
                      >
                        Verify 5★
                      </button>
                      <button
                        onClick={() => adminModerateUser(u.id, 'remove')}
                        className="py-1 px-2 rounded-lg text-[10px] font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20"
                      >
                        Suspend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SKILL TAXONOMY */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Add Category Form */}
          <div className="md:col-span-5 bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Add Skill Category
            </h3>

            <form onSubmit={handleAddCategorySubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Systems Programming & Embedded"
                  className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Short taxonomy summary..."
                  className="w-full bg-[#161928] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Popular Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={newCatSkills}
                  onChange={(e) => setNewCatSkills(e.target.value)}
                  className="w-full bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-glow-cyan"
              >
                Add Category to Marketplace
              </button>
            </form>
          </div>

          {/* Current Categories List */}
          <div className="md:col-span-7 bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-3">
            <h3 className="text-base font-bold text-white">Active Categories ({categories.length})</h3>
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {categories.map(c => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-[#16192B] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{c.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{c.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {c.popularSkills.slice(0, 3).map(s => (
                        <span key={s} className="text-[9px] px-1.5 py-0.2 rounded bg-white/[0.04] text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0 ml-2">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONTENT MODERATION */}
      {activeTab === 'moderation' && (
        <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
          <h3 className="text-base font-bold text-white">Community Posts Moderation Queue</h3>
          <div className="space-y-3">
            {communityPosts.map(p => (
              <div key={p.id} className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{p.authorName}</span>
                    <span className="text-[10px] text-slate-500">#{p.category}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mt-0.5 truncate">{p.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">{p.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => adminDeletePost(p.id)}
                    className="py-1.5 px-3 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PLATFORM ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
            <h3 className="text-base font-bold text-white">Skill Supply vs Demand</h3>
            <div className="space-y-3 text-xs">
              {[
                { skill: 'Python & Machine Learning', supply: 85, demand: 94 },
                { skill: 'Figma UI/UX & Design Systems', supply: 70, demand: 98 },
                { skill: 'Conversational Japanese', supply: 45, demand: 62 },
                { skill: 'Growth Marketing & Copywriting', supply: 55, demand: 78 },
                { skill: 'DaVinci Resolve Video Editing', supply: 40, demand: 65 },
              ].map(item => (
                <div key={item.skill} className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">{item.skill}</span>
                    <span className="text-slate-400 font-mono">Demand: {item.demand}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex">
                    <div className="h-full bg-cyan-400" style={{ width: `${item.supply}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
            <h3 className="text-base font-bold text-white">System Architecture & Health</h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#16192B]">
                <span>State Synchronization</span>
                <span className="text-emerald-400 font-mono font-bold">100% Synced (LocalStorage)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#16192B]">
                <span>Matching Engine Algorithm</span>
                <span className="text-cyan-400 font-mono font-bold">Weighted Jaccard + Reciprocity v2</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#16192B]">
                <span>Video Call Integration</span>
                <span className="text-violet-400 font-mono font-bold">Auto-generated Encrypted Rooms</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#16192B]">
                <span>Accessibility & Theme</span>
                <span className="text-slate-200 font-mono font-bold">Dark-First Silicon Valley UI</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
