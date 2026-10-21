import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Repeat, 
  Search, 
  Bell, 
  MessageSquare, 
  Sparkles, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ShieldAlert, 
  CheckCheck,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    isAuthenticated, 
    activeTab, 
    setActiveTab, 
    navigateTo,
    openAuthModal, 
    logout, 
    notifications, 
    markNotificationRead,
    markAllNotificationsRead,
    exchangeRequests,
    messages
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Unread indicators
  const unreadNotifs = notifications.filter(n => !n.isRead);
  const pendingRequests = exchangeRequests.filter(r => r.receiverId === currentUser?.id && r.status === 'Pending');
  const unreadMessages = messages.filter(m => m.receiverId === currentUser?.id && !m.isRead);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090A10]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick(isAuthenticated ? 'dashboard' : 'landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-cyan-400 p-[1.5px] shadow-glow-violet transition-transform group-hover:scale-105 duration-300">
              <div className="w-full h-full bg-[#0E101A] rounded-[10px] flex items-center justify-center">
                <Repeat className="w-6 h-6 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  Skill<span className="text-gradient-brand">Swap</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide font-medium">
                Peer Knowledge Exchange
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavClick('landing')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'landing' ? 'text-white bg-white/[0.06]' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('discovery')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'discovery' ? 'text-white bg-white/[0.06]' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Explore Skills
                </button>
                <button
                  onClick={() => handleNavClick('community')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'community' ? 'text-white bg-white/[0.06]' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Community
                </button>
                <button
                  onClick={() => handleNavClick('pricing')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'pricing' ? 'text-white bg-white/[0.06]' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Pricing
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' ? 'text-white bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('discovery')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    activeTab === 'discovery' ? 'text-white bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Search className="w-4 h-4 text-cyan-400" />
                  Explore
                </button>
                <button
                  onClick={() => handleNavClick('requests')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium relative transition-colors ${
                    activeTab === 'requests' ? 'text-white bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Requests
                  {pendingRequests.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-violet-600 text-white">
                      {pendingRequests.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('messages')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium relative transition-colors ${
                    activeTab === 'messages' ? 'text-white bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Messages & Sessions
                  {unreadMessages.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-cyan-500 text-black">
                      {unreadMessages.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('community')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'community' ? 'text-white bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Community
                </button>
                <button
                  onClick={() => handleNavClick('pricing')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10 transition-colors ${
                    activeTab === 'pricing' ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30' : ''
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Upgrade Pro
                </button>
                {currentUser?.isAdmin && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-colors ${
                      activeTab === 'admin' ? 'bg-rose-500/20 border border-rose-500/30' : ''
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    Admin
                  </button>
                )}
              </>
            )}
          </nav>

          {/* Right Action Icons & Profile / Auth Buttons */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigateTo('login')}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigateTo('signup')}
                  className="relative group px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-glow-violet transition-all transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center gap-1.5">
                    Get Started Free
                    <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setProfileDropdownOpen(false);
                    }}
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white relative transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadNotifs.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-600 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                        {unreadNotifs.length}
                      </span>
                    )}
                  </button>

                  {/* Dropdown Box */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#121522] border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-violet-400" />
                          <h4 className="text-sm font-bold text-white">Notifications</h4>
                        </div>
                        {unreadNotifs.length > 0 && (
                          <button 
                            onClick={markAllNotificationsRead}
                            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="divide-y divide-white/[0.05] max-h-80 overflow-y-auto mt-2">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-400 py-6 text-center">No notifications yet</p>
                        ) : (
                          notifications.slice(0, 5).map(n => (
                            <div 
                              key={n.id}
                              onClick={() => {
                                markNotificationRead(n.id);
                                if (n.linkTab) setActiveTab(n.linkTab);
                                setNotificationsOpen(false);
                              }}
                              className={`py-3 px-2 rounded-lg cursor-pointer transition-colors ${
                                !n.isRead ? 'bg-violet-500/10' : 'hover:bg-white/[0.03]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-xs font-semibold text-white">{n.title}</p>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 mt-1 line-clamp-2">{n.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages Quick Icon */}
                <button
                  onClick={() => setActiveTab('messages')}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white relative transition-colors hidden sm:flex"
                  aria-label="Direct Messages"
                >
                  <MessageSquare className="w-4 h-4" />
                  {unreadMessages.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-[#090A10]" />
                  )}
                </button>

                {/* Profile Pill & Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(!profileDropdownOpen);
                      setNotificationsOpen(false);
                    }}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                  >
                    <img 
                      src={currentUser?.avatar} 
                      alt={currentUser?.name} 
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-violet-500/50"
                    />
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                        {currentUser?.name.split(' ')[0]}
                        {currentUser?.isPro && (
                          <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                        )}
                      </p>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        ⭐ {currentUser?.rating.toFixed(1)}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Profile Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#121522] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-white/[0.08]">
                        <p className="text-xs font-bold text-white truncate">{currentUser?.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setActiveTab('profile');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/[0.06] flex items-center gap-2 transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-violet-400" />
                          View My Profile
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('requests');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/[0.06] flex items-center gap-2 transition-colors"
                        >
                          <Repeat className="w-3.5 h-3.5 text-cyan-400" />
                          Exchange Requests ({pendingRequests.length})
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('pricing');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-amber-300 hover:bg-amber-500/10 flex items-center gap-2 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          Pro Membership
                        </button>
                        {currentUser?.isAdmin && (
                          <button
                            onClick={() => {
                              setActiveTab('admin');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                          >
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                            Admin Console
                          </button>
                        )}
                      </div>

                      <div className="pt-1 border-t border-white/[0.08]">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-400" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.08] space-y-2 animate-in fade-in duration-200">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06]"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('discovery')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06]"
                >
                  Explore Skills
                </button>
                <button
                  onClick={() => handleNavClick('requests')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06] flex items-center justify-between"
                >
                  <span>Exchange Requests</span>
                  {pendingRequests.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-violet-600 text-white">
                      {pendingRequests.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('messages')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06] flex items-center justify-between"
                >
                  <span>Messages & Sessions</span>
                  {unreadMessages.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-400 text-black">
                      {unreadMessages.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('community')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06]"
                >
                  Community Feed
                </button>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06]"
                >
                  My Profile
                </button>
                <button
                  onClick={() => handleNavClick('pricing')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-amber-300 hover:bg-amber-500/10"
                >
                  SkillSwap Pro
                </button>
                {currentUser?.isAdmin && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-rose-300 hover:bg-rose-500/10"
                  >
                    Admin Console
                  </button>
                )}
                <div className="pt-2 border-t border-white/[0.08]">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('landing')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06]"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('discovery')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06]"
                >
                  Explore Skills
                </button>
                <button
                  onClick={() => handleNavClick('community')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06]"
                >
                  Community
                </button>
                <button
                  onClick={() => handleNavClick('pricing')}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/[0.06]"
                >
                  Pricing
                </button>
                <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
                  <button
                    onClick={() => {
                      navigateTo('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl text-center text-sm font-medium text-slate-200 bg-white/[0.06]"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-glow-violet"
                  >
                    Get Started Free
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
