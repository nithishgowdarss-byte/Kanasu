import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, AlertTriangle } from 'lucide-react';
import { EXAM_CHECKLIST_ITEMS } from '../data/kasData';
import { HindsightStorage } from '../services/hindsightStorage';
import { Language } from '../types/kas';

interface ExamReadinessProps {
  language: Language;
}

export const ExamReadiness: React.FC<ExamReadinessProps> = ({ language }) => {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCheckedState(HindsightStorage.getChecklistState());
  }, []);

  const handleToggle = (id: string) => {
    const updated = {
      ...checkedState,
      [id]: !checkedState[id]
    };
    setCheckedState(updated);
    HindsightStorage.saveChecklistState(updated);
  };

  const completedCount = EXAM_CHECKLIST_ITEMS.filter(item => checkedState[item.id]).length;
  const progressPercent = Math.round((completedCount / EXAM_CHECKLIST_ITEMS.length) * 100);

  return (
    <section id="readiness" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header — Last-Mile Friction Hook */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-400 font-semibold mb-3">
          {language === 'kn'
            ? '07 · ಪರೀಕ್ಷಾ ಕೊಠಡಿಯ ಶಿಸ್ತು · ಒಎಂಆರ್ ಶೂನ್ಯ-ದೋಷ'
            : '07 · Exam-Hall Execution Protocol · OMR Zero-Error'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-serif">
          {language === 'kn'
            ? '೩೬೫ ದಿನಗಳ ನಿಮ್ಮ ಕಠಿಣ ಪರಿಶ್ರಮವನ್ನು ಒಂದು ಸಣ್ಣ ಒಎಂಆರ್ (OMR) ತಪ್ಪು ಅಥವಾ ದಾಖಲೆ ಕೊರತೆ ಹಾಳುಮಾಡಲು ಬಿಡಬೇಡಿ!'
            : 'Don’t Let an OMR Bubbling Shift or Missing ID Cost You 365 Days of Preparation.'}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {language === 'kn'
            ? 'ಪ್ರತಿ ವರ್ಷ ನೂರಾರು ಅಭ್ಯರ್ಥಿಗಳು ಉತ್ತರ ಗೊತ್ತಿದ್ದರೂ ಒಎಂಆರ್ ಬಬ್ಲಿಂಗ್ ಸೀರೀಸ್ ತಪ್ಪುಗಳಿಂದ ರೇಸ್‌ನಿಂದ ಹೊರಬೀಳುತ್ತಾರೆ. ಪರೀಕ್ಷಾ ಕೇಂದ್ರಕ್ಕೆ ಹೊರಡುವ ಮುನ್ನ ಈ ಪಟ್ಟಿಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
            : 'Every cycle, prepared candidates lose 6 to 10 marks not from lack of knowledge, but from row-shift bubbling errors, wrong pen ink, or last-hour gate panic. Lock in your logistics before exam morning.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Interactive Checklist (lg:col-span-2) */}
        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base">
                {language === 'kn' ? 'ಪರೀಕ್ಷಾ ಪೂರ್ವ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ' : 'Pre-Exam Execution Checklist'}
              </h3>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {completedCount} of {EXAM_CHECKLIST_ITEMS.length} protocols locked
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-3 tabular-nums">
              <div className="w-28 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">{progressPercent}%</span>
            </div>
          </div>

          <div className="space-y-3">
            {EXAM_CHECKLIST_ITEMS.map((item) => {
              const isChecked = !!checkedState[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-medium ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                        {language === 'kn' ? item.labelKn : item.labelEn}
                      </span>
                      {item.required && (
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-400 shrink-0">
                          MANDATORY
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Exam Guidelines & OMR Shield Warnings */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-4">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-400" />
              <span>3 Fatal OMR Hall Mistakes to Avoid</span>
            </div>
            
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">1.</span>
                <span><strong>Never hoard bubbling for the last 10 minutes:</strong> Bubble in batches of 10 questions. End-of-hour panic causes catastrophic row-shift errors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">2.</span>
                <span><strong>Thick-tip Black Ballpoint pen only:</strong> A 0.7mm or 1.0mm black ballpoint fills an OMR circle in 1.2 seconds vs 3.5 seconds with a fine nib—saving 4 full minutes across 100 questions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">3.</span>
                <span><strong>Booklet Series Code lock:</strong> Cross-verify your Question Paper Version (A, B, C, or D) against your OMR bubble before reading Question 1.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-[#0a0d14] border border-amber-500/30 rounded-2xl p-6 shadow-xl text-center">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
              Execution Mantra
            </span>
            <div className="text-xl font-black text-white font-serif mb-2">
              Calm Mind. Ruthless Elimination.
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              You do not need 200/200 to become an Assistant Commissioner. You only need 120+ net marks with zero unforced OMR errors.
            </p>
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold">
              ✓ 2-Round OMR Pacing Protocol Ready
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
