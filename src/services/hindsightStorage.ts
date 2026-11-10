import {
  MockTestResult,
  TopicMastery,
  MistakeReflection,
  DailyStudyConfig,
  DailyStudyLog,
  JourneyProgressSummary,
} from '../types/kas';

const STORAGE_KEYS = {
  TEST_RESULTS: 'kanasu_kas_test_results_v1',
  TOPIC_MASTERY: 'kanasu_kas_topic_mastery_v1',
  MISTAKE_REFLECTIONS: 'kanasu_kas_mistakes_v1',
  EXAM_CHECKLIST: 'kanasu_kas_checklist_v1',
  USER_PREFERENCES: 'kanasu_kas_prefs_v1',
  DAILY_STUDY_CONFIG: 'kanasu_kas_daily_study_v1',
  MASTERCLASS_WEAPONS: 'kanasu_kas_masterclass_weapons_v1',
};

export const PROGRESS_UPDATED_EVENT = 'kanasu-progress-updated';

function emitProgressUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PROGRESS_UPDATED_EVENT));
  }
}

export function getTodayDateKey(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86400000);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface UserPreferences {
  language: 'en' | 'kn';
  fpsTarget: 120 | 60;
  reducedMotion: boolean;
  soundEffects: boolean;
  theme3D: 'midnight' | 'amber' | 'granite';
}

const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'en',
  fpsTarget: 120,
  reducedMotion: false,
  soundEffects: true,
  theme3D: 'amber',
};

// Default seeded mastery records to give the user immediate rich cognitive hindsight insights
const INITIAL_MASTERY: Record<string, TopicMastery> = {
  'Kadambas of Banavasi': {
    topicId: 'kadambas',
    topicNameEn: 'Kadambas of Banavasi',
    topicNameKn: 'ಬನವಾಸಿಯ ಕದಂಬರು',
    subject: 'Karnataka History',
    totalAttempts: 5,
    correctAttempts: 4,
    lastReviewed: Date.now() - 86400000 * 2,
    easeFactor: 2.6,
    intervalDays: 4,
    nextReviewDate: Date.now() + 86400000 * 2,
    repeatedMistakes: 1,
    notes: [
      'Mastered Halmidi Brahmic script date (circa 450 CE)',
      'Watch out for Talagunda pillar Sanskrit patron distinction',
    ],
  },
  'Article 371(J)': {
    topicId: 'art371j',
    topicNameEn: 'Article 371(J) Special Provisions',
    topicNameKn: '371(ಜೆ) ವಿಶೇಷ ಸೌಲಭ್ಯಗಳು',
    subject: 'Karnataka Governance',
    totalAttempts: 4,
    correctAttempts: 2,
    lastReviewed: Date.now() - 86400000 * 4,
    easeFactor: 2.1,
    intervalDays: 2,
    nextReviewDate: Date.now() - 86400000 * 1, // Due for review!
    repeatedMistakes: 2,
    notes: [
      'Governor responsibility vs State government roles',
      '7 Kalyana Karnataka districts including Vijayanagara',
    ],
  },
  'Syllogism Logic': {
    topicId: 'syllogism',
    topicNameEn: 'Syllogism & Deductive Venn Logic',
    topicNameKn: 'ಸಿಲಾಜಿಜಂ ಮತ್ತು ತಾರ್ಕಿಕ ಚಿಂತನೆ',
    subject: 'Mental Ability',
    totalAttempts: 6,
    correctAttempts: 3,
    lastReviewed: Date.now() - 86400000 * 1,
    easeFactor: 1.9,
    intervalDays: 1,
    nextReviewDate: Date.now(), // Due today!
    repeatedMistakes: 3,
    notes: [
      'Never assume intersection without explicit universal overlap',
      'Check conversion: All X are Y implies Some Y are X',
    ],
  },
  'Western Ghats Ecology': {
    topicId: 'w_ghats',
    topicNameEn: 'Western Ghats Ecology & Committees',
    topicNameKn: 'ಪಶ್ಚಿಮ ಘಟ್ಟ ಪರಿಸರ ಮತ್ತು ಸಮಿತಿಗಳು',
    subject: 'Environment & Ecology',
    totalAttempts: 4,
    correctAttempts: 3,
    lastReviewed: Date.now() - 86400000 * 3,
    easeFactor: 2.4,
    intervalDays: 3,
    nextReviewDate: Date.now() + 86400000 * 1,
    repeatedMistakes: 1,
    notes: ['Gadgil (100% ESA) vs Kasturirangan (37% ESA)', '5 Tiger Reserves of Karnataka'],
  },
};

function createInitialStudyConfig(): DailyStudyConfig {
  const today = getTodayDateKey(0);
  const d1 = getTodayDateKey(-1);
  const d2 = getTodayDateKey(-2);
  const d3 = getTodayDateKey(-3);
  const d4 = getTodayDateKey(-4);
  const d5 = getTodayDateKey(-5);
  const d6 = getTodayDateKey(-6);

  return {
    dailyGoalHours: 6.0,
    streakDays: 5,
    logs: {
      [d6]: { date: d6, paper1Hours: 3.5, paper2Hours: 2.0, totalHours: 5.5, targetHours: 6.0 },
      [d5]: { date: d5, paper1Hours: 4.0, paper2Hours: 2.0, totalHours: 6.0, targetHours: 6.0 },
      [d4]: { date: d4, paper1Hours: 3.5, paper2Hours: 2.5, totalHours: 6.0, targetHours: 6.0 },
      [d3]: { date: d3, paper1Hours: 4.5, paper2Hours: 2.0, totalHours: 6.5, targetHours: 6.0 },
      [d2]: { date: d2, paper1Hours: 3.5, paper2Hours: 2.0, totalHours: 5.5, targetHours: 6.0 },
      [d1]: { date: d1, paper1Hours: 4.0, paper2Hours: 2.5, totalHours: 6.5, targetHours: 6.0 },
      [today]: { date: today, paper1Hours: 2.5, paper2Hours: 1.5, totalHours: 4.0, targetHours: 6.0 },
    },
  };
}

export const HindsightStorage = {
  // Test Results
  getTestResults(): MockTestResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTestResult(result: MockTestResult): void {
    const existing = this.getTestResults();
    const updated = [result, ...existing];
    try {
      localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    // Update topic masteries from this result
    this.updateTopicMasteriesFromResult(result);
    emitProgressUpdate();
  },

  // Topic Mastery & SM-2 Spaced Repetition Ease Factor
  getTopicMasteries(): Record<string, TopicMastery> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TOPIC_MASTERY);
      if (data) return JSON.parse(data);
      localStorage.setItem(STORAGE_KEYS.TOPIC_MASTERY, JSON.stringify(INITIAL_MASTERY));
      return INITIAL_MASTERY;
    } catch {
      return INITIAL_MASTERY;
    }
  },

  updateTopicMastery(
    topic: string,
    isCorrect: boolean,
    qualityRating: 0 | 1 | 2 | 3 | 4 | 5 // 0-5 SM-2 scale
  ): TopicMastery {
    const masteries = this.getTopicMasteries();
    const current = masteries[topic] || {
      topicId: topic.toLowerCase().replace(/\s+/g, '_'),
      topicNameEn: topic,
      topicNameKn: topic,
      subject: 'General Studies',
      totalAttempts: 0,
      correctAttempts: 0,
      lastReviewed: Date.now(),
      easeFactor: 2.5,
      intervalDays: 1,
      nextReviewDate: Date.now(),
      repeatedMistakes: 0,
      notes: [],
    };

    // Calculate new SM-2 Ease Factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    let newEF = current.easeFactor + (0.1 - (5 - qualityRating) * (0.08 + (5 - qualityRating) * 0.02));
    if (newEF < 1.3) newEF = 1.3; // minimum ease factor
    if (newEF > 3.2) newEF = 3.2;

    let newInterval = 1;
    if (qualityRating >= 3) {
      if (current.intervalDays === 1) {
        newInterval = 3;
      } else {
        newInterval = Math.round(current.intervalDays * newEF);
      }
    } else {
      newInterval = 1; // reset on lapse
    }

    const updated: TopicMastery = {
      ...current,
      totalAttempts: current.totalAttempts + 1,
      correctAttempts: isCorrect ? current.correctAttempts + 1 : current.correctAttempts,
      repeatedMistakes: !isCorrect ? current.repeatedMistakes + 1 : current.repeatedMistakes,
      lastReviewed: Date.now(),
      easeFactor: Number(newEF.toFixed(2)),
      intervalDays: newInterval,
      nextReviewDate: Date.now() + newInterval * 86400000,
    };

    masteries[topic] = updated;
    try {
      localStorage.setItem(STORAGE_KEYS.TOPIC_MASTERY, JSON.stringify(masteries));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    emitProgressUpdate();
    return updated;
  },

  updateTopicMasteriesFromResult(result: MockTestResult): void {
    const masteries = this.getTopicMasteries();
    Object.entries(result.subjectBreakdown).forEach(([subject, stats]) => {
      if (stats.wrong > 0) {
        const ef = Math.max(1.4, (masteries[subject]?.easeFactor || 2.4) - 0.2);
        masteries[subject] = {
          topicId: subject.toLowerCase().replace(/\s+/g, '_'),
          topicNameEn: subject,
          topicNameKn: subject,
          subject: subject,
          totalAttempts: (masteries[subject]?.totalAttempts || 0) + stats.total,
          correctAttempts: (masteries[subject]?.correctAttempts || 0) + stats.correct,
          repeatedMistakes: (masteries[subject]?.repeatedMistakes || 0) + stats.wrong,
          lastReviewed: Date.now(),
          easeFactor: Number(ef.toFixed(2)),
          intervalDays: 1,
          nextReviewDate: Date.now() + 86400000,
          notes: masteries[subject]?.notes || [
            `Flagged during full mock test on ${new Date().toLocaleDateString()}`,
          ],
        };
      }
    });
    try {
      localStorage.setItem(STORAGE_KEYS.TOPIC_MASTERY, JSON.stringify(masteries));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  },

  // Masterclass Weapons Completion Tracking
  getCompletedMasterclassWeapons(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MASTERCLASS_WEAPONS);
      if (data) return JSON.parse(data);
      const seeded = ['extreme_words'];
      localStorage.setItem(STORAGE_KEYS.MASTERCLASS_WEAPONS, JSON.stringify(seeded));
      return seeded;
    } catch {
      return ['extreme_words'];
    }
  },

  markMasterclassWeaponCompleted(weaponId: string): string[] {
    const current = this.getCompletedMasterclassWeapons();
    if (!current.includes(weaponId)) {
      const updated = [...current, weaponId];
      try {
        localStorage.setItem(STORAGE_KEYS.MASTERCLASS_WEAPONS, JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage save failed', e);
      }
      emitProgressUpdate();
      return updated;
    }
    return current;
  },

  // Daily Study Hours Configuration & Logging
  getDailyStudyConfig(): DailyStudyConfig {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DAILY_STUDY_CONFIG);
      if (raw) {
        const parsed: DailyStudyConfig = JSON.parse(raw);
        const today = getTodayDateKey(0);
        if (!parsed.logs[today]) {
          parsed.logs[today] = {
            date: today,
            paper1Hours: 0,
            paper2Hours: 0,
            totalHours: 0,
            targetHours: parsed.dailyGoalHours || 6.0,
          };
        }
        return parsed;
      }
      const seeded = createInitialStudyConfig();
      localStorage.setItem(STORAGE_KEYS.DAILY_STUDY_CONFIG, JSON.stringify(seeded));
      return seeded;
    } catch {
      return createInitialStudyConfig();
    }
  },

  setDailyGoalHours(goalHours: number): DailyStudyConfig {
    const clamped = Math.max(1.0, Math.min(14.0, Number(goalHours.toFixed(1))));
    const config = this.getDailyStudyConfig();
    const today = getTodayDateKey(0);
    config.dailyGoalHours = clamped;
    if (config.logs[today]) {
      config.logs[today].targetHours = clamped;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.DAILY_STUDY_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    emitProgressUpdate();
    return config;
  },

  logStudyHours(paper1Delta: number, paper2Delta: number): DailyStudyConfig {
    const config = this.getDailyStudyConfig();
    const today = getTodayDateKey(0);
    const existing: DailyStudyLog = config.logs[today] || {
      date: today,
      paper1Hours: 0,
      paper2Hours: 0,
      totalHours: 0,
      targetHours: config.dailyGoalHours,
    };

    const nextP1 = Math.max(0, Math.min(12, Number((existing.paper1Hours + paper1Delta).toFixed(1))));
    const nextP2 = Math.max(0, Math.min(12, Number((existing.paper2Hours + paper2Delta).toFixed(1))));
    const nextTotal = Number((nextP1 + nextP2).toFixed(1));

    config.logs[today] = {
      ...existing,
      paper1Hours: nextP1,
      paper2Hours: nextP2,
      totalHours: nextTotal,
      targetHours: config.dailyGoalHours,
    };

    // Recalculate consecutive streak days where logged >= 75% of target
    let streak = 0;
    for (let i = 0; i >= -14; i--) {
      const key = getTodayDateKey(i);
      const dayLog = config.logs[key];
      if (dayLog && dayLog.totalHours >= dayLog.targetHours * 0.75) {
        streak++;
      } else if (i === 0) {
        // If today isn't completed yet, continue checking from yesterday
        continue;
      } else {
        break;
      }
    }
    config.streakDays = Math.max(1, streak);

    try {
      localStorage.setItem(STORAGE_KEYS.DAILY_STUDY_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    emitProgressUpdate();
    return config;
  },

  getSevenDayStudySeries(): {
    date: string;
    dayLabel: string;
    paper1Hours: number;
    paper2Hours: number;
    totalHours: number;
    targetHours: number;
    isToday: boolean;
  }[] {
    const config = this.getDailyStudyConfig();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    for (let i = -6; i <= 0; i++) {
      const dateKey = getTodayDateKey(i);
      const d = new Date(Date.now() + i * 86400000);
      const log = config.logs[dateKey] || {
        date: dateKey,
        paper1Hours: 0,
        paper2Hours: 0,
        totalHours: 0,
        targetHours: config.dailyGoalHours,
      };
      result.push({
        date: dateKey,
        dayLabel: i === 0 ? 'Today' : days[d.getDay()],
        paper1Hours: log.paper1Hours,
        paper2Hours: log.paper2Hours,
        totalHours: log.totalHours,
        targetHours: log.targetHours || config.dailyGoalHours,
        isToday: i === 0,
      });
    }
    return result;
  },

  // Unified Journey Progress Summary for HeroSection & HindsightDashboard
  getJourneyProgressSummary(): JourneyProgressSummary {
    const masterclassIds = this.getCompletedMasterclassWeapons();
    const masteries = this.getTopicMasteries();
    const testResults = this.getTestResults();
    const studyConfig = this.getDailyStudyConfig();
    const todayKey = getTodayDateKey(0);
    const todayLog = studyConfig.logs[todayKey] || {
      totalHours: 0,
      targetHours: studyConfig.dailyGoalHours,
    };

    const masterclassTotal = 4;
    const conceptsTotal = 8;
    const conceptsLearnedCount = Math.min(conceptsTotal, Object.keys(masteries).length);
    const mockTestsAttemptedCount = testResults.length;
    const bestMockScore =
      testResults.length > 0
        ? Math.max(...testResults.map((r) => Number(r.score.toFixed(1))))
        : 0;

    const masterclassRatio = Math.min(1, masterclassIds.length / masterclassTotal);
    const conceptsRatio = Math.min(1, conceptsLearnedCount / conceptsTotal);
    const mocksRatio = Math.min(1, mockTestsAttemptedCount / 3); // 3 mocks for full milestone
    const studyRatio = Math.min(1, todayLog.totalHours / Math.max(1, studyConfig.dailyGoalHours));

    const overallReadinessPct = Math.round(
      (masterclassRatio * 25 + conceptsRatio * 30 + mocksRatio * 25 + studyRatio * 20)
    );

    let rankTitleEn = 'Stage I · Probationary Tactician';
    let rankTitleKn = 'ಹಂತ ೧ · ಪ್ರೊಬೇಷನರಿ ತಂತ್ರಗಾರ';

    if (overallReadinessPct >= 85) {
      rankTitleEn = 'Stage IV · Gazetted AC/DySP Ranker Ready';
      rankTitleKn = 'ಹಂತ ೪ · ಗೆಜೆಟೆಡ್ AC/DySP ರ‍್ಯಾಂಕರ್ ಸನ್ನದ್ಧ';
    } else if (overallReadinessPct >= 60) {
      rankTitleEn = 'Stage III · Cutoff Shield Commander';
      rankTitleKn = 'ಹಂತ ೩ · ಕಟ್‌ಆಫ್ ಭೇದಕ ಕಮಾಂಡರ್';
    } else if (overallReadinessPct >= 35) {
      rankTitleEn = 'Stage II · 50:50 Elimination Specialist';
      rankTitleKn = 'ಹಂತ ೨ · ೫೦:೫೦ ಎಲಿಮಿನೇಷನ್ ಪರಿಣತ';
    }

    return {
      masterclassCompletedIds: masterclassIds,
      masterclassTotal,
      conceptsLearnedCount,
      conceptsTotal,
      mockTestsAttemptedCount,
      bestMockScore,
      todayStudyHours: todayLog.totalHours,
      dailyGoalHours: studyConfig.dailyGoalHours,
      studyStreakDays: studyConfig.streakDays,
      overallReadinessPct,
      rankTitleEn,
      rankTitleKn,
    };
  },

  // Mistake Reflections
  getMistakeReflections(): MistakeReflection[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISTAKE_REFLECTIONS);
      return data
        ? JSON.parse(data)
        : [
            {
              id: 'refl_1',
              questionId: 'kas_q1',
              timestamp: Date.now() - 86400000 * 2,
              subject: 'Karnataka History',
              userSelectedOption: 3,
              correctOption: 0,
              errorReason: 'Factual Blindspot',
              reflectionNote:
                'Assumed Kadambas avoided Sanskrit completely because they championed Kannada. Talagunda inscription proves heavy Sanskrit patronage.',
              actionItem: 'Use Extreme-Word elimination whenever options say "sole" or "rejected".',
            },
            {
              id: 'refl_2',
              questionId: 'kas_q7',
              timestamp: Date.now() - 86400000 * 1,
              subject: 'Mental Ability',
              userSelectedOption: 2,
              correctOption: 1,
              errorReason: 'Over-inference',
              reflectionNote:
                'Jumped to conclusion that because Civil Servants are Administrators and some Administrators are Policy Makers, some Civil Servants must be Policy Makers.',
              actionItem:
                'Always sketch non-overlapping circles to test minimal conditions in CSAT Paper II.',
            },
          ];
    } catch {
      return [];
    }
  },

  addMistakeReflection(reflection: Omit<MistakeReflection, 'id' | 'timestamp'>): void {
    const list = this.getMistakeReflections();
    const item: MistakeReflection = {
      ...reflection,
      id: 'refl_' + Date.now(),
      timestamp: Date.now(),
    };
    const updated = [item, ...list];
    try {
      localStorage.setItem(STORAGE_KEYS.MISTAKE_REFLECTIONS, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    emitProgressUpdate();
  },

  // Exam Checklist State
  getChecklistState(): Record<string, boolean> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXAM_CHECKLIST);
      return data ? JSON.parse(data) : { admit_card: false, gov_id: true, pen: true, watch: false };
    } catch {
      return { admit_card: false, gov_id: true, pen: true, watch: false };
    }
  },

  saveChecklistState(state: Record<string, boolean>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAM_CHECKLIST, JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  },

  // User Preferences
  getPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return data ? { ...DEFAULT_PREFERENCES, ...JSON.parse(data) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  },

  savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
    const current = this.getPreferences();
    const updated = { ...current, ...prefs };
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    return updated;
  },
};
