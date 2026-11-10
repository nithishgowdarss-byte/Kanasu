import React, { useState, useEffect } from 'react';
import {
  PlayCircle,
  ArrowDown,
  BookOpen,
  ShieldAlert,
  Target,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  Flame,
} from 'lucide-react';
import { Language, JourneyProgressSummary } from '../types/kas';
import { HERO_HOOK_VARIANTS, MarketingHookVariant } from '../data/teachingData';
import { HindsightStorage, PROGRESS_UPDATED_EVENT } from '../services/hindsightStorage';

interface HeroSectionProps {
  language: Language;
  onStartMock: () => void;
  onOpenMasterclass: () => void;
  onOpenConcepts: () => void;
  onOpenCalculator: () => void;
  onOpenHindsight?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onStartMock,
  onOpenMasterclass,
  onOpenConcepts,
  onOpenCalculator,
  onOpenHindsight,
}) => {
  const [activeHookId, setActiveHookId] = useState<MarketingHookVariant['id']>('contrarian');
  const [journey, setJourney] = useState<JourneyProgressSummary>(() =>
    HindsightStorage.getJourneyProgressSummary()
  );

  useEffect(() => {
    const refreshJourney = () => {
      setJourney(HindsightStorage.getJourneyProgressSummary());
    };
    window.addEventListener(PROGRESS_UPDATED_EVENT, refreshJourney);
    window.addEventListener('storage', refreshJourney);
    return () => {
      window.removeEventListener(PROGRESS_UPDATED_EVENT, refreshJourney);
      window.removeEventListener('storage', refreshJourney);
    };
  }, []);

  const currentHook =
    HERO_HOOK_VARIANTS.find((h) => h.id === activeHookId) || HERO_HOOK_VARIANTS[0];

  const handleJumpToStudyTracker = () => {
    if (onOpenHindsight) {
      onOpenHindsight();
    } else {
      const el = document.getElementById('hindsight');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const masterclassPct = Math.round(
    (journey.masterclassCompletedIds.length / journey.masterclassTotal) * 100
  );
  const conceptsPct = Math.round(
    (journey.conceptsLearnedCount / journey.conceptsTotal) * 100
  );
  const mocksPct = Math.min(100, Math.round((journey.mockTestsAttemptedCount / 3) * 100));
  const studyPct = Math.min(
    100,
    Math.round((journey.todayStudyHours / Math.max(1, journey.dailyGoalHours)) * 100)
  );

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-14"
    >
      <div className="max-w-5xl mx-auto z-10 flex flex-col items-center w-full">
        {/* Interactive Hook Angle Selector (Functional Segmented Control) */}
        <div className="flex flex-wrap items-center justify-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg mb-6">
          {HERO_HOOK_VARIANTS.map((variant) => {
            const isActive = variant.id === activeHookId;
            return (
              <button
                key={variant.id}
                onClick={() => setActiveHookId(variant.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'kn' ? variant.frameworkLabelKn : variant.frameworkLabelEn}
              </button>
            );
          })}
        </div>

        {/* Unboxed Editorial Kicker (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono tracking-wide text-amber-400/90 mb-4">
          <span>{language === 'kn' ? currentHook.eyebrowKn : currentHook.eyebrowEn}</span>
        </div>

        {/* Hero Headline - Readable at 320px width (Condition 0005), Editorial Authority */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight text-white max-w-4xl leading-[1.14] mb-6 font-serif">
          {language === 'kn' ? currentHook.headlineKn : currentHook.headlineEn}
          <span className="text-amber-400">
            {language === 'kn' ? currentHook.accentSpanKn : currentHook.accentSpanEn}
          </span>
        </h1>

        {/* PAS / Value Proposition Subheadline - WCAG AA Compliant */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-6 leading-relaxed font-normal">
          {language === 'kn' ? currentHook.subheadlineKn : currentHook.subheadlineEn}
        </p>

        {/* Unboxed Proof Telemetry Line */}
        <div className="text-xs font-mono text-slate-400 mb-8 tabular-nums">
          {language === 'kn' ? currentHook.proofStatKn : currentHook.proofStatEn}
        </div>

        {/* Primary Focal Anchor CTA + Secondary Action Links (Page-CRO Hierarchy) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={onOpenMasterclass}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base rounded-xl shadow-xl transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-300 cursor-pointer"
          >
            <ShieldAlert className="w-5 h-5 text-slate-950" />
            <span>
              {language === 'kn'
                ? '೪೦-ಸೆಕೆಂಡ್ ಎಲಿಮಿನೇಷನ್ ಸೂತ್ರವನ್ನು ಪರೀಕ್ಷಿಸಿ'
                : 'Try the 40-Second Elimination Lab Now'}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={onStartMock}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-slate-900/95 hover:bg-slate-800 text-slate-100 font-semibold text-base rounded-xl border border-slate-700 hover:border-amber-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            <PlayCircle className="w-5 h-5 text-amber-400" />
            <span>
              {language === 'kn'
                ? '೧೦-ನಿಮಿಷದ ನೈಜ ಪ್ರಿಲಿಮ್ಸ್ ಪರೀಕ್ಷೆ ಎದುರಿಸಿ'
                : 'Take 10-Min Diagnostic Mock'}
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* NEW: Visual KAS Preparation Journey Progress Tracker (Live LocalStorage)  */}
        {/* ========================================================================= */}
        <div className="w-full max-w-5xl bg-[#0f172a]/95 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-10 text-left shadow-2xl">
          {/* Top Bar: Rank Title, Streak, & Overall Readiness */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-800/90">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold mb-1">
                {language === 'kn'
                  ? 'ನೈಜ ಸಮಯದ ಕೆಎಎಸ್ ಸಿದ್ಧತಾ ಪಥ · ಲೋಕಲ್ ಸ್ಟೋರೇಜ್ ಸಿಂಕ್'
                  : 'LIVE KAS PREPARATION JOURNEY TRACKER · PERSISTED TELEMETRY'}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'kn' ? journey.rankTitleKn : journey.rankTitleEn}</span>
                </h2>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 tabular-nums">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  {journey.studyStreakDays}-Day Discipline Streak
                </span>
              </div>
            </div>

            {/* Overall Readiness Meter */}
            <div className="flex items-center gap-3 sm:text-right shrink-0 tabular-nums">
              <div className="w-32 sm:w-36">
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>{language === 'kn' ? 'ಒಟ್ಟು ಸನ್ನದ್ಧತೆ' : 'Prelims Readiness'}</span>
                  <span className="text-amber-400 font-bold">{journey.overallReadinessPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${journey.overallReadinessPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4 Interactive Module Milestone Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 tabular-nums">
            {/* Node 1: Masterclass Completed */}
            <button
              onClick={onOpenMasterclass}
              className="group p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-amber-500/60 transition-all text-left cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>STEP 01 · TACTICS</span>
                  <span className={masterclassPct === 100 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {journey.masterclassCompletedIds.length}/{journey.masterclassTotal}
                  </span>
                </div>
                <div className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors mb-1">
                  {language === 'kn' ? 'ಎಲಿಮಿನೇಷನ್ ಮಾಸ್ಟರ್‌ಕ್ಲಾಸ್' : 'Masterclass Completed'}
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  {journey.masterclassCompletedIds.length >= journey.masterclassTotal
                    ? 'All 4 Elimination Weapons Armed'
                    : `${journey.masterclassTotal - journey.masterclassCompletedIds.length} weapons left to test`}
                </p>
              </div>
              <div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${masterclassPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-amber-400 group-hover:underline">
                  {language === 'kn' ? 'ಅಭ್ಯಾಸ ಮುಂದುವರಿಸಿ →' : 'Practice Weapons →'}
                </span>
              </div>
            </button>

            {/* Node 2: Concepts Learned */}
            <button
              onClick={onOpenConcepts}
              className="group p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-amber-500/60 transition-all text-left cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>STEP 02 · RECALL</span>
                  <span className="text-sky-400 font-bold">
                    {journey.conceptsLearnedCount}/{journey.conceptsTotal}
                  </span>
                </div>
                <div className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors mb-1">
                  {language === 'kn' ? 'ಕಲಿತ ಪ್ರಮುಖ ಪರಿಕಲ್ಪನೆಗಳು' : 'Concepts Learned'}
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  {language === 'kn'
                    ? '೪೫% ಕರ್ನಾಟಕ ಹೈ-ಯೀಲ್ಡ್ ಕಾರ್ಡ್‌ಗಳು'
                    : 'SM-2 Active Recall Flashcards'}
                </p>
              </div>
              <div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-sky-400 transition-all duration-500"
                    style={{ width: `${conceptsPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-sky-400 group-hover:underline">
                  {language === 'kn' ? 'ಕಾರ್ಡ್ಸ್ ತಿರುಗಿಸಿ →' : 'Flip Concept Cards →'}
                </span>
              </div>
            </button>

            {/* Node 3: Mock Tests Attempted */}
            <button
              onClick={onStartMock}
              className="group p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-amber-500/60 transition-all text-left cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>STEP 03 · SIMULATION</span>
                  <span className="text-emerald-400 font-bold">
                    {journey.mockTestsAttemptedCount} Done
                  </span>
                </div>
                <div className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors mb-1">
                  {language === 'kn' ? 'ಎದುರಿಸಿದ ಮಾದರಿ ಪರೀಕ್ಷೆಗಳು' : 'Mock Tests Attempted'}
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  {journey.mockTestsAttemptedCount > 0
                    ? `Peak Net Score: +${journey.bestMockScore}`
                    : '+2.00 / -0.50 Official Arena'}
                </p>
              </div>
              <div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-500"
                    style={{ width: `${Math.max(12, mocksPct)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 group-hover:underline">
                  {language === 'kn' ? 'ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ →' : 'Launch Timed Mock →'}
                </span>
              </div>
            </button>

            {/* Node 4: Daily Study Hours Logged */}
            <button
              onClick={handleJumpToStudyTracker}
              className="group p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-amber-500/60 transition-all text-left cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>STEP 04 · DAILY HOURS</span>
                  <span className="text-amber-400 font-bold">
                    {journey.todayStudyHours}h / {journey.dailyGoalHours}h
                  </span>
                </div>
                <div className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'kn' ? 'ಇಂದಿನ ಅಧ್ಯಯನ ಸಮಯ' : 'Daily Study Quota'}</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  {studyPct >= 100
                    ? 'Today’s Officer Quota Achieved!'
                    : `${Math.max(0, Number((journey.dailyGoalHours - journey.todayStudyHours).toFixed(1)))}h remaining today`}
                </p>
              </div>
              <div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${studyPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-amber-400 group-hover:underline">
                  {language === 'kn' ? 'ಗಂಟೆಗಳನ್ನು ದಾಖಲಿಸಿ →' : 'Log Study Hours →'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Secondary Quick-Jump Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 mb-10 border-y border-slate-800/80 py-3 px-6">
          <button
            onClick={onOpenConcepts}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {language === 'kn'
                ? '೪೫% ಕರ್ನಾಟಕ ವಿಶೇಷ ಫ್ಲಾಶ್‌ಕಾರ್ಡ್ಸ್ ನೋಡಿ →'
                : 'Explore 45% Karnataka Weightage Flashcards →'}
            </span>
          </button>
          <span className="hidden sm:inline text-slate-700">·</span>
          <button
            onClick={onOpenCalculator}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {language === 'kn'
                ? 'ನಿಮ್ಮ ಕಟ್‌ಆಫ್ ಅಟೆಮ್ಟ್ ಸಂಖ್ಯೆ ಲೆಕ್ಕಹಾಕಿ →'
                : 'Calculate Your Safe Attempt Number →'}
            </span>
          </button>
          <span className="hidden sm:inline text-slate-700">·</span>
          <button
            onClick={handleJumpToStudyTracker}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {language === 'kn'
                ? 'ದೈನಂದಿನ ಅಧ್ಯಯನ ಗಂಟೆ ಟ್ರ್ಯಾಕರ್ ತೆರೆಯಿರಿ →'
                : 'Configure Daily Study Hours Goal →'}
            </span>
          </button>
        </div>

        {/* Before-After-Bridge 4-Pillar Transformation Grid (Stacks to 1 col on mobile - Condition 0006) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl text-left">
          <div className="bg-slate-900/85 border border-slate-800 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 mb-1">01 · Pareto Focus</div>
            <div className="font-bold text-white text-sm mb-1.5">
              {language === 'kn'
                ? '೭೨% ಪ್ರಶ್ನೆ ಬರುವ ೨೮% ಪಠ್ಯಕ್ರಮ'
                : 'Stop Reading Low-Yield Filler'}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'kn'
                ? 'ಕದಂಬರು, ಮೈಸೂರು ದಿವಾನರು, ೩೭೧-ಜೆ ಮತ್ತು ನದಿ ಕೊಳ್ಳಗಳಿಂದಲೇ ಪ್ರತಿ ವರ್ಷ ೪೫+ ಪ್ರಶ್ನೆಗಳು ಬರುತ್ತವೆ.'
                : 'Lock in the 45% Karnataka-specific weightage (Kadambas, Diwans, 371-J, River Basins) before touching generic encyclopedias.'}
            </p>
          </div>

          <div className="bg-slate-900/85 border border-slate-800 rounded-xl p-5">
            <div className="text-xs font-mono text-amber-400 mb-1">02 · Elimination Reflex</div>
            <div className="font-bold text-white text-sm mb-1.5">
              {language === 'kn' ? '೧ ಸುಳ್ಳು ಪದ ಹಿಡಿದು ಉತ್ತರಿಸಿ' : 'Kill 3 Wrong Options in 40s'}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'kn'
                ? '"ಏಕೈಕ", "ಮಾತ್ರ" ಎಂಬ ಅತಿರೇಕದ ಪದಗಳನ್ನು ಗುರುತಿಸಿ ಮತ್ತು ೧ ಆಧಾರ ಜೋಡಿಯಿಂದ ಹೊಂದಿಸಿ ಬರೆಯಿರಿ ಗೆಲ್ಲಿರಿ.'
                : 'Spot extreme qualifiers ("solely", "only"), use 1-pair anchor matching, and reverse-plug CSAT options.'}
            </p>
          </div>

          <div className="bg-slate-900/85 border border-slate-800 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 mb-1">
              03 · Forgetting Curve Shield
            </div>
            <div className="font-bold text-white text-sm mb-1.5">
              {language === 'kn' ? 'ಮಾಡಿದ ತಪ್ಪು ಮತ್ತೆ ಮಾಡಬೇಡಿ' : 'Never Repeat the Same Mistake'}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'kn'
                ? 'ಹೈಂಡ್‌ಸೈಟ್ SM-2 ಸ್ಮರಣಶಕ್ತಿ ಕೋಶವು ನಿಮ್ಮ ದುರ್ಬಲ ವಿಷಯಗಳನ್ನು ಪರೀಕ್ಷಾ ದಿನದವರೆಗೆ ನೆನಪಿಸುತ್ತದೆ.'
                : 'Hindsight SM-2 tracking logs every -0.50 negative lapse and schedules active recall right before you forget.'}
            </p>
          </div>

          <div className="bg-slate-900/85 border border-slate-800 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 mb-1">04 · Cutoff Engineering</div>
            <div className="font-bold text-white text-sm mb-1.5">
              {language === 'kn' ? '೮೨+ ಪ್ರಶ್ನೆ ಉತ್ತರಿಸುವ ಧೈರ್ಯ' : 'Beat the 110+ Cutoff Safely'}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'kn'
                ? '೫೦:೫೦ ಸಾಧ್ಯತೆಯ ಪ್ರಶ್ನೆಗಳನ್ನು ಗಣಿತೀಯವಾಗಿ ಎದುರಿಸಿ ಕಟ್‌ಆಫ್‌ಗಿಂತ +೧೫ ಅಂಕ ಮುಂದಿರಿ.'
                : 'Turn 50:50 dilemmas into positive expected value (+2.50 net marks per 4 educated attempts) to clear Prelims.'}
            </p>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="mt-10 flex items-center gap-2 text-slate-400 text-xs font-mono">
          <span>
            {language === 'kn'
              ? 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ ೪೦-ಸೆಕೆಂಡ್ ಎಲಿಮಿನೇಷನ್ ಪ್ರಯೋಗಿಸಿ'
              : 'Scroll to test the 40-second elimination weapons on real KPSC questions'}
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>
    </section>
  );
};
