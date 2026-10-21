import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Repeat, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { RequestStatus } from '../../types';

export const RequestsView: React.FC = () => {
  const { 
    currentUser, 
    allUsers,
    exchangeRequests, 
    respondToExchangeRequest, 
    setActiveTab, 
    openScheduleSessionModal,
    viewUserProfile 
  } = useApp();

  const [activeTab, setActiveSubTab] = useState<'incoming' | 'outgoing' | 'history'>('incoming');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  if (!currentUser) return null;

  const incoming = exchangeRequests.filter(r => r.receiverId === currentUser.id);
  const outgoing = exchangeRequests.filter(r => r.senderId === currentUser.id);
  const history = exchangeRequests.filter(
    r => (r.receiverId === currentUser.id || r.senderId === currentUser.id) && 
         (r.status === 'Completed' || r.status === 'Declined' || r.status === 'Cancelled')
  );

  const displayedRequests = (
    activeTab === 'incoming' ? incoming : activeTab === 'outgoing' ? outgoing : history
  ).filter(r => (statusFilter === 'all' ? true : r.status === statusFilter));

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25">Pending</span>;
      case 'Accepted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">Accepted</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">Completed</span>;
      case 'Declined':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/25">Declined</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-400 border border-slate-500/25">Cancelled</span>;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-2">
            <Repeat className="w-3.5 h-3.5 text-cyan-400" />
            Exchange Requests Pipeline
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Skill Exchange Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review incoming proposals, track sent offers, and schedule accepted collaborative sessions.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('discovery')}
          className="self-start sm:self-auto py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-glow-sm transition-all"
        >
          Propose New Swap
        </button>
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('incoming')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'incoming' 
                ? 'bg-violet-600 text-white shadow-glow-sm' 
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            Incoming Requests ({incoming.filter(r => r.status === 'Pending').length})
          </button>
          
          <button
            onClick={() => setActiveSubTab('outgoing')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'outgoing' 
                ? 'bg-violet-600 text-white shadow-glow-sm' 
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            Outgoing Requests ({outgoing.length})
          </button>

          <button
            onClick={() => setActiveSubTab('history')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'history' 
                ? 'bg-violet-600 text-white shadow-glow-sm' 
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            History & Completed ({history.length})
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Filter status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#141726] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="all">All States</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Completed">Completed</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Request Cards List */}
      {displayedRequests.length === 0 ? (
        <div className="bg-[#121524] rounded-3xl p-12 text-center border border-white/[0.08] space-y-3">
          <Repeat className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No requests found in this view</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {activeTab === 'incoming' 
              ? 'You have responded to all incoming requests. Discover more peers to expand your network.' 
              : 'You haven\'t sent any proposals matching this filter.'}
          </p>
          <button
            onClick={() => setActiveTab('discovery')}
            className="mt-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 transition-colors"
          >
            Browse Skill Marketplace
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedRequests.map(req => {
            const isSender = req.senderId === currentUser.id;
            const otherUserName = isSender ? req.receiverName : req.senderName;
            const otherUserAvatar = isSender ? req.receiverAvatar : req.senderAvatar;
            const otherUserId = isSender ? req.receiverId : req.senderId;
            const otherUser = allUsers.find(u => u.id === otherUserId);

            return (
              <div 
                key={req.id} 
                className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] hover:border-violet-500/30 transition-all space-y-4"
              >
                {/* Header: Peer info, Date, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <img 
                      src={otherUserAvatar} 
                      alt={otherUserName} 
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-violet-500/30 cursor-pointer"
                      onClick={() => otherUser && viewUserProfile(otherUser)}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 
                          onClick={() => otherUser && viewUserProfile(otherUser)}
                          className="text-base font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors"
                        >
                          {otherUserName}
                        </h3>
                        <span className="text-[10px] text-slate-500">
                          {isSender ? '(Sent by you)' : '(Received by you)'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Submitted on {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(req.status)}
                  </div>
                </div>

                {/* Exchange Details: Skill Offered ⇄ Skill Wanted */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.04]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 block mb-1">
                      {isSender ? 'You Offer to Teach:' : `${otherUserName} Offers to Teach:`}
                    </span>
                    <p className="text-sm font-extrabold text-white">{req.offeredSkill}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.04]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-violet-400 block mb-1">
                      {isSender ? 'You Want to Learn:' : `${otherUserName} Wants to Learn:`}
                    </span>
                    <p className="text-sm font-extrabold text-white">{req.wantedSkill}</p>
                  </div>
                </div>

                {/* Personal Message */}
                <div className="p-4 rounded-2xl bg-[#16192B]/60 border border-white/[0.04] text-xs text-slate-300 leading-relaxed">
                  <p className="font-semibold text-slate-400 mb-1 text-[11px] uppercase tracking-wider">
                    Personal Note:
                  </p>
                  <p className="italic">&ldquo;{req.personalMessage}&rdquo;</p>
                </div>

                {/* Logistics: Times & Duration */}
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      Suggested Times: <strong className="text-slate-200">{req.suggestedTimes}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-violet-400" />
                      Duration: <strong className="text-slate-200">{req.durationMinutes} Minutes</strong>
                    </span>
                  </div>

                  {/* Actions according to status and role */}
                  <div className="flex items-center gap-2">
                    
                    {/* Incoming & Pending */}
                    {!isSender && req.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => respondToExchangeRequest(req.id, 'Declined')}
                          className="py-2 px-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => respondToExchangeRequest(req.id, 'Accepted')}
                          className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-glow-sm flex items-center gap-1 transition-all"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Accept Swap
                        </button>
                      </>
                    )}

                    {/* Outgoing & Pending */}
                    {isSender && req.status === 'Pending' && (
                      <button
                        onClick={() => respondToExchangeRequest(req.id, 'Cancelled')}
                        className="py-2 px-3 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20"
                      >
                        Cancel Proposal
                      </button>
                    )}

                    {/* Accepted */}
                    {req.status === 'Accepted' && (
                      <>
                        <button
                          onClick={() => {
                            if (otherUser) openScheduleSessionModal(otherUser, req);
                          }}
                          className="py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 flex items-center gap-1 transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          Schedule Session
                        </button>
                        <button
                          onClick={() => setActiveTab('messages')}
                          className="py-2 px-3 rounded-xl text-xs font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Chat
                        </button>
                        <button
                          onClick={() => respondToExchangeRequest(req.id, 'Completed')}
                          className="py-2 px-3 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20"
                        >
                          Mark Completed
                        </button>
                      </>
                    )}

                    {/* Completed */}
                    {req.status === 'Completed' && (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed Knowledge Swap
                      </span>
                    )}

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
