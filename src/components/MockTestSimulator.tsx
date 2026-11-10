import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, AlertTriangle, Clock, HelpCircle, 
  ChevronLeft, ChevronRight, Bookmark, RotateCcw, Award, Lightbulb, 
  ArrowRight, ShieldAlert, BarChart3, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, Language, MockTestResult } from '../types/kas';
import { QUESTION_BANK } from '../data/kasData';
import { HindsightStorage } from '../services/hindsightStorage';

interface MockTestSimulatorProps {
  language: Language;
  onClose: () => void;
  onSaveResult: (result: MockTestResult) => void;
  onJumpToHindsight?: () => void;
}

export const MockTestSimulator: React.FC<MockTestSimulatorProps> = ({
  language,
  onClose,
  onSaveResult,
  onJumpToHindsight,
}) => {
  const [paperFilter, setPaperFilter] = useState<'all' | 'paper1' | 'paper2'>('all');
  const [questions, setQuestions] = useState<Question[]>(QUESTION_BANK);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [showElimination, setShowElimination] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes for this high-yield sectional block
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<MockTestResult | null>(null);

  // Filter questions by selected paper
  useEffect(() => {
    let filtered = QUESTION_BANK;
    if (paperFilter === 'paper1') filtered = QUESTION_BANK.filter(q => q.paper === 'paper1');
    if (paperFilter === 'paper2') filtered = QUESTION_BANK.filter(q => q.paper === 'paper2');
    setQuestions(filtered);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setIsSubmitted(false);
    setResult(null);
    setTimeLeft(filtered.length * 60); // 1 min per question
  }, [paperFilter]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, questions, selectedAnswers]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optIdx
    }));
  };

  const handleToggleMark = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const handleSubmitTest = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    const subjectMap: Record<string, { total: number; correct: number; wrong: number }> = {};
    const incorrectIds: string[] = [];

    questions.forEach((q, idx) => {
      if (!subjectMap[q.subject]) {
        subjectMap[q.subject] = { total: 0, correct: 0, wrong: 0 };
      }
      subjectMap[q.subject].total++;

      const ans = selectedAnswers[idx];
      if (ans === undefined) {
        skipped++;
      } else if (ans === q.correctIndex) {
        correct++;
        subjectMap[q.subject].correct++;
        // Update SM-2 with good quality
        HindsightStorage.updateTopicMastery(q.topic, true, 4);
      } else {
        wrong++;
        subjectMap[q.subject].wrong++;
        incorrectIds.push(q.id);
        // Record mistake in Hindsight
        HindsightStorage.updateTopicMastery(q.topic, false, 1);
        HindsightStorage.addMistakeReflection({
          questionId: q.id,
          subject: q.subject,
          userSelectedOption: ans,
          correctOption: q.correctIndex,
          errorReason: 'Factual Blindspot',
          reflectionNote: `Failed on ${q.topic}. Correct answer: ${q.optionsEn[q.correctIndex]}`,
          actionItem: `Review ${q.topic} using KPSC trend notes.`
        });
      }
    });

    // KPSC Official Marking: +2 for correct, -0.5 for wrong (0.25 negative)
    const rawScore = (correct * 2) - (wrong * 0.5);
    const finalScore = Number(rawScore.toFixed(2));
    const accuracy = correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;

    const testRes: MockTestResult = {
      id: 'mock_' + Date.now(),
      timestamp: Date.now(),
      paper: paperFilter === 'paper1' ? 'paper1' : paperFilter === 'paper2' ? 'paper2' : 'both',
      totalQuestions: questions.length,
      attempted: correct + wrong,
      correct,
      wrong,
      skipped,
      score: finalScore,
      accuracy,
      timeSpentSeconds: (questions.length * 60) - timeLeft,
      subjectBreakdown: subjectMap,
      incorrectQuestionIds: incorrectIds,
    };

    setResult(testRes);
    setIsSubmitted(true);
    HindsightStorage.saveTestResult(testRes);
    if (paperFilter === 'paper2') {
      HindsightStorage.logStudyHours(0, 0.5);
    } else {
      HindsightStorage.logStudyHours(0.5, 0);
    }
    onSaveResult(testRes);

    if (finalScore > (questions.length * 2 * 0.6)) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Cockpit Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
              KPSC OFFICIAL PATTERN
            </span>
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setPaperFilter('all')}
                className={`px-2 py-1 rounded ${paperFilter === 'all' ? 'bg-amber-600 text-white font-semibold' : 'text-slate-400'}`}
              >
                Combined
              </button>
              <button
                onClick={() => setPaperFilter('paper1')}
                className={`px-2 py-1 rounded ${paperFilter === 'paper1' ? 'bg-amber-600 text-white font-semibold' : 'text-slate-400'}`}
              >
                Paper I (GS)
              </button>
              <button
                onClick={() => setPaperFilter('paper2')}
                className={`px-2 py-1 rounded ${paperFilter === 'paper2' ? 'bg-amber-600 text-white font-semibold' : 'text-slate-400'}`}
              >
                Paper II (CSAT)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Clock Timer */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm border ${
              timeLeft < 120 ? 'bg-red-950/60 border-red-500 text-red-300 animate-pulse' : 'bg-slate-950 border-slate-800 text-amber-400'
            }`}>
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close mock test"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content: Split into Question View & Question Palette */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left: Active Question Display (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              {/* Question Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400 font-mono text-sm">
                    Q {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {currentQ.subject}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono">
                    {currentQ.type.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-medium">+2.00</span>
                  <span>/</span>
                  <span className="text-red-400 font-medium">-0.50</span>
                  <span className="text-[11px] text-slate-400">(0.25 negative)</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <p className="text-base sm:text-lg font-medium text-slate-100 mb-3 leading-relaxed">
                  {language === 'kn' ? currentQ.textKn : currentQ.textEn}
                </p>

                {/* Optional Statements Render */}
                {currentQ.statementsEn && (
                  <div className="space-y-2 mb-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                    {(language === 'kn' ? currentQ.statementsKn! : currentQ.statementsEn).map((st, i) => (
                      <div key={i} className="flex gap-2.5 text-sm text-slate-200">
                        <span className="font-bold text-amber-400 font-mono">{i + 1}.</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional Match Pairs Render */}
                {currentQ.matchPairsEn && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-sm">
                    {(language === 'kn' ? currentQ.matchPairsKn! : currentQ.matchPairsEn).map((pair, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-950/80 border border-slate-800">
                        <span className="text-amber-300 font-medium">{pair.left}</span>
                        <span className="text-slate-300">{pair.right}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional Assertion - Reason Render */}
                {currentQ.assertionEn && (
                  <div className="space-y-2 mb-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-sm">
                    <p className="text-slate-200">
                      <strong className="text-amber-400 font-mono">Assertion (A):</strong>{' '}
                      {language === 'kn' ? currentQ.assertionKn : currentQ.assertionEn}
                    </p>
                    <p className="text-slate-200">
                      <strong className="text-sky-400 font-mono">Reason (R):</strong>{' '}
                      {language === 'kn' ? currentQ.reasonKn : currentQ.reasonEn}
                    </p>
                  </div>
                )}
              </div>

              {/* Options Selection List */}
              <div className="space-y-3 mb-6">
                {(language === 'kn' ? currentQ.optionsKn : currentQ.optionsEn).map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-900/60';

                  if (isSubmitted) {
                    if (optIdx === currentQ.correctIndex) {
                      borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                    } else if (isSelected && optIdx !== currentQ.correctIndex) {
                      borderClass = 'border-red-500 bg-red-950/40 text-red-200';
                    }
                  } else if (isSelected) {
                    borderClass = 'border-amber-500 bg-amber-500/10 text-white shadow-md shadow-amber-950/30';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${borderClass}`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono mt-0.5 shrink-0 ${
                        isSelected ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-sm font-medium leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Smart Elimination Tip Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowElimination(!showElimination)}
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showElimination ? 'Hide Elimination Strategy' : 'Show KAS Elimination Technique'}</span>
                </button>
                {showElimination && (
                  <div className="mt-2 p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-amber-200/90 leading-relaxed">
                    <p className="font-semibold text-amber-300 mb-1">KPSC Elimination Anchor:</p>
                    <p>{language === 'kn' ? currentQ.eliminationTechniqueKn : currentQ.eliminationTechniqueEn}</p>
                  </div>
                )}
              </div>

              {/* Post-Submission Detailed Explanation */}
              {isSubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm">
                  <div className="flex items-center gap-2 mb-2 font-bold">
                    {selectedAnswers[currentIndex] === currentQ.correctIndex ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct (+2.00)
                      </span>
                    ) : selectedAnswers[currentIndex] !== undefined ? (
                      <span className="text-red-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect (-0.50 Penalty)
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" /> Skipped (0.00)
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-2">
                    {language === 'kn' ? currentQ.explanationKn : currentQ.explanationEn}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Question Action Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-6">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>

                <button
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {!isSubmitted && (
                  <button
                    onClick={handleToggleMark}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
                      markedForReview[currentIndex]
                        ? 'bg-purple-950/50 border-purple-500 text-purple-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{markedForReview[currentIndex] ? 'Marked' : 'Review Later'}</span>
                  </button>
                )}

                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitTest}
                    className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold rounded-xl text-xs shadow-md cursor-pointer"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSelectedAnswers({});
                      setMarkedForReview({});
                      setTimeLeft(questions.length * 60);
                      setCurrentIndex(0);
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> Retake
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Question Matrix & Stats Palette (lg:col-span-1) */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Question Palette
              </h3>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-400 font-mono mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Attempted
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Flagged
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" /> Skipped
                </div>
                {isSubmitted && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Correct
                  </div>
                )}
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = currentIndex === idx;
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isFlagged = markedForReview[idx];
                  let btnColor = 'bg-slate-900 border-slate-800 text-slate-400';

                  if (isSubmitted) {
                    if (selectedAnswers[idx] === q.correctIndex) {
                      btnColor = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isAnswered) {
                      btnColor = 'bg-red-950 border-red-500 text-red-300 font-bold';
                    }
                  } else if (isAnswered) {
                    btnColor = 'bg-amber-600/30 border-amber-500 text-amber-300 font-bold';
                  } else if (isFlagged) {
                    btnColor = 'bg-purple-950/60 border-purple-500 text-purple-300';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-lg border text-xs font-mono transition-all cursor-pointer ${btnColor} ${
                        isCurrent ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result Snapshot Box when Submitted */}
            {isSubmitted && result && (
              <div className="mt-4 p-3.5 bg-slate-900/90 rounded-xl border border-amber-500/30 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-200">Your Prelims Score</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-extrabold text-amber-400 font-mono mb-1">
                  {result.score} <span className="text-xs font-normal text-slate-400">/ {questions.length * 2}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400 font-mono">
                  <div>Correct: <span className="text-emerald-400 font-bold">{result.correct}</span></div>
                  <div>Wrong: <span className="text-red-400 font-bold">{result.wrong}</span></div>
                  <div>Accuracy: <span className="text-amber-300 font-bold">{result.accuracy}%</span></div>
                  <div>Penalties: <span className="text-red-400 font-bold">{(result.wrong * 0.5).toFixed(1)}</span></div>
                </div>
                <p className="mt-2 text-[10px] text-emerald-400/90 font-medium">
                  ✓ Recorded into Hindsight Spaced Memory (+0.5h Study Logged)
                </p>
                {onJumpToHindsight && (
                  <button
                    onClick={onJumpToHindsight}
                    className="mt-2.5 w-full py-1.5 px-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Inspect Autopsy in Hindsight</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
