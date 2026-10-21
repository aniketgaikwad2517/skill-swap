import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserProfile, 
  SkillCategory, 
  SkillItem, 
  ExchangeRequest, 
  MessageItem, 
  LearningSession, 
  SessionReview, 
  CommunityPost, 
  PostComment, 
  NotificationItem, 
  RequestStatus, 
  SessionStatus 
} from '../types';
import { 
  CURRENT_USER_DEFAULT, 
  MOCK_USERS, 
  INITIAL_CATEGORIES, 
  INITIAL_EXCHANGE_REQUESTS, 
  INITIAL_MESSAGES, 
  INITIAL_SESSIONS, 
  INITIAL_REVIEWS, 
  INITIAL_POSTS, 
  INITIAL_COMMENTS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
}

export type AppRoute = 
  | 'landing' 
  | 'login' 
  | 'signup' 
  | 'forgot-password' 
  | 'dashboard' 
  | 'discovery' 
  | 'requests' 
  | 'messages' 
  | 'community' 
  | 'profile' 
  | 'pricing' 
  | 'admin';

interface AuthResult {
  success: boolean;
  error?: string;
  requiresEmailVerification?: boolean;
}

interface AppContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isSupabaseActive: boolean;
  allUsers: UserProfile[];
  savedUserIds: string[];
  exchangeRequests: ExchangeRequest[];
  messages: MessageItem[];
  sessions: LearningSession[];
  reviews: SessionReview[];
  communityPosts: CommunityPost[];
  postComments: PostComment[];
  notifications: NotificationItem[];
  categories: SkillCategory[];
  activeTab: string;
  selectedUserProfile: UserProfile | null;
  
  // Navigation
  currentRoute: AppRoute;
  navigateTo: (route: string) => void;
  setActiveTab: (tab: string) => void;
  viewUserProfile: (user: UserProfile) => void;

  // Modals
  authModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot';
  onboardingOpen: boolean;
  exchangeModalTarget: UserProfile | null;
  scheduleSessionTarget: { user: UserProfile; request?: ExchangeRequest } | null;
  activeToast: Toast | null;
  
  // Real Auth Actions
  login: (email: string, password?: string, rememberMe?: boolean) => Promise<AuthResult>;
  signup: (name: string, email: string, password?: string) => Promise<AuthResult>;
  forgotPassword: (email: string) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  logout: () => Promise<void>;
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  setOnboardingOpen: (open: boolean) => void;
  
  // Modals & Feedback
  openExchangeModal: (targetUser: UserProfile) => void;
  closeExchangeModal: () => void;
  openScheduleSessionModal: (targetUser: UserProfile, request?: ExchangeRequest) => void;
  closeScheduleSessionModal: () => void;
  showToast: (title: string, message: string, type?: Toast['type']) => void;
  hideToast: () => void;
  
  // Profile Actions
  updateProfile: (updates: Partial<UserProfile>) => void;
  addTeachingSkill: (skill: Omit<SkillItem, 'id'>) => void;
  removeTeachingSkill: (skillId: string) => void;
  addLearningSkill: (skill: Omit<SkillItem, 'id'>) => void;
  removeLearningSkill: (skillId: string) => void;
  toggleSaveProfile: (userId: string) => void;
  upgradeToPro: () => void;
  
  // Exchange Request Actions
  sendExchangeRequest: (
    receiverId: string, 
    offeredSkill: string, 
    wantedSkill: string, 
    personalMessage: string, 
    suggestedTimes: string, 
    durationMinutes: number
  ) => void;
  respondToExchangeRequest: (requestId: string, newStatus: RequestStatus) => void;
  
  // Messaging Actions
  sendMessage: (receiverId: string, content: string, attachmentName?: string) => void;
  markConversationAsRead: (otherUserId: string) => void;
  
  // Session Actions
  scheduleSession: (
    guestId: string, 
    title: string, 
    skillTeaching: string, 
    skillLearning: string, 
    scheduledAt: string, 
    durationMinutes: number, 
    notes?: string,
    requestId?: string
  ) => void;
  updateSessionStatus: (sessionId: string, status: SessionStatus) => void;
  
  // Review Actions
  submitReview: (sessionId: string, revieweeId: string, rating: number, comment: string, skillReviewed: string) => void;
  
  // Community Actions
  createCommunityPost: (title: string, content: string, tags: string[], category: string) => void;
  toggleLikePost: (postId: string) => void;
  addPostComment: (postId: string, content: string) => void;
  
  // Notifications
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  
  // Admin Actions
  adminModerateUser: (userId: string, action: 'verify' | 'togglePro' | 'remove') => void;
  adminDeletePost: (postId: string) => void;
  adminAddCategory: (name: string, iconName: string, description: string, popularSkills: string[]) => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'skillswap_v1_';

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Failed reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed writing ${key} to storage:`, e);
  }
}

// Convert pathname to AppRoute
function pathnameToRoute(pathname: string): AppRoute {
  const clean = pathname.replace(/^\/+/, '').split('/')[0].toLowerCase();
  switch (clean) {
    case 'login': return 'login';
    case 'signup': return 'signup';
    case 'forgot-password': return 'forgot-password';
    case 'dashboard': return 'dashboard';
    case 'discovery': return 'discovery';
    case 'requests': return 'requests';
    case 'messages': return 'messages';
    case 'community': return 'community';
    case 'profile': return 'profile';
    case 'pricing': return 'pricing';
    case 'admin': return 'admin';
    default: return 'landing';
  }
}

function routeToPathname(route: string): string {
  if (route === 'landing') return '/';
  return `/${route}`;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user state (persisted)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => 
    getStoredItem<UserProfile | null>('current_user', CURRENT_USER_DEFAULT)
  );

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => 
    getStoredItem<UserProfile[]>('all_users', MOCK_USERS)
  );

  const [savedUserIds, setSavedUserIds] = useState<string[]>(() => 
    getStoredItem<string[]>('saved_users', ['user-elena', 'user-kenji'])
  );

  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>(() => 
    getStoredItem<ExchangeRequest[]>('requests', INITIAL_EXCHANGE_REQUESTS)
  );

  const [messages, setMessages] = useState<MessageItem[]>(() => 
    getStoredItem<MessageItem[]>('messages', INITIAL_MESSAGES)
  );

  const [sessions, setSessions] = useState<LearningSession[]>(() => 
    getStoredItem<LearningSession[]>('sessions', INITIAL_SESSIONS)
  );

  const [reviews, setReviews] = useState<SessionReview[]>(() => 
    getStoredItem<SessionReview[]>('reviews', INITIAL_REVIEWS)
  );

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => 
    getStoredItem<CommunityPost[]>('posts', INITIAL_POSTS)
  );

  const [postComments, setPostComments] = useState<PostComment[]>(() => 
    getStoredItem<PostComment[]>('comments', INITIAL_COMMENTS)
  );

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => 
    getStoredItem<NotificationItem[]>('notifications', INITIAL_NOTIFICATIONS)
  );

  const [categories, setCategories] = useState<SkillCategory[]>(() => 
    getStoredItem<SkillCategory[]>('categories', INITIAL_CATEGORIES)
  );

  // Routing State
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => pathnameToRoute(window.location.pathname));
  const [selectedUserProfile, setSelectedUserProfile] = useState<UserProfile | null>(null);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(false);
  const [exchangeModalTarget, setExchangeModalTarget] = useState<UserProfile | null>(null);
  const [scheduleSessionTarget, setScheduleSessionTarget] = useState<{ user: UserProfile; request?: ExchangeRequest } | null>(null);
  const [activeToast, setActiveToast] = useState<Toast | null>(null);

  // Sync to local storage
  useEffect(() => { setStoredItem('current_user', currentUser); }, [currentUser]);
  useEffect(() => { setStoredItem('all_users', allUsers); }, [allUsers]);
  useEffect(() => { setStoredItem('saved_users', savedUserIds); }, [savedUserIds]);
  useEffect(() => { setStoredItem('requests', exchangeRequests); }, [exchangeRequests]);
  useEffect(() => { setStoredItem('messages', messages); }, [messages]);
  useEffect(() => { setStoredItem('sessions', sessions); }, [sessions]);
  useEffect(() => { setStoredItem('reviews', reviews); }, [reviews]);
  useEffect(() => { setStoredItem('posts', communityPosts); }, [communityPosts]);
  useEffect(() => { setStoredItem('comments', postComments); }, [postComments]);
  useEffect(() => { setStoredItem('notifications', notifications); }, [notifications]);
  useEffect(() => { setStoredItem('categories', categories); }, [categories]);

  // Toast notification helper
  const showToast = useCallback((title: string, message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString();
    setActiveToast({ id, title, message, type });
    setTimeout(() => {
      setActiveToast(prev => (prev?.id === id ? null : prev));
    }, 4500);
  }, []);

  const hideToast = () => setActiveToast(null);

  // Navigate function: updates route & browser URL
  const navigateTo = useCallback((route: string) => {
    const cleanRoute = pathnameToRoute(route);
    const targetPath = routeToPathname(cleanRoute);
    
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setCurrentRoute(cleanRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Backwards compatibility alias for activeTab
  const setActiveTab = (tab: string) => {
    navigateTo(tab);
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(pathnameToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Protect private routes
  useEffect(() => {
    const privateRoutes: AppRoute[] = ['dashboard', 'requests', 'messages'];
    if (privateRoutes.includes(currentRoute) && !currentUser) {
      showToast('Authentication Required', 'Please sign in to access your dashboard.', 'info');
      navigateTo('login');
    }
  }, [currentRoute, currentUser, navigateTo, showToast]);

  // Check Supabase session on startup if configured
  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.warn('Supabase getSession error:', error.message);
        return;
      }
      if (session?.user) {
        const uEmail = session.user.email || '';
        const metaName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || uEmail.split('@')[0];
        
        setCurrentUser(prev => {
          if (prev && prev.email.toLowerCase() === uEmail.toLowerCase()) return prev;
          return {
            id: session.user.id,
            name: metaName,
            email: uEmail,
            avatar: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
            headline: 'Skill Enthusiast • Ready to Learn',
            bio: 'Active SkillSwap learner exchanging expertise with peers worldwide.',
            location: 'Remote',
            timezone: 'UTC',
            showLocation: true,
            teachingSkills: [],
            learningSkills: [],
            preferredFormat: 'video',
            weeklyAvailabilityHours: 4,
            availableDays: ['Flexible'],
            languages: ['English'],
            learningGoals: 'Connect with peers and trade knowledge.',
            isPro: false,
            rating: 5.0,
            reviewsCount: 0,
            completedSwapsCount: 0,
            memberSince: 'Recently',
            visibility: 'public'
          };
        });
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        navigateTo('login');
      } else if (event === 'SIGNED_IN' && session?.user) {
        const uEmail = session.user.email || '';
        const metaName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || uEmail.split('@')[0];
        setCurrentUser(prev => {
          if (prev && prev.email.toLowerCase() === uEmail.toLowerCase()) return prev;
          return {
            id: session.user.id,
            name: metaName,
            email: uEmail,
            avatar: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
            headline: 'Skill Enthusiast • Ready to Learn',
            bio: 'Active SkillSwap learner exchanging expertise with peers worldwide.',
            location: 'Remote',
            timezone: 'UTC',
            showLocation: true,
            teachingSkills: [],
            learningSkills: [],
            preferredFormat: 'video',
            weeklyAvailabilityHours: 4,
            availableDays: ['Flexible'],
            languages: ['English'],
            learningGoals: 'Connect with peers and trade knowledge.',
            isPro: false,
            rating: 5.0,
            reviewsCount: 0,
            completedSwapsCount: 0,
            memberSince: 'Recently',
            visibility: 'public'
          };
        });
        navigateTo('dashboard');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigateTo]);

  const viewUserProfile = (user: UserProfile) => {
    setSelectedUserProfile(user);
    navigateTo('profile');
  };

  // ----------------------------------------------------
  // REAL AUTHENTICATION ACTIONS
  // ----------------------------------------------------
  const login = async (email: string, password?: string, rememberMe = true): Promise<AuthResult> => {
    // 1. If Supabase is configured, use real Supabase auth
    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password || ''
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          const uEmail = data.user.email || email;
          const metaName = data.user.user_metadata?.full_name || data.user.user_metadata?.name || uEmail.split('@')[0];
          const loggedUser: UserProfile = {
            id: data.user.id,
            name: metaName,
            email: uEmail,
            avatar: data.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
            headline: 'Skill Enthusiast • Ready to Learn',
            bio: 'Active SkillSwap learner exchanging expertise with peers worldwide.',
            location: 'Remote',
            timezone: 'UTC',
            showLocation: true,
            teachingSkills: [],
            learningSkills: [],
            preferredFormat: 'video',
            weeklyAvailabilityHours: 4,
            availableDays: ['Flexible'],
            languages: ['English'],
            learningGoals: 'Connect with peers and trade knowledge.',
            isPro: false,
            rating: 5.0,
            reviewsCount: 0,
            completedSwapsCount: 0,
            memberSince: 'Recently',
            visibility: 'public'
          };
          setCurrentUser(loggedUser);
          navigateTo('dashboard');
          showToast('Welcome Back!', 'Successfully authenticated via Supabase.', 'success');
          return { success: true };
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Authentication request failed.';
        return { success: false, error: message };
      }
    }

    // 2. Local fallback authentication (when Supabase .env is not yet configured)
    const cleanEmail = email.trim().toLowerCase();
    const existing = allUsers.find(u => u.email.toLowerCase() === cleanEmail);

    let loggedUser: UserProfile;
    if (existing) {
      loggedUser = existing;
    } else {
      loggedUser = {
        ...CURRENT_USER_DEFAULT,
        email: cleanEmail,
        name: cleanEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Skill Learner'
      };
      setAllUsers(prev => [loggedUser, ...prev]);
    }

    setCurrentUser(loggedUser);
    if (!rememberMe) {
      sessionStorage.setItem('skillswap_temp_auth', 'true');
    }
    setAuthModalOpen(false);
    navigateTo('dashboard');
    showToast('Signed In Successfully', `Welcome back, ${loggedUser.name}!`, 'success');
    return { success: true };
  };

  const signup = async (name: string, email: string, password?: string): Promise<AuthResult> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    // 1. If Supabase is configured, use real Supabase registration
    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password || '',
          options: {
            data: {
              full_name: cleanName
            }
          }
        });

        if (error) {
          return { success: false, error: error.message };
        }

        // Check if email confirmation is required by Supabase
        if (data.user && !data.session) {
          return { 
            success: true, 
            requiresEmailVerification: true 
          };
        }

        if (data.user) {
          const newUser: UserProfile = {
            id: data.user.id,
            name: cleanName,
            email: cleanEmail,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
            headline: 'New Skill Enthusiast • Ready to Learn',
            bio: 'Just joined SkillSwap! Eager to share what I know and learn new skills from this global community.',
            location: 'Remote',
            timezone: 'UTC',
            showLocation: true,
            teachingSkills: [],
            learningSkills: [],
            preferredFormat: 'video',
            weeklyAvailabilityHours: 4,
            availableDays: ['Flexible'],
            languages: ['English'],
            learningGoals: 'Connect with mentors and trade real-world skills.',
            isPro: false,
            rating: 5.0,
            reviewsCount: 0,
            completedSwapsCount: 0,
            memberSince: 'Just now',
            visibility: 'public'
          };
          setCurrentUser(newUser);
          setAllUsers(prev => [newUser, ...prev]);
          setOnboardingOpen(true);
          navigateTo('dashboard');
          showToast('Account Created!', 'Welcome to SkillSwap! Let\'s setup your skills.', 'success');
          return { success: true };
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Registration request failed.';
        return { success: false, error: message };
      }
    }

    // 2. Local fallback registration
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: cleanName || 'New Learner',
      email: cleanEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      headline: 'New Skill Enthusiast • Ready to Learn',
      bio: 'Just joined SkillSwap! Eager to share what I know and learn new skills from this global community.',
      location: 'Remote',
      timezone: 'UTC',
      showLocation: true,
      teachingSkills: [],
      learningSkills: [],
      preferredFormat: 'video',
      weeklyAvailabilityHours: 4,
      availableDays: ['Flexible'],
      languages: ['English'],
      learningGoals: 'Connect with mentors and trade real-world skills.',
      isPro: false,
      rating: 5.0,
      reviewsCount: 0,
      completedSwapsCount: 0,
      memberSince: 'Just now',
      visibility: 'public'
    };

    setCurrentUser(newUser);
    setAllUsers(prev => [newUser, ...prev]);
    setAuthModalOpen(false);
    setOnboardingOpen(true);
    navigateTo('dashboard');
    showToast('Account Created!', 'Welcome to SkillSwap! Let\'s set up your skills in the onboarding wizard.', 'success');
    return { success: true };
  };

  const forgotPassword = async (email: string): Promise<AuthResult> => {
    if (supabase && isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/login`
        });
        if (error) return { success: false, error: error.message };
        showToast('Reset Instructions Sent', `Verification email sent to ${email}`, 'info');
        return { success: true };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Could not send recovery email.';
        return { success: false, error: message };
      }
    }

    // Local fallback
    showToast('Reset Link Sent', `Password recovery link dispatched to ${email}`, 'info');
    return { success: true };
  };

  const loginWithGoogle = async (): Promise<AuthResult> => {
    if (supabase && isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/dashboard`
          }
        });
        if (error) return { success: false, error: error.message };
        return { success: true };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Google OAuth failed.';
        return { success: false, error: message };
      }
    }

    // Local fallback demonstration
    const demoGoogleUser = {
      ...CURRENT_USER_DEFAULT,
      email: 'alex.rivera@gmail.com',
      name: 'Alex Rivera'
    };
    setCurrentUser(demoGoogleUser);
    navigateTo('dashboard');
    showToast('Google Sign-In Complete', 'Authenticated as Alex Rivera (Google Workspace).', 'success');
    return { success: true };
  };

  const logout = async () => {
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase sign out error:', e);
      }
    }

    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'current_user');
    sessionStorage.removeItem('skillswap_temp_auth');
    showToast('Signed Out', 'You have been safely signed out.', 'info');
    navigateTo('login');
  };

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  // Profile management
  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
    showToast('Profile Updated', 'Your profile changes have been saved.', 'success');
  };

  const addTeachingSkill = (skill: Omit<SkillItem, 'id'>) => {
    if (!currentUser) return;
    const newSkill: SkillItem = {
      ...skill,
      id: `ts-${Date.now()}`,
      endorsementsCount: 0
    };
    const updated = {
      ...currentUser,
      teachingSkills: [...currentUser.teachingSkills, newSkill]
    };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
    showToast('Skill Added', `You can now offer ${newSkill.name} to the community!`, 'success');
  };

  const removeTeachingSkill = (skillId: string) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      teachingSkills: currentUser.teachingSkills.filter(s => s.id !== skillId)
    };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
    showToast('Skill Removed', 'Teaching skill removed from your profile.', 'info');
  };

  const addLearningSkill = (skill: Omit<SkillItem, 'id'>) => {
    if (!currentUser) return;
    const newSkill: SkillItem = {
      ...skill,
      id: `ls-${Date.now()}`
    };
    const updated = {
      ...currentUser,
      learningSkills: [...currentUser.learningSkills, newSkill]
    };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
    showToast('Goal Added', `Looking for teachers in ${newSkill.name}!`, 'success');
  };

  const removeLearningSkill = (skillId: string) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      learningSkills: currentUser.learningSkills.filter(s => s.id !== skillId)
    };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
    showToast('Goal Removed', 'Learning skill removed from your wishlist.', 'info');
  };

  const toggleSaveProfile = (userId: string) => {
    setSavedUserIds(prev => {
      const exists = prev.includes(userId);
      const next = exists ? prev.filter(id => id !== userId) : [...prev, userId];
      showToast(exists ? 'Profile Removed' : 'Profile Bookmarked', exists ? 'Removed from saved profiles.' : 'Saved to your bookmarked network.', 'info');
      return next;
    });
  };

  const upgradeToPro = () => {
    if (!currentUser) return;
    updateProfile({ isPro: true });
    showToast('🎉 SkillSwap Pro Activated!', 'Enjoy priority matchmaking, unlimited swaps, and advanced filters.', 'success');
  };

  const openExchangeModal = (targetUser: UserProfile) => {
    if (!currentUser) {
      navigateTo('login');
      return;
    }
    setExchangeModalTarget(targetUser);
  };

  const closeExchangeModal = () => setExchangeModalTarget(null);

  const openScheduleSessionModal = (targetUser: UserProfile, request?: ExchangeRequest) => {
    if (!currentUser) {
      navigateTo('login');
      return;
    }
    setScheduleSessionTarget({ user: targetUser, request });
  };

  const closeScheduleSessionModal = () => setScheduleSessionTarget(null);

  // Exchange Requests
  const sendExchangeRequest = (
    receiverId: string, 
    offeredSkill: string, 
    wantedSkill: string, 
    personalMessage: string, 
    suggestedTimes: string, 
    durationMinutes: number
  ) => {
    if (!currentUser) return;
    const receiver = allUsers.find(u => u.id === receiverId);
    if (!receiver) return;

    const newRequest: ExchangeRequest = {
      id: `req-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId: receiver.id,
      receiverName: receiver.name,
      receiverAvatar: receiver.avatar,
      offeredSkill,
      wantedSkill,
      personalMessage,
      suggestedTimes,
      durationMinutes,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setExchangeRequests(prev => [newRequest, ...prev]);
    closeExchangeModal();

    // Auto-create notification for receiver
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: receiver.id,
      title: 'New Exchange Request!',
      message: `${currentUser.name} offered to teach ${offeredSkill} in exchange for ${wantedSkill}.`,
      type: 'request',
      isRead: false,
      createdAt: new Date().toISOString(),
      linkTab: 'requests'
    };
    setNotifications(prev => [notif, ...prev]);

    showToast('Request Sent!', `Your skill exchange request was sent to ${receiver.name}.`, 'success');
  };

  const respondToExchangeRequest = (requestId: string, newStatus: RequestStatus) => {
    setExchangeRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: newStatus,
          respondedAt: new Date().toISOString()
        };
      }
      return req;
    }));

    const targetReq = exchangeRequests.find(r => r.id === requestId);
    if (!targetReq) return;

    if (newStatus === 'Accepted') {
      showToast('Exchange Request Accepted!', `You can now message ${targetReq.senderName} and schedule your learning session.`, 'success');
      
      const initialMsg: MessageItem = {
        id: `msg-${Date.now()}`,
        conversationId: `conv-${targetReq.senderId}`,
        senderId: currentUser?.id || 'system',
        receiverId: targetReq.senderId,
        content: `Hi ${targetReq.senderName}! I accepted your skill swap request (${targetReq.offeredSkill} ⇄ ${targetReq.wantedSkill}). Let's schedule our first session!`,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages(prev => [...prev, initialMsg]);

      setNotifications(prev => [{
        id: `notif-${Date.now()}`,
        userId: targetReq.senderId,
        title: 'Exchange Accepted! 🤝',
        message: `${targetReq.receiverName} accepted your skill exchange request!`,
        type: 'request',
        isRead: false,
        createdAt: new Date().toISOString(),
        linkTab: 'messages'
      }, ...prev]);
    } else if (newStatus === 'Declined') {
      showToast('Request Declined', 'The exchange request was declined.', 'info');
    } else if (newStatus === 'Completed') {
      showToast('Swap Marked as Completed!', 'Great job exchanging skills! Leave a review to help your partner.', 'success');
    }
  };

  // Messaging
  const sendMessage = (receiverId: string, content: string, attachmentName?: string) => {
    if (!currentUser || !content.trim()) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId: `conv-${receiverId}`,
      senderId: currentUser.id,
      receiverId,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
      attachmentName
    };

    setMessages(prev => [...prev, newMsg]);

    setNotifications(prev => [{
      id: `notif-${Date.now()}`,
      userId: receiverId,
      title: `Message from ${currentUser.name}`,
      message: content.length > 50 ? `${content.slice(0, 50)}...` : content,
      type: 'message',
      isRead: false,
      createdAt: new Date().toISOString(),
      linkTab: 'messages'
    }, ...prev]);
  };

  const markConversationAsRead = (otherUserId: string) => {
    if (!currentUser) return;
    setMessages(prev => prev.map(msg => {
      if (msg.senderId === otherUserId && msg.receiverId === currentUser.id && !msg.isRead) {
        return { ...msg, isRead: true };
      }
      return msg;
    }));
  };

  // Learning Sessions
  const scheduleSession = (
    guestId: string, 
    title: string, 
    skillTeaching: string, 
    skillLearning: string, 
    scheduledAt: string, 
    durationMinutes: number, 
    notes?: string,
    requestId?: string
  ) => {
    if (!currentUser) return;
    const guestUser = allUsers.find(u => u.id === guestId);
    const guestName = guestUser ? guestUser.name : 'Exchange Partner';

    const cleanMeetingCode = `swap-${Math.random().toString(36).substring(2, 8)}`;
    const newSession: LearningSession = {
      id: `sess-${Date.now()}`,
      requestId,
      hostId: currentUser.id,
      hostName: currentUser.name,
      guestId,
      guestName,
      title,
      skillTeaching,
      skillLearning,
      scheduledAt,
      durationMinutes,
      timezone: currentUser.timezone,
      status: 'Upcoming',
      meetingLink: `https://meet.skillswap.io/${cleanMeetingCode}`,
      notes
    };

    setSessions(prev => [newSession, ...prev]);
    closeScheduleSessionModal();

    showToast('Session Scheduled!', `Session confirmed with ${guestName}. Meeting link generated.`, 'success');

    setNotifications(prev => [{
      id: `notif-${Date.now()}`,
      userId: guestId,
      title: 'New Session Scheduled 📅',
      message: `${currentUser.name} scheduled: "${title}" for ${new Date(scheduledAt).toLocaleDateString()}.`,
      type: 'session',
      isRead: false,
      createdAt: new Date().toISOString(),
      linkTab: 'messages'
    }, ...prev]);
  };

  const updateSessionStatus = (sessionId: string, status: SessionStatus) => {
    setSessions(prev => prev.map(s => (s.id === sessionId ? { ...s, status } : s)));
    showToast('Session Updated', `Session status changed to ${status}.`, 'info');
  };

  // Reviews
  const submitReview = (sessionId: string, revieweeId: string, rating: number, comment: string, skillReviewed: string) => {
    if (!currentUser) return;
    const newReview: SessionReview = {
      id: `rev-${Date.now()}`,
      sessionId,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerAvatar: currentUser.avatar,
      revieweeId,
      rating,
      comment,
      skillReviewed,
      createdAt: new Date().toISOString()
    };

    setReviews(prev => [newReview, ...prev]);

    setAllUsers(prev => prev.map(u => {
      if (u.id === revieweeId) {
        const currentCount = u.reviewsCount || 0;
        const currentAvg = u.rating || 5.0;
        const newCount = currentCount + 1;
        const newAvg = Number(((currentAvg * currentCount + rating) / newCount).toFixed(2));
        return {
          ...u,
          rating: newAvg,
          reviewsCount: newCount,
          completedSwapsCount: (u.completedSwapsCount || 0) + 1
        };
      }
      return u;
    }));

    showToast('Review Submitted ⭐', 'Thank you for giving peer feedback!', 'success');
  };

  // Community Posts
  const createCommunityPost = (title: string, content: string, tags: string[], category: string) => {
    if (!currentUser) return;
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorHeadline: currentUser.headline,
      title: title.trim(),
      content: content.trim(),
      category,
      tags: tags.map(t => t.replace(/^#/, '').trim()).filter(Boolean),
      likesCount: 1,
      likedByCurrentUser: true,
      commentsCount: 0,
      createdAt: new Date().toISOString()
    };

    setCommunityPosts(prev => [newPost, ...prev]);
    showToast('Knowledge Shared!', 'Your post has been published to the community feed.', 'success');
  };

  const toggleLikePost = (postId: string) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const nextLiked = !post.likedByCurrentUser;
        return {
          ...post,
          likedByCurrentUser: nextLiked,
          likesCount: nextLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1)
        };
      }
      return post;
    }));
  };

  const addPostComment = (postId: string, content: string) => {
    if (!currentUser || !content.trim()) return;
    const newComment: PostComment = {
      id: `comm-${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: content.trim(),
      createdAt: new Date().toISOString()
    };

    setPostComments(prev => [...prev, newComment]);
    setCommunityPosts(prev => prev.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p));
  };

  // Notifications
  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  // Admin Actions
  const adminModerateUser = (userId: string, action: 'verify' | 'togglePro' | 'remove') => {
    if (action === 'remove') {
      setAllUsers(prev => prev.filter(u => u.id !== userId));
      showToast('User Suspended', 'User profile has been moderated and removed from discovery.', 'warning');
    } else if (action === 'togglePro') {
      setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isPro: !u.isPro } : u));
      showToast('Pro Status Toggled', 'User subscription level updated.', 'success');
    } else if (action === 'verify') {
      setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, rating: 5.0 } : u));
      showToast('Badge Verified', 'User has been given verified instructor status.', 'success');
    }
  };

  const adminDeletePost = (postId: string) => {
    setCommunityPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Post Moderated', 'Community post removed by admin.', 'info');
  };

  const adminAddCategory = (name: string, iconName: string, description: string, popularSkills: string[]) => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      name,
      iconName,
      description,
      skillsCount: 0,
      popularSkills
    };
    setCategories(prev => [...prev, newCat]);
    showToast('Category Created', `Added category "${name}" to skill marketplace.`, 'success');
  };

  const resetAllDemoData = () => {
    setCurrentUser(CURRENT_USER_DEFAULT);
    setAllUsers(MOCK_USERS);
    setExchangeRequests(INITIAL_EXCHANGE_REQUESTS);
    setMessages(INITIAL_MESSAGES);
    setSessions(INITIAL_SESSIONS);
    setReviews(INITIAL_REVIEWS);
    setCommunityPosts(INITIAL_POSTS);
    setPostComments(INITIAL_COMMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCategories(INITIAL_CATEGORIES);
    setSavedUserIds(['user-elena', 'user-kenji']);
    showToast('Data Reset', 'All demo data has been reset to default state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isSupabaseActive: isSupabaseConfigured,
        allUsers,
        savedUserIds,
        exchangeRequests,
        messages,
        sessions,
        reviews,
        communityPosts,
        postComments,
        notifications,
        categories,
        activeTab: currentRoute,
        currentRoute,
        selectedUserProfile,
        authModalOpen,
        authModalMode,
        onboardingOpen,
        exchangeModalTarget,
        scheduleSessionTarget,
        activeToast,

        navigateTo,
        setActiveTab,
        viewUserProfile,
        login,
        signup,
        forgotPassword,
        loginWithGoogle,
        logout,
        openAuthModal,
        closeAuthModal,
        setOnboardingOpen,

        openExchangeModal,
        closeExchangeModal,
        openScheduleSessionModal,
        closeScheduleSessionModal,
        showToast,
        hideToast,

        updateProfile,
        addTeachingSkill,
        removeTeachingSkill,
        addLearningSkill,
        removeLearningSkill,
        toggleSaveProfile,
        upgradeToPro,

        sendExchangeRequest,
        respondToExchangeRequest,
        sendMessage,
        markConversationAsRead,
        scheduleSession,
        updateSessionStatus,
        submitReview,
        createCommunityPost,
        toggleLikePost,
        addPostComment,
        markNotificationRead,
        markAllNotificationsRead,

        adminModerateUser,
        adminDeletePost,
        adminAddCategory,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
