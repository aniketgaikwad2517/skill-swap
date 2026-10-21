import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  Paperclip, 
  Calendar, 
  Video, 
  Search, 
  Check, 
  Clock, 
  Star, 
  MoreVertical, 
  ExternalLink,
  MessageSquare,
  FileText,
  UserCheck,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { UserProfile, LearningSession } from '../../types';

export const MessagingView: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    messages, 
    sendMessage, 
    markConversationAsRead, 
    sessions, 
    updateSessionStatus, 
    submitReview,
    openScheduleSessionModal,
    viewUserProfile 
  } = useApp();

  const [mainTab, setMainTab] = useState<'chat' | 'sessions'>('chat');
  const [selectedUserId, setSelectedUserId] = useState<string>('user-kenji');
  const [messageInput, setMessageInput] = useState<string>('');
  const [searchUser, setSearchUser] = useState<string>('');
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  // Review modal state
  const [reviewingSession, setReviewingSession] = useState<LearningSession | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('Great session! Extremely clear explanations.');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!currentUser) return null;

  // Connected peers (users who have messages with currentUser or are in allUsers)
  const connectedUsers = allUsers.filter(u => u.id !== currentUser.id);

  const selectedUser = allUsers.find(u => u.id === selectedUserId) || connectedUsers[0];

  // Messages between currentUser and selectedUser
  const conversationMessages = messages.filter(
    m => (m.senderId === currentUser.id && m.receiverId === selectedUser?.id) ||
         (m.senderId === selectedUser?.id && m.receiverId === currentUser.id)
  );

  // Auto mark as read
  useEffect(() => {
    if (selectedUser) {
      markConversationAsRead(selectedUser.id);
    }
  }, [selectedUser?.id, messages.length]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages.length, selectedUserId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() && !attachmentName) return;

    sendMessage(selectedUser.id, messageInput, attachmentName || undefined);
    setMessageInput('');
    setAttachmentName(null);
  };

  const handleSimulateAttachment = () => {
    const samples = ['project_spec_v1.pdf', 'starter_code.zip', 'figma_design_system.fig', 'audio_sample.wav'];
    const chosen = samples[Math.floor(Math.random() * samples.length)];
    setAttachmentName(chosen);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingSession) return;

    const revieweeId = reviewingSession.hostId === currentUser.id ? reviewingSession.guestId : reviewingSession.hostId;
    submitReview(
      reviewingSession.id,
      revieweeId,
      reviewRating,
      reviewComment,
      reviewingSession.skillLearning
    );
    setReviewingSession(null);
  };

  // User's sessions
  const userSessions = sessions.filter(
    s => s.hostId === currentUser.id || s.guestId === currentUser.id
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Messages & Learning Sessions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Coordinate with your learning partners, share project files, and manage live video sessions.
          </p>
        </div>

        {/* Tab switch: Chat vs Sessions Agenda */}
        <div className="flex items-center gap-2 bg-[#121524] p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setMainTab('chat')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mainTab === 'chat'
                ? 'bg-violet-600 text-white shadow-glow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Active Messages
          </button>
          <button
            onClick={() => setMainTab('sessions')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mainTab === 'sessions'
                ? 'bg-cyan-600 text-white shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Session Agenda ({userSessions.length})
          </button>
        </div>
      </div>

      {mainTab === 'chat' ? (
        /* CHAT INTERFACE: SPLIT VIEW */
        <div className="bg-[#121524] rounded-3xl border border-white/[0.08] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] shadow-2xl">
          
          {/* LEFT: Conversation List */}
          <div className="md:col-span-4 lg:col-span-4 border-r border-white/[0.08] flex flex-col bg-[#0F1220]">
            
            {/* Search peers */}
            <div className="p-4 border-b border-white/[0.06]">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="Filter conversations..."
                  className="w-full bg-[#161928] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
              {connectedUsers
                .filter(u => u.name.toLowerCase().includes(searchUser.toLowerCase()))
                .map(peer => {
                  const isSelected = selectedUser?.id === peer.id;
                  const peerMessages = messages.filter(
                    m => (m.senderId === peer.id && m.receiverId === currentUser.id) ||
                         (m.senderId === currentUser.id && m.receiverId === peer.id)
                  );
                  const lastMsg = peerMessages[peerMessages.length - 1];
                  const unreadCount = messages.filter(
                    m => m.senderId === peer.id && m.receiverId === currentUser.id && !m.isRead
                  ).length;

                  return (
                    <div
                      key={peer.id}
                      onClick={() => setSelectedUserId(peer.id)}
                      className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-violet-600/15 border-l-4 border-violet-500' 
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img 
                          src={peer.avatar} 
                          alt={peer.name} 
                          className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/10" 
                        />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-black text-[10px] font-extrabold flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white truncate">{peer.name}</h4>
                          {lastMsg && (
                            <span className="text-[10px] text-slate-500 shrink-0">
                              {new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {lastMsg ? lastMsg.content : peer.headline}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT: Active Thread */}
          <div className="md:col-span-8 lg:col-span-8 flex flex-col bg-[#121524]">
            
            {/* Header of Active Thread */}
            {selectedUser && (
              <div className="p-4 px-6 border-b border-white/[0.08] flex items-center justify-between bg-[#141728]">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name} 
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-violet-500/40 cursor-pointer"
                    onClick={() => viewUserProfile(selectedUser)}
                  />
                  <div>
                    <h3 
                      onClick={() => viewUserProfile(selectedUser)}
                      className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors"
                    >
                      {selectedUser.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {selectedUser.headline} • <span className="text-cyan-400">{selectedUser.timezone}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openScheduleSessionModal(selectedUser)}
                    className="py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 shadow-glow-cyan flex items-center gap-1.5 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule Session</span>
                  </button>
                  <button
                    onClick={() => viewUserProfile(selectedUser)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] transition-colors"
                    aria-label="View Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Messages Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[480px]">
              {conversationMessages.length === 0 ? (
                <div className="py-16 text-center space-y-2">
                  <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">No messages exchanged yet with {selectedUser?.name}.</p>
                  <p className="text-[11px] text-slate-500">
                    Send a greeting, propose an agenda, or schedule your first video exchange session.
                  </p>
                </div>
              ) : (
                conversationMessages.map(msg => {
                  const isMine = msg.senderId === currentUser.id;
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      <div 
                        className={`max-w-[78%] rounded-2xl px-4 py-3 text-xs leading-relaxed space-y-1.5 ${
                          isMine 
                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-none shadow-glow-sm' 
                            : 'bg-[#181C2E] border border-white/[0.06] text-slate-200 rounded-bl-none'
                        }`}
                      >
                        <p>{msg.content}</p>

                        {/* Attachment chip */}
                        {msg.attachmentName && (
                          <div className={`flex items-center gap-2 p-2 rounded-xl text-[11px] font-medium border ${
                            isMine ? 'bg-black/20 border-white/20 text-white' : 'bg-black/30 border-white/10 text-cyan-300'
                          }`}>
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{msg.attachmentName}</span>
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-500 mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {isMine && <span className="ml-1 text-slate-400">✓</span>}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Attachment preview pill */}
            {attachmentName && (
              <div className="px-6 py-2 bg-[#16192B] border-t border-white/[0.06] flex items-center justify-between text-xs text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Attached file: <strong>{attachmentName}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setAttachmentName(null)}
                  className="text-slate-400 hover:text-rose-400 text-xs"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/[0.08] bg-[#141728] flex items-center gap-3">
              <button
                type="button"
                onClick={handleSimulateAttachment}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
                title="Attach project asset"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={`Message ${selectedUser?.name}...`}
                className="flex-1 bg-[#1A1E30] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />

              <button
                type="submit"
                disabled={!messageInput.trim() && !attachmentName}
                className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white disabled:opacity-40 shadow-glow-sm transition-all"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>
      ) : (
        /* SESSIONS AGENDA VIEW */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Upcoming Sessions List */}
            <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  Upcoming Sessions ({userSessions.filter(s => s.status === 'Upcoming').length})
                </h3>
              </div>

              {userSessions.filter(s => s.status === 'Upcoming').length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">No upcoming sessions right now.</p>
              ) : (
                userSessions
                  .filter(s => s.status === 'Upcoming')
                  .map(s => (
                    <div key={s.id} className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.06] space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">{s.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Partner: <strong className="text-slate-200">{s.hostId === currentUser.id ? s.guestName : s.hostName}</strong>
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {s.durationMinutes} min
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.02] text-xs text-slate-300 space-y-1">
                        <p><strong className="text-cyan-400">Teaching:</strong> {s.skillTeaching}</p>
                        <p><strong className="text-violet-400">Learning:</strong> {s.skillLearning}</p>
                        {s.notes && <p className="text-[11px] text-slate-400 italic pt-1">&ldquo;{s.notes}&rdquo;</p>}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>
                          {new Date(s.scheduledAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
                          at {new Date(s.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({s.timezone})
                        </span>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.04]">
                        <a
                          href={s.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 shadow-glow-cyan flex items-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5" />
                          Open Video Room
                        </a>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              updateSessionStatus(s.id, 'Completed');
                              setReviewingSession(s);
                            }}
                            className="py-1.5 px-2.5 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20"
                          >
                            Mark Completed
                          </button>
                          <button
                            onClick={() => updateSessionStatus(s.id, 'Cancelled')}
                            className="py-1.5 px-2 rounded-xl text-xs text-slate-400 hover:text-rose-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Completed Sessions & Review Trigger */}
            <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Completed Sessions ({userSessions.filter(s => s.status === 'Completed').length})
              </h3>

              {userSessions.filter(s => s.status === 'Completed').length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">No completed sessions logged yet.</p>
              ) : (
                userSessions
                  .filter(s => s.status === 'Completed')
                  .map(s => (
                    <div key={s.id} className="p-4 rounded-2xl bg-[#16192B] border border-white/[0.06] space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">{s.title}</h4>
                          <p className="text-xs text-slate-400">
                            Partner: {s.hostId === currentUser.id ? s.guestName : s.hostName}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          Completed
                        </span>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-white/[0.04]">
                        <span className="text-xs text-slate-400">
                          {new Date(s.scheduledAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => setReviewingSession(s)}
                          className="py-1 px-3 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 flex items-center gap-1"
                        >
                          <Star className="w-3 h-3 fill-amber-400" />
                          Leave Review
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0E111C] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              Review Learning Exchange
            </h3>
            <p className="text-xs text-slate-400">
              Provide constructive feedback for {reviewingSession.guestName === currentUser.name ? reviewingSession.hostName : reviewingSession.guestName} on {reviewingSession.skillLearning}.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= reviewRating 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-slate-600'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-2">
                    {reviewRating} out of 5 stars
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Public Feedback Comment
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How was their teaching clarity, patience, and project guidance..."
                  className="w-full bg-[#161928] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewingSession(null)}
                  className="py-2 px-4 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 shadow-glow-sm"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
