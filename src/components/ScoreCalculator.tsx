import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Language } from '../types/kas';

interface ScoreCalculatorProps {
  language: Language;
}

export const ScoreCalculator: React.FC<ScoreCalculatorProps> = ({ language }) => {
  const [attempts, setAttempts] = useState(84);
  const [accuracy, setAccuracy] = useState(78); // percentage

  const correct = Math.round((attempts * accuracy) / 100);
  const wrong = attempts - correct;
  const positiveMarks = correct * 2.0;
  const negativeDeduction = wrong * 0.5; // 0.25 penalty per mark (each question is 2 marks -> 0.25 * 2 = 0.5)
  const netScore = Number((positiveMarks - negativeDeduction).toFixed(1));

  // Historic KPSC Cutoff reference: General Merit typically ~108-118 / 200
  const isCutoffCleared = netScore >= 110;
  const isRankerZone = netScore >= 130;

  return (
    <section id="strategy-calculator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header — Risk-Aversion Paradox Hook */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-400 font-semibold mb-3">
          {language === 'kn'
            ? '04 · ನಿರೀಕ್ಷಿತ ಮೌಲ್ಯ ಗಣಿತ · ಕಟ್‌ಆಫ್ ತಂತ್ರಗಾರಿಕೆ'
            : '04 · Expected Value Engineering · Cutoff Math'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-serif">
          {language === 'kn'
            ? '“ಸೇಫ್ ಆಗಿರೋಣ” ಎಂದು ೫೮ ಪ್ರಶ್ನೆ ಬರೆದರೆ, ನೀವು ಪರೀಕ್ಷೆ ಮುಗಿಯುವ ಮುನ್ನವೇ ಸೋತಿರುತ್ತೀರಿ!'
            : 'The “Play It Safe” Trap: Why Attempting 58 Questions Mathematically Guarantees You Fail.'}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {language === 'kn'
            ? 'ನೆಗೆಟಿವ್ ಅಂಕದ (-೦.೫೦) ಭಯದಿಂದ ಪ್ರಶ್ನೆಗಳನ್ನು ಬಿಟ್ಟುಬರುವುದೇ ದೊಡ್ಡ ಅಪಾಯ. ಕೇವಲ ೨ ಆಯ್ಕೆಗಳನ್ನು ಎಲಿಮಿನೇಟ್ ಮಾಡಿದರೂ ನಿರೀಕ್ಷಿತ ಮೌಲ್ಯ (+೦.೭೫) ನಿಮ್ಮ ಪರವಾಗಿರುತ್ತದೆ. ಕೆಳಗಿನ ಸ್ಲೈಡರ್ ಮೂಲಕ ನಿಮ್ಮ ಸೇಫ್ ಅಟೆಮ್ಟ್ ಸಂಖ್ಯೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ.'
            : 'Fear of the -0.50 negative penalty tricks thousands of aspirants into under-attempting. Yet eliminating just 2 options yields a +0.75 expected value per question. Drag the sliders below to see why 82–88 calculated attempts is the only safe zone.'}
        </p>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left: Interactive Controls */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center text-sm font-mono mb-2">
                <span className="text-slate-200 font-semibold">
                  {language === 'kn' ? 'ನೀವು ಉತ್ತರಿಸುವ ಪ್ರಶ್ನೆಗಳ ಸಂಖ್ಯೆ (೧೦೦ ರಲ್ಲಿ):' : 'Questions Attempted (out of 100):'}
                </span>
                <span className="text-amber-400 font-black text-lg tabular-nums">{attempts} Qs</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={attempts}
                onChange={(e) => setAttempts(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1 tabular-nums">
                <span>40 (Guaranteed Elimination)</span>
                <span>82–88 (Ranker Optimal Sweet Spot)</span>
                <span>100</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-mono mb-2">
                <span className="text-slate-200 font-semibold">
                  {language === 'kn' ? 'ಅಂದಾಜು ನಿಖರತೆ (Accuracy Rate):' : 'Estimated Accuracy Rate (%):'}
                </span>
                <span className="text-sky-400 font-black text-lg tabular-nums">{accuracy}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={accuracy}
                onChange={(e) => setAccuracy(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1 tabular-nums">
                <span>50% (Blind Guessing)</span>
                <span>75% (2-Option Elimination)</span>
                <span>90%+ (Ranker Peak)</span>
              </div>
            </div>

            {/* Strategic Advice Box */}
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              isRankerZone 
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                : isCutoffCleared
                ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                : 'bg-red-950/20 border-red-500/40 text-red-200'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1 text-sm">
                {isRankerZone ? (
                  <span className="text-emerald-400 flex items-center gap-1.5"><Award className="w-4 h-4" /> Top Ranker Zone (AC / DySP Mains Call Guaranteed)</span>
                ) : isCutoffCleared ? (
                  <span className="text-amber-400 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Prelims Cutoff Cleared (+{(netScore - 110).toFixed(1)} Safety Buffer)</span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Danger Zone: Below General Merit Cutoff (~110 Marks)</span>
                )}
              </div>
              <p>
                {attempts < 72
                  ? 'Warning: Attempting fewer than 72 questions forces you to maintain an unrealistic 85%+ accuracy just to survive. Use the 50/50 Elimination Engine to push your attempts into the 82–88 range.'
                  : 'Mathematically sound! At 80+ attempts, even 18–20 wrong answers (-9 to -10 marks) are easily absorbed by your high positive base score.'}
              </p>
            </div>
          </div>

          {/* Right: Score Breakdown Card */}
          <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
              {language === 'kn' ? 'ನಿವ್ವಳ ಅಂದಾಜು ಅಂಕಗಳು' : 'Projected Net Score (Per Paper)'}
            </span>
            <div className={`text-4xl sm:text-5xl font-black font-mono tabular-nums mb-2 ${
              isCutoffCleared ? 'text-amber-400' : 'text-red-400'
            }`}>
              {netScore}{' '}
              <span className="text-sm font-normal text-slate-400">/ 200</span>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 text-xs font-mono tabular-nums my-4 text-left">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Correct Hits (+2.0):</span>
                <span className="text-emerald-400 font-bold text-base">{correct} Qs</span>
                <span className="block text-[11px] text-slate-400">+{positiveMarks.toFixed(1)} gross marks</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Penalty Bleed (-0.5):</span>
                <span className="text-red-400 font-bold text-base">{wrong} Qs</span>
                <span className="block text-[11px] text-red-400">-{negativeDeduction.toFixed(1)} lost marks</span>
              </div>
            </div>

            <div className="w-full text-xs text-slate-400 font-mono tabular-nums flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span>Safe Cutoff Benchmark: 110.0</span>
              <span className={isCutoffCleared ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {isCutoffCleared ? `+${(netScore - 110).toFixed(1)} Above Cutoff` : `${(netScore - 110).toFixed(1)} Below Cutoff`}
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
