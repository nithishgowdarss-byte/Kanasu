import React, { useState, useEffect } from 'react';
import {
  Brain,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Award,
  Clock,
  Flame,
  Plus,
  Minus,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { TopicMastery, MistakeReflection, Language, DailyStudyConfig } from '../types/kas';
import {
  HindsightStorage,
  PROGRESS_UPDATED_EVENT,
  getTodayDateKey,
} from '../services/hindsightStorage';

interface HindsightDashboardProps {
  language: Language;
  onReviewTopic: (topic: string) => void;
}

export const HindsightDashboard: React.FC<HindsightDashboardProps> = ({
  language,
  onReviewTopic,
}) => {
  const [masteries, setMasteries] = useState<Record<string, TopicMastery>>({});
  const [reflections, setReflections] = useState<MistakeReflection[]>([]);
  const [studyConfig, setStudyConfig] = useState<DailyStudyConfig>(() =>
    HindsightStorage.getDailyStudyConfig()
  );
  const [sevenDaySeries, setSevenDaySeries] = useState(() =>
    HindsightStorage.getSevenDayStudySeries()
  );
  const [activeSubTab, setActiveSubTab] = useState<'spaced' | 'mistakes' | 'analytics'>('spaced');

  // Built-in Deep-Work Pomodoro Sprint Timer state
  const [sprintRunning, setSprintRunning] = useState(false);
  const [sprintSecondsLeft, setSprintSecondsLeft] = useState(30 * 60); // 30-min block (= 0.5h)
  const [sprintPaperTarget, setSprintPaperTarget] = useState<'paper1' | 'paper2'>('paper1');
  const [sprintNotice, setSprintNotice] = useState<string | null>(null);

  // Custom Mistake Autopsy Quick-Logger state
  const [newErrorSubject, setNewErrorSubject] = useState('Karnataka History');
  const [newErrorReason, setNewErrorReason] =
    useState<MistakeReflection['errorReason']>('Negative Mark Trap');
  const [newReflectionNote, setNewReflectionNote] = useState('');
  const [newActionItem, setNewActionItem] = useState('');

  const loadData = () => {
    setMasteries(HindsightStorage.getTopicMasteries());
    setReflections(HindsightStorage.getMistakeReflections());
    setStudyConfig(HindsightStorage.getDailyStudyConfig());
    setSevenDaySeries(HindsightStorage.getSevenDayStudySeries());
  };

  useEffect(() => {
    loadData();
    window.addEventListener(PROGRESS_UPDATED_EVENT, loadData);
    window.addEventListener('storage', loadData);
    return () => {
      window.removeEventListener(PROGRESS_UPDATED_EVENT, loadData);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  // Deep-Work Sprint countdown effect
  useEffect(() => {
    if (!sprintRunning) return;
    const timer = setInterval(() => {
      setSprintSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSprintRunning(false);
          if (sprintPaperTarget === 'paper1') {
            HindsightStorage.logStudyHours(0.5, 0);
          } else {
            HindsightStorage.logStudyHours(0, 0.5);
          }
          setSprintNotice('+0.5h Deep-Work Sprint automatically logged to today’s record!');
          return 30 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [sprintRunning, sprintPaperTarget]);

  const handleGoalChange = (newGoal: number) => {
    const updated = HindsightStorage.setDailyGoalHours(newGoal);
    setStudyConfig({ ...updated });
    setSevenDaySeries(HindsightStorage.getSevenDayStudySeries());
  };

  const handleLogHours = (p1Delta: number, p2Delta: number) => {
    const updated = HindsightStorage.logStudyHours(p1Delta, p2Delta);
    setStudyConfig({ ...updated });
    setSevenDaySeries(HindsightStorage.getSevenDayStudySeries());
  };

  const handleInstantCommitSprint = () => {
    if (sprintPaperTarget === 'paper1') {
      handleLogHours(0.5, 0);
    } else {
      handleLogHours(0, 0.5);
    }
    setSprintRunning(false);
    setSprintSecondsLeft(30 * 60);
    setSprintNotice(
      `+0.5h logged to ${
        sprintPaperTarget === 'paper1' ? 'Paper I (GS & Karnataka)' : 'Paper II (CSAT & S&T)'
      }`
    );
    setTimeout(() => setSprintNotice(null), 3500);
  };

  const handleAddCustomReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReflectionNote.trim()) return;
    HindsightStorage.addMistakeReflection({
      questionId: 'manual_' + Date.now(),
      subject: newErrorSubject,
      userSelectedOption: 1,
      correctOption: 0,
      errorReason: newErrorReason,
      reflectionNote: newReflectionNote.trim(),
      actionItem:
        newActionItem.trim() ||
        'Apply 50/50 Extreme-Word & Anchor Elimination before marking OMR.',
    });
    setNewReflectionNote('');
    setNewActionItem('');
    loadData();
  };

  const todayKey = getTodayDateKey(0);
  const todayLog = studyConfig.logs[todayKey] || {
    date: todayKey,
    paper1Hours: 0,
    paper2Hours: 0,
    totalHours: 0,
    targetHours: studyConfig.dailyGoalHours,
  };

  const dailyProgressPct = Math.min(
    100,
    Math.round((todayLog.totalHours / Math.max(1, studyConfig.dailyGoalHours)) * 100)
  );
  const weeklyTotalHours = Number(
    sevenDaySeries.reduce((acc, d) => acc + d.totalHours, 0).toFixed(1)
  );
  const weeklyTargetHours = Number((studyConfig.dailyGoalHours * 7).toFixed(1));

  const masteryList = Object.values(masteries);
  const weakTopics = masteryList.filter((t) => t.easeFactor < 2.3 || t.repeatedMistakes >= 2);
  const strongTopics = masteryList.filter((t) => t.easeFactor >= 2.5);

  const totalReviewsDone = masteryList.reduce((acc, t) => acc + t.totalAttempts, 0);
  const overallAccuracy =
    totalReviewsDone > 0
      ? Math.round(
          (masteryList.reduce((acc, t) => acc + t.correctAttempts, 0) / totalReviewsDone) * 100
        )
      : 78;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <section id="hindsight" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header — Ebbinghaus Forgetting Curve Hook */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="max-w-3xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-sky-400 font-semibold mb-3">
            {language === 'kn'
              ? '06 · ಸ್ಮರಣಶಕ್ತಿ ಎಂಜಿನ್ · ದೋಷ ಪುನರಾವರ್ತನೆ ತಡೆ'
              : '06 · Spaced Repetition Memory · Error Ledger & Study Hours'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
            {language === 'kn'
              ? 'ಇಂದು ಓದಿದ ಶೇ. ೭೦ ರಷ್ಟು ಮಾಹಿತಿ ೭ ದಿನಗಳಲ್ಲಿ ಮರೆತುಹೋಗುತ್ತದೆ—ನಿಮ್ಮ ತಪ್ಪುಗಳನ್ನು ಇಲ್ಲಿ ದಾಖಲಿಸದಿದ್ದರೆ!'
              : 'You Will Forget 70% of What You Read Today Within 7 Days—Unless You Log Your Cognitive Blindspots.'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'kn'
              ? 'ಮತ್ತೆ ಮತ್ತೆ ಅದೇ ತಪ್ಪುಗಳನ್ನು ಮಾಡಿ ಅಂಕ ಕಳೆದುಕೊಳ್ಳುವುದನ್ನು ತಡೆಯಲು ಸೂಪರ್‌ಮೆಮೊ SM-2 ಅಲ್ಗಾರಿದಮ್ ನಿಮ್ಮ ದುರ್ಬಲ ವಿಷಯಗಳನ್ನು ಮತ್ತು ದೈನಂದಿನ ಅಧ್ಯಯನ ಗಂಟೆಗಳನ್ನು ಪರೀಕ್ಷಾ ದಿನದವರೆಗೂ ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತದೆ.'
              : 'Reading the same chapter twice is passive comfort. Actively logging your daily Paper I & Paper II hours alongside your distractor traps permanently rewires your exam recall.'}
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
            <span>Sync Memory Ledger</span>
          </button>
        </div>
      </div>

      {/* ================================================================================= */}
      {/* Daily Study Hours & Deep-Work Telemetry Widget (Browser LocalStorage Synced)      */}
      {/* ================================================================================= */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-7 mb-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-800">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold mb-1">
              {language === 'kn'
                ? 'ದೈನಂದಿನ ಅಧ್ಯಯನ ಗಂಟೆಗಳ ಟ್ರ್ಯಾಕರ್ · ಲೋಕಲ್ ಸ್ಟೋರೇಜ್'
                : 'DAILY KPSC STUDY HOURS & DEEP-WORK WIDGET · LOCALSTORAGE SYNCED'}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-serif flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>
                {language === 'kn'
                  ? 'ನಿಮ್ಮ ಇಂದಿನ ಪತ್ರಿಕೆ ೧ ಮತ್ತು ಪತ್ರಿಕೆ ೨ ರ ಅಭ್ಯಾಸದ ಲೆಕ್ಕಾಚಾರ'
                  : 'Compound Your Daily Study Hours Before Prelims Notification Hits'}
              </span>
            </h3>
          </div>

          {/* Streak & Weekly Cumulative Telemetry */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs tabular-nums">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 font-bold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{studyConfig.streakDays}-Day Target Streak</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <span>7-Day Volume: </span>
              <strong className="text-emerald-400">{weeklyTotalHours}h</strong>
              <span className="text-slate-500"> / {weeklyTargetHours}h</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Column 1 (5 cols): Goal Configuration & Paper I / II Hour Loggers */}
          <div className="lg:col-span-5 space-y-5">
            {/* Daily Target Slider + Persona Presets */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90">
              <div className="flex items-center justify-between text-xs font-mono mb-2 tabular-nums">
                <span className="text-slate-300 font-semibold">
                  {language === 'kn' ? 'ದೈನಂದಿನ ಗುರಿ (ಗಂಟೆಗಳು):' : 'Daily Study Target Goal:'}
                </span>
                <span className="text-amber-400 font-bold text-base">
                  {studyConfig.dailyGoalHours.toFixed(1)} hrs/day
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="14"
                step="0.5"
                value={studyConfig.dailyGoalHours}
                onChange={(e) => handleGoalChange(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-900 rounded-lg mb-3"
              />
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] font-mono">
                {[
                  { label: 'Working Pro (4h)', val: 4.0 },
                  { label: 'Standard (6h)', val: 6.0 },
                  { label: 'Full-Time (8h)', val: 8.0 },
                  { label: 'Final Sprint (10h)', val: 10.0 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => handleGoalChange(preset.val)}
                    className={`px-2 py-1 rounded border transition-colors cursor-pointer ${
                      studyConfig.dailyGoalHours === preset.val
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper I & Paper II Direct Hour Logging Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 tabular-nums">
              {/* Paper I Logger */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90">
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">
                  PAPER I · GS & KARNATAKA
                </div>
                <div className="text-2xl font-bold text-white font-mono mb-3">
                  {todayLog.paper1Hours.toFixed(1)}{' '}
                  <span className="text-xs font-normal text-slate-400">hrs today</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLogHours(-0.5, 0)}
                    disabled={todayLog.paper1Hours <= 0}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-700 text-xs font-mono text-slate-300 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" /> 0.5h
                  </button>
                  <button
                    onClick={() => handleLogHours(0.5, 0)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> 0.5h
                  </button>
                </div>
              </div>

              {/* Paper II Logger */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90">
                <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 mb-1">
                  PAPER II · CSAT & S&T
                </div>
                <div className="text-2xl font-bold text-white font-mono mb-3">
                  {todayLog.paper2Hours.toFixed(1)}{' '}
                  <span className="text-xs font-normal text-slate-400">hrs today</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLogHours(0, -0.5)}
                    disabled={todayLog.paper2Hours <= 0}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-700 text-xs font-mono text-slate-300 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" /> 0.5h
                  </button>
                  <button
                    onClick={() => handleLogHours(0, 0.5)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> 0.5h
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 (4 cols): 7-Day Visual Consistency Bar Chart */}
          <div className="lg:col-span-4 p-4 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col justify-between h-full tabular-nums">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-300 font-semibold">
                  {language === 'kn' ? 'ಇಂದಿನ ಪ್ರಗತಿ:' : 'Today’s Quota Fulfillment:'}
                </span>
                <span
                  className={
                    dailyProgressPct >= 100
                      ? 'text-emerald-400 font-bold'
                      : 'text-amber-400 font-bold'
                  }
                >
                  {todayLog.totalHours.toFixed(1)}h / {studyConfig.dailyGoalHours.toFixed(1)}h (
                  {dailyProgressPct}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mb-5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${dailyProgressPct}%` }}
                />
              </div>
            </div>

            {/* 7-Day Bar Chart */}
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
                7-Day Study Consistency (Paper I + Paper II)
              </div>
              <div className="grid grid-cols-7 gap-2 items-end h-28 pt-4 px-1 border-b border-slate-800">
                {sevenDaySeries.map((day) => {
                  const maxScale = Math.max(10, studyConfig.dailyGoalHours * 1.2);
                  const heightPct = Math.min(100, Math.round((day.totalHours / maxScale) * 100));
                  const metGoal = day.totalHours >= day.targetHours;
                  return (
                    <div
                      key={day.date}
                      className="flex flex-col items-center justify-end h-full gap-1"
                    >
                      <span className="text-[10px] font-mono text-slate-400">
                        {day.totalHours.toFixed(1)}
                      </span>
                      <div className="w-full bg-slate-900 rounded-t-md h-20 flex items-end overflow-hidden border border-slate-800/80">
                        <div
                          className={`w-full transition-all duration-300 rounded-t ${
                            day.isToday
                              ? 'bg-amber-400'
                              : metGoal
                              ? 'bg-emerald-500/80'
                              : 'bg-sky-500/60'
                          }`}
                          style={{ height: `${Math.max(8, heightPct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-7 gap-2 text-center mt-1.5">
                {sevenDaySeries.map((day) => (
                  <span
                    key={day.date}
                    className={`text-[10px] font-mono ${
                      day.isToday ? 'text-amber-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {day.dayLabel}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3 (3 cols): Built-In 30-Min Deep-Work Focus Timer */}
          <div className="lg:col-span-3 p-4 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col justify-between tabular-nums">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1">
                DEEP-WORK POMODORO SPRINT
              </div>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Run a distraction-free 30-min block (+0.5h) and log it straight to your permanent
                ledger.
              </p>

              {/* Paper Toggle for Sprint */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 mb-3 text-[11px] font-mono">
                <button
                  onClick={() => setSprintPaperTarget('paper1')}
                  className={`py-1 rounded cursor-pointer transition-colors ${
                    sprintPaperTarget === 'paper1'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Paper I (GS)
                </button>
                <button
                  onClick={() => setSprintPaperTarget('paper2')}
                  className={`py-1 rounded cursor-pointer transition-colors ${
                    sprintPaperTarget === 'paper2'
                      ? 'bg-sky-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Paper II (CSAT)
                </button>
              </div>

              <div className="text-center py-2 mb-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-3xl font-black font-mono text-white tracking-wider">
                  {formatTimer(sprintSecondsLeft)}
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  30-Min Officer Focus Block (+0.5h)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSprintRunning(!sprintRunning)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono cursor-pointer"
                >
                  {sprintRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Start Sprint
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setSprintRunning(false);
                    setSprintSecondsLeft(30 * 60);
                  }}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleInstantCommitSprint}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono cursor-pointer transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Complete & Log +0.5h Now</span>
              </button>

              {sprintNotice && (
                <div className="text-[11px] font-mono text-emerald-400 text-center pt-1">
                  {sprintNotice}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 tabular-nums">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Active Recall Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{overallAccuracy}%</div>
          <span className="text-[11px] text-emerald-400 font-medium">
            Consolidated across mocks
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>High-Risk Blindspots</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{weakTopics.length}</div>
          <span className="text-[11px] text-amber-300 font-medium">
            Prioritized for immediate review
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Locked-In Concepts</span>
            <Award className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-sky-400 font-mono">{strongTopics.length}</div>
          <span className="text-[11px] text-sky-300 font-medium">SM-2 Ease Factor ≥ 2.50</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Traps Neutralized</span>
            <Brain className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400 font-mono">{reflections.length}</div>
          <span className="text-[11px] text-purple-300 font-medium">Permanent error anchors</span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-800 mb-6 gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveSubTab('spaced')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'spaced'
              ? 'border-amber-500 text-amber-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Spaced Review Queue (SM-2)
        </button>
        <button
          onClick={() => setActiveSubTab('mistakes')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'mistakes'
              ? 'border-amber-500 text-amber-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Mistake Autopsy Ledger ({reflections.length})
        </button>
        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'analytics'
              ? 'border-amber-500 text-amber-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Negative Marking (-0.50) Radar
        </button>
      </div>

      {/* Tab 1: Spaced Review Schedule */}
      {activeSubTab === 'spaced' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {masteryList.map((top) => {
              const isDue = top.nextReviewDate <= Date.now() + 86400000;
              const isWeak = top.easeFactor < 2.3;
              return (
                <div
                  key={top.topicId}
                  className={`p-4 rounded-xl border transition-all ${
                    isDue
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-[#0f172a] border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">
                          {language === 'kn' ? top.topicNameKn : top.topicNameEn}
                        </h4>
                        {isDue && (
                          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-400">
                            • REVIEW DUE
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{top.subject}</span>
                    </div>

                    <div className="text-right font-mono text-xs tabular-nums">
                      <span className="text-slate-400">Ease: </span>
                      <span
                        className={`font-bold ${isWeak ? 'text-amber-400' : 'text-emerald-400'}`}
                      >
                        {top.easeFactor}
                      </span>
                    </div>
                  </div>

                  {/* Notes / Cognitive Anchors */}
                  {top.notes && top.notes.length > 0 && (
                    <div className="mt-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 space-y-1">
                      {top.notes.map((n, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-500">•</span>
                          <span>{n}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
                    <span>
                      Repeated Lapses: <strong className="text-red-400">{top.repeatedMistakes}</strong>
                    </span>
                    <div className="flex items-center gap-3">
                      <span>
                        Interval: <strong>{top.intervalDays}d</strong>
                      </span>
                      <button
                        onClick={() => onReviewTopic(top.topicNameEn)}
                        className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Drill Now</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Error Reflection Journal + Quick Custom Mistake Logger */}
      {activeSubTab === 'mistakes' && (
        <div className="space-y-6">
          {/* Manual Mistake Logger Form */}
          <form
            onSubmit={handleAddCustomReflection}
            className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 space-y-3"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              + LOG NEW DISTRACTOR TRAP OR NEGATIVE MARK LAPSE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={newErrorSubject}
                onChange={(e) => setNewErrorSubject(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono"
              >
                <option value="Karnataka History">Karnataka History</option>
                <option value="Karnataka Governance">Karnataka Governance & 371(J)</option>
                <option value="Environment & Ecology">Western Ghats & Ecology</option>
                <option value="Mental Ability">Paper II Mental Ability (CSAT)</option>
                <option value="Karnataka Economy">State Budget & Economic Survey</option>
              </select>

              <select
                value={newErrorReason}
                onChange={(e) =>
                  setNewErrorReason(e.target.value as MistakeReflection['errorReason'])
                }
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono"
              >
                <option value="Negative Mark Trap">Negative Mark Trap (-0.50)</option>
                <option value="Factual Blindspot">Factual Blindspot</option>
                <option value="Over-inference">Over-inference (Venn / Statement)</option>
                <option value="Misread Question">Misread "NOT Correct" / Keyword</option>
                <option value="Calculation Error">CSAT Calculation Error</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newReflectionNote}
                onChange={(e) => setNewReflectionNote(e.target.value)}
                placeholder="What trap did you fall for? (e.g. Confused Gadgil 100% with Kasturirangan 37%)"
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newActionItem}
                  onChange={(e) => setNewActionItem(e.target.value)}
                  placeholder="Counter-measure rule for exam day..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs font-mono shrink-0 cursor-pointer"
                >
                  Save Trap
                </button>
              </div>
            </div>
          </form>

          {reflections.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No mistakes logged yet. Complete a timed mock test to automatically capture your
              cognitive blindspots.
            </div>
          ) : (
            reflections.map((ref) => (
              <div
                key={ref.id}
                className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-red-400 font-bold uppercase tracking-wider">
                      [{ref.errorReason}]
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-300">{ref.subject}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 tabular-nums">
                    {new Date(ref.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-200 mb-1">
                  <p>
                    <strong className="text-amber-400">Cognitive Root Cause:</strong>{' '}
                    {ref.reflectionNote}
                  </p>
                  <p className="text-sky-300 text-xs font-mono bg-sky-950/30 p-2.5 rounded border border-sky-800/40">
                    <strong>Counter-Measure Rule:</strong> {ref.actionItem}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Cognitive Weak-Area Heatmap */}
      {activeSubTab === 'analytics' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">
            Where You Bleed -0.50 Penalty Marks Most Frequently
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Historical vulnerability distribution across high-trap KPSC domains. Fix the red bars
            first to immediately add +8 to +12 net marks.
          </p>

          <div className="space-y-4 tabular-nums">
            {[
              {
                name: 'Karnataka History (Chronology & Royal Patronage Swaps)',
                vulnerability: 68,
                color: 'bg-amber-500',
              },
              {
                name: 'Mental Ability (Syllogisms & Venn Diagram Overlaps)',
                vulnerability: 75,
                color: 'bg-red-500',
              },
              {
                name: 'Polity & Article 371(J) Institutional Quotas',
                vulnerability: 54,
                color: 'bg-amber-500',
              },
              {
                name: 'Western Ghats Ecology & Committee Recommendations',
                vulnerability: 32,
                color: 'bg-emerald-500',
              },
              {
                name: 'Karnataka Economic Survey & Fiscal Deficit Targets',
                vulnerability: 25,
                color: 'bg-emerald-500',
              },
            ].map((sub, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-slate-200 font-semibold">{sub.name}</span>
                  <span className="text-slate-400">{sub.vulnerability}% Trap Vulnerability</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full ${sub.color} rounded-full transition-all`}
                    style={{ width: `${sub.vulnerability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
