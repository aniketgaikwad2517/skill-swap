export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type LearningFormat = 'video' | 'in-person' | 'chat' | 'hybrid';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: ExperienceLevel;
  yearsOfExperience?: number;
  description?: string;
  endorsementsCount?: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  skillsCount: number;
  popularSkills: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  headline: string;
  bio: string;
  location: string;
  timezone: string;
  showLocation: boolean;
  education?: string;
  professionalRole?: string;
  companyOrSchool?: string;
  teachingSkills: SkillItem[];
  learningSkills: SkillItem[];
  preferredFormat: LearningFormat;
  weeklyAvailabilityHours: number;
  availableDays: string[];
  languages: string[];
  learningGoals: string;
  isPro: boolean;
  isAdmin?: boolean;
  rating: number;
  reviewsCount: number;
  completedSwapsCount: number;
  memberSince: string;
  visibility: 'public' | 'members-only';
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export interface MatchScoreBreakdown {
  targetUser: UserProfile;
  totalScore: number; // 0 - 100
  isReciprocal: boolean;
  theyCanTeachYou: SkillItem[];
  youCanTeachThem: SkillItem[];
  sharedLanguages: string[];
  formatMatch: boolean;
  explanation: string;
}

export type RequestStatus = 'Pending' | 'Accepted' | 'Declined' | 'Cancelled' | 'Completed';

export interface ExchangeRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  offeredSkill: string;
  wantedSkill: string;
  personalMessage: string;
  suggestedTimes: string;
  durationMinutes: number;
  status: RequestStatus;
  createdAt: string;
  respondedAt?: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachmentName?: string;
}

export interface ConversationItem {
  id: string;
  participantIds: string[];
  otherUser: UserProfile;
  lastMessage?: MessageItem;
  unreadCount: number;
  updatedAt: string;
}

export type SessionStatus = 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';

export interface LearningSession {
  id: string;
  requestId?: string;
  hostId: string;
  hostName: string;
  guestId: string;
  guestName: string;
  title: string;
  skillTeaching: string;
  skillLearning: string;
  scheduledAt: string; // ISO date string
  durationMinutes: number;
  timezone: string;
  status: SessionStatus;
  meetingLink: string;
  notes?: string;
}

export interface SessionReview {
  id: string;
  sessionId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  revieweeId: string;
  rating: number;
  comment: string;
  skillReviewed: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likesCount: number;
  likedByCurrentUser: boolean;
  commentsCount: number;
  createdAt: string;
  pinned?: boolean;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'request' | 'message' | 'session' | 'review' | 'system';
  isRead: boolean;
  createdAt: string;
  linkTab?: string;
}

export interface PlatformStat {
  totalMembers: number;
  skillsExchanged: number;
  activeSessions: number;
  satisfactionRate: number;
}
