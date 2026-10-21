import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NewPostModal } from './NewPostModal';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Sparkles, 
  PenTool, 
  Tag, 
  Bookmark, 
  Send, 
  CheckCircle2, 
  Trophy, 
  Flame,
  ArrowRight,
  Pin
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { 
    currentUser, 
    communityPosts, 
    postComments, 
    toggleLikePost, 
    addPostComment, 
    viewUserProfile, 
    allUsers,
    openAuthModal,
    isAuthenticated,
    sessions,
    setActiveTab 
  } = useApp();

  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');

  const handleCommentSubmit = (postId: string) => {
    if (!commentInput.trim()) return;
    addPostComment(postId, commentInput);
    setCommentInput('');
  };

  // Completed user sessions count
  const completedSessionsCount = sessions.filter(
    s => (s.hostId === currentUser?.id || s.guestId === currentUser?.id) && s.status === 'Completed'
  ).length;

  const filteredPosts = communityPosts.filter(p => {
    if (selectedTag === 'all') return true;
    return p.tags.includes(selectedTag) || p.category.toLowerCase().includes(selectedTag.toLowerCase());
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Peer Knowledge Feed
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Community Learning Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Read field-tested guides, design systems breakdowns, and lessons learned from real peer skill exchanges.
          </p>
        </div>

        <button
          onClick={() => {
            if (isAuthenticated) {
              setNewPostModalOpen(true);
            } else {
              openAuthModal('signup');
            }
          }}
          className="self-start md:self-auto py-2.5 px-5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-glow-violet transition-all flex items-center gap-2"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Share Knowledge or Tip</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Posts Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tag Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedTag === 'all'
                  ? 'bg-violet-600 text-white shadow-glow-sm'
                  : 'bg-[#121524] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              All Articles
            </button>
            {['Figma', 'UIUX', 'Python', 'FastAPI', 'Growth', 'Copywriting', 'DesignSystems'].map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-violet-600 text-white shadow-glow-sm'
                    : 'bg-[#121524] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.map(post => {
              const author = allUsers.find(u => u.id === post.authorId);
              const postCommentsList = postComments.filter(c => c.postId === post.id);
              const isCommentBoxOpen = activeCommentPostId === post.id;

              return (
                <article
                  key={post.id}
                  className="bg-[#121524] rounded-3xl p-6 sm:p-7 border border-white/[0.08] hover:border-violet-500/30 transition-all space-y-4"
                >
                  {/* Pinned badge */}
                  {post.pinned && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                      <Pin className="w-3.5 h-3.5" />
                      <span>Featured Community Guide</span>
                    </div>
                  )}

                  {/* Author info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={post.authorAvatar} 
                        alt={post.authorName} 
                        className="w-11 h-11 rounded-2xl object-cover ring-2 ring-violet-500/30 cursor-pointer"
                        onClick={() => author && viewUserProfile(author)}
                      />
                      <div>
                        <h4 
                          onClick={() => author && viewUserProfile(author)}
                          className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors"
                        >
                          {post.authorName}
                        </h4>
                        <p className="text-xs text-slate-400">{post.authorHeadline}</p>
                      </div>
                    </div>
                    
                    <span className="text-[11px] text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Title and Content */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 font-medium">
                      {post.category}
                    </span>
                    {post.tags.map(t => (
                      <span
                        key={t}
                        onClick={() => setSelectedTag(t)}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] text-slate-400 hover:text-white cursor-pointer transition-colors"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar: Likes, Comments, Share */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Like button */}
                      <button
                        onClick={() => {
                          if (isAuthenticated) {
                            toggleLikePost(post.id);
                          } else {
                            openAuthModal('login');
                          }
                        }}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                          post.likedByCurrentUser
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : 'bg-white/[0.03] text-slate-400 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${post.likedByCurrentUser ? 'fill-rose-400 text-rose-400' : ''}`} />
                        <span>{post.likesCount}</span>
                      </button>

                      {/* Comment toggle */}
                      <button
                        onClick={() => setActiveCommentPostId(isCommentBoxOpen ? null : post.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.03] text-slate-400 hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{postCommentsList.length} Comments</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => alert('Link copied to clipboard!')}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04]"
                      aria-label="Share post"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comment Section (Accordion) */}
                  {isCommentBoxOpen && (
                    <div className="pt-3 border-t border-white/[0.06] space-y-3 animate-in fade-in duration-150">
                      <div className="space-y-2">
                        {postCommentsList.map(c => (
                          <div key={c.id} className="p-3 rounded-2xl bg-[#16192B] border border-white/[0.04] flex items-start gap-3">
                            <img src={c.authorAvatar} alt={c.authorName} className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white">{c.authorName}</span>
                                <span className="text-[10px] text-slate-500">
                                  {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 mt-0.5">{c.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add comment input */}
                      {isAuthenticated ? (
                        <div className="flex gap-2 pt-1">
                          <input
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCommentSubmit(post.id);
                            }}
                            placeholder="Add a constructive insight or question..."
                            className="flex-1 bg-[#161928] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleCommentSubmit(post.id)}
                            className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 text-center py-2">
                          <button onClick={() => openAuthModal('login')} className="text-cyan-400 font-bold hover:underline">
                            Log in
                          </button>{' '}
                          to join the discussion.
                        </p>
                      )}
                    </div>
                  )}

                </article>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: Learning Progress & Community Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Learning Progress Summary */}
          {currentUser && (
            <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">My Learning Progress</h3>
              </div>

              <div className="space-y-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#16192B] border border-white/[0.04]">
                  <span className="text-[11px] text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
                    Skills Currently in Progress
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {currentUser.learningSkills.map(s => (
                      <span key={s.id} className="text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20 font-medium">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-[#16192B] border border-white/[0.04]">
                    <p className="text-xl font-black text-white">{completedSessionsCount}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mt-0.5">Sessions Done</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#16192B] border border-white/[0.04]">
                    <p className="text-xl font-black text-amber-400">⭐ {currentUser.rating.toFixed(1)}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mt-0.5">Peer Score</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">Active Target Goal:</span>
                  <p className="text-xs text-slate-300 italic bg-[#16192B] p-3 rounded-xl border border-white/[0.04]">
                    &ldquo;{currentUser.learningGoals}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* High-Signal Community Guidelines */}
          <div className="bg-[#121524] rounded-3xl p-6 border border-white/[0.08] space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              Community Code of Conduct
            </h3>
            <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Give Before Taking:</strong> Come prepared to share real expertise.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Respect Time:</strong> Show up promptly for scheduled sessions or reschedule 24h in advance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>No Sales Pitching:</strong> Do not pitch paid courses or services during skill swaps.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Modal for new post */}
      <NewPostModal isOpen={newPostModalOpen} onClose={() => setNewPostModalOpen(false)} />

    </div>
  );
};
