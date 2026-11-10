export type Language = 'en' | 'kn';

export type QuestionType = 'statement' | 'match' | 'assertion_reason' | 'mental_ability' | 'standard';

export interface Question {
  id: string;
  paper: 'paper1' | 'paper2';
  subject: string;
  topic: string;
  type: QuestionType;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  textEn: string;
  textKn: string;
  statementsEn?: string[];
  statementsKn?: string[];
  matchPairsEn?: { left: string; right: string }[];
  matchPairsKn?: { left: string; right: string }[];
  assertionEn?: string;
  assertionKn?: string;
  reasonEn?: string;
  reasonKn?: string;
  optionsEn: string[];
  optionsKn: string[];
  correctIndex: number;
  explanationEn: string;
  explanationKn: string;
  eliminationTechniqueEn: string;
  eliminationTechniqueKn: string;
  mentalAbilitySteps?: string[];
}

export interface MockTestResult {
  id: string;
  timestamp: number;
  paper: 'paper1' | 'paper2' | 'both';
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number; // +2 for correct, -0.5 for wrong
  accuracy: number;
  timeSpentSeconds: number;
  subjectBreakdown: Record<string, { total: number; correct: number; wrong: number }>;
  incorrectQuestionIds: string[];
}

export interface TopicMastery {
  topicId: string;
  topicNameEn: string;
  topicNameKn: string;
  subject: string;
  totalAttempts: number;
  correctAttempts: number;
  lastReviewed: number;
  easeFactor: number; // SuperMemo style, starts at 2.5
  intervalDays: number;
  nextReviewDate: number;
  repeatedMistakes: number;
  notes: string[];
}

export interface MistakeReflection {
  id: string;
  questionId: string;
  timestamp: number;
  subject: string;
  userSelectedOption: number;
  correctOption: number;
  errorReason: 'Factual Blindspot' | 'Over-inference' | 'Misread Question' | 'Calculation Error' | 'Negative Mark Trap';
  reflectionNote: string;
  actionItem: string;
}

export interface SyllabusItem {
  id: string;
  paper: 'Paper I' | 'Paper II';
  subject: string;
  subjectKn: string;
  weightagePercent: number;
  pyqTrendEn: string;
  pyqTrendKn: string;
  topics: {
    nameEn: string;
    nameKn: string;
    highYield: boolean;
  }[];
}

export interface DailyStudyLog {
  date: string; // YYYY-MM-DD
  paper1Hours: number;
  paper2Hours: number;
  totalHours: number;
  targetHours: number;
}

export interface DailyStudyConfig {
  dailyGoalHours: number;
  streakDays: number;
  logs: Record<string, DailyStudyLog>;
}

export interface JourneyProgressSummary {
  masterclassCompletedIds: string[];
  masterclassTotal: number;
  conceptsLearnedCount: number;
  conceptsTotal: number;
  mockTestsAttemptedCount: number;
  bestMockScore: number;
  todayStudyHours: number;
  dailyGoalHours: number;
  studyStreakDays: number;
  overallReadinessPct: number;
  rankTitleEn: string;
  rankTitleKn: string;
}
