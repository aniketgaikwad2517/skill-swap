import type { UserProfile, MatchScoreBreakdown, SkillItem } from '../types';

/**
 * Fuzzy check if two skill strings share keywords
 */
function skillsOverlap(s1: string, s2: string): boolean {
  const norm1 = s1.toLowerCase().replace(/[^a-z0-9]/g, ' ');
  const norm2 = s2.toLowerCase().replace(/[^a-z0-9]/g, ' ');

  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;

  const words1 = norm1.split(/\s+/).filter(w => w.length > 2);
  const words2 = norm2.split(/\s+/).filter(w => w.length > 2);

  return words1.some(w => words2.includes(w));
}

/**
 * Calculate reciprocal matching score between the active user and target user
 */
export function calculateMatchScore(currentUser: UserProfile, targetUser: UserProfile): MatchScoreBreakdown {
  if (currentUser.id === targetUser.id) {
    return {
      targetUser,
      totalScore: 0,
      isReciprocal: false,
      theyCanTeachYou: [],
      youCanTeachThem: [],
      sharedLanguages: [],
      formatMatch: false,
      explanation: 'This is your own profile.'
    };
  }

  // 1. Skills they teach that YOU want to learn
  const theyCanTeachYou: SkillItem[] = [];
  for (const teachSkill of targetUser.teachingSkills) {
    const wantedByMe = currentUser.learningSkills.some(ls => skillsOverlap(ls.name, teachSkill.name) || ls.category === teachSkill.category);
    if (wantedByMe) {
      theyCanTeachYou.push(teachSkill);
    }
  }

  // 2. Skills YOU teach that THEY want to learn
  const youCanTeachThem: SkillItem[] = [];
  for (const myTeach of currentUser.teachingSkills) {
    const wantedByThem = targetUser.learningSkills.some(ls => skillsOverlap(ls.name, myTeach.name) || ls.category === myTeach.category);
    if (wantedByThem) {
      youCanTeachThem.push(myTeach);
    }
  }

  const isReciprocal = theyCanTeachYou.length > 0 && youCanTeachThem.length > 0;

  // 3. Shared languages
  const sharedLanguages = currentUser.languages.filter(l1 => 
    targetUser.languages.some(l2 => {
      const code1 = l1.split(' ')[0].toLowerCase();
      const code2 = l2.split(' ')[0].toLowerCase();
      return code1 === code2;
    })
  );

  // 4. Learning format compatibility
  const formatMatch = currentUser.preferredFormat === 'hybrid' || 
                      targetUser.preferredFormat === 'hybrid' || 
                      currentUser.preferredFormat === targetUser.preferredFormat;

  // Compute weighted score (0 - 100)
  let score = 20; // baseline community connection

  if (isReciprocal) {
    score += 50; // strong reciprocal boost
    score += Math.min(15, (theyCanTeachYou.length + youCanTeachThem.length) * 4);
  } else if (theyCanTeachYou.length > 0) {
    score += 35; // one-way teacher match
  } else if (youCanTeachThem.length > 0) {
    score += 30; // one-way student match
  }

  if (sharedLanguages.length > 0) {
    score += 10;
  }

  if (formatMatch) {
    score += 5;
  }

  // High rating boost
  if (targetUser.rating >= 4.9) {
    score += 5;
  }

  // Cap at 99% unless exact double match
  const finalScore = Math.min(99, Math.max(25, score));

  // Generate clear user-friendly explanation
  let explanation = '';
  if (isReciprocal) {
    const myOffer = youCanTeachThem[0]?.name || 'your tech skills';
    const theirOffer = theyCanTeachYou[0]?.name || 'their creative skills';
    explanation = `Perfect Reciprocal Match: You can teach ${myOffer}, and ${targetUser.name.split(' ')[0]} can teach you ${theirOffer}.`;
  } else if (theyCanTeachYou.length > 0) {
    explanation = `Mentorship Match: ${targetUser.name.split(' ')[0]} specializes in ${theyCanTeachYou[0].name}, which is on your wishlist.`;
  } else if (youCanTeachThem.length > 0) {
    explanation = `Teaching Opportunity: ${targetUser.name.split(' ')[0]} is actively looking to learn ${youCanTeachThem[0].name}.`;
  } else {
    explanation = `Community Match: ${targetUser.name.split(' ')[0]} is an active member with high ratings and shared interests.`;
  }

  return {
    targetUser,
    totalScore: finalScore,
    isReciprocal,
    theyCanTeachYou,
    youCanTeachThem,
    sharedLanguages,
    formatMatch,
    explanation
  };
}
