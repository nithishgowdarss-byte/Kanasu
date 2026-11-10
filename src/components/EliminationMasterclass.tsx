import React, { useState, useEffect } from 'react';
import { Lightbulb, Eye, CheckCircle2 } from 'lucide-react';
import { ELIMINATION_WEAPONS } from '../data/teachingData';
import { HindsightStorage, PROGRESS_UPDATED_EVENT } from '../services/hindsightStorage';
import { Language } from '../types/kas';

interface EliminationMasterclassProps {
  language: Language;
}

export const EliminationMasterclass: React.FC<EliminationMasterclassProps> = ({ language }) => {
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>('extreme_words');
  const [interactiveStep, setInteractiveStep] = useState<number>(1);
  const [completedWeaponIds, setCompletedWeaponIds] = useState<string[]>(() =>
    HindsightStorage.getCompletedMasterclassWeapons()
  );

  useEffect(() => {
    const syncWeapons = () => {
      setCompletedWeaponIds(HindsightStorage.getCompletedMasterclassWeapons());
    };
    window.addEventListener(PROGRESS_UPDATED_EVENT, syncWeapons);
    return () => window.removeEventListener(PROGRESS_UPDATED_EVENT, syncWeapons);
  }, []);

  const activeWeapon = ELIMINATION_WEAPONS.find(w => w.id === selectedWeaponId) || ELIMINATION_WEAPONS[0];

  const handleWeaponSelect = (id: string) => {
    setSelectedWeaponId(id);
    setInteractiveStep(1);
  };

  const handleStepAction = () => {
    const nextStep = interactiveStep === 1 ? 2 : 1;
    setInteractiveStep(nextStep);
    if (nextStep === 2) {
      const updated = HindsightStorage.markMasterclassWeaponCompleted(selectedWeaponId);
      setCompletedWeaponIds(updated);
    }
  };

  return (
    <section id="masterclass" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header with Curiosity Gap & Before-After-Bridge Hook */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-xs font-mono text-amber-400 mb-3 tracking-wide">
          01 · Tactical Question Deconstruction · {completedWeaponIds.length}/{ELIMINATION_WEAPONS.length} Weapons Armed
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-serif">
          {language === 'kn' 
            ? 'ನೀವು ಎಲ್ಲಾ ೪ ಹೇಳಿಕೆಗಳನ್ನು ತಿಳಿದಿರಬೇಕಿಲ್ಲ. ಪರೀಕ್ಷಕರ ೧ ಸುಳ್ಳನ್ನು ಪತ್ತೆಹಚ್ಚಿದರೆ ಸಾಕು.' 
            : 'You Don’t Need to Know All 4 Statements. You Only Need to Spot the 1 Lie.'}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {language === 'kn'
            ? 'ಸಾಮಾನ್ಯ ಆಕಾಂಕ್ಷಿಗಳು ಹೊಸ ರಾಜವಂಶ ಅಥವಾ ಸಮಿತಿಯ ಹೆಸರು ಕಂಡ ತಕ್ಷಣ ಭಯಪಟ್ಟು ಪ್ರಶ್ನೆ ಬಿಟ್ಟುಬಿಡುತ್ತಾರೆ. ಆದರೆ ಟಾಪರ್‌ಗಳು ಪರೀಕ್ಷಕರು ಹೆಣೆದ ೧ ತಪ್ಪು ಪದವನ್ನು ಗುರುತಿಸಿ ೪೦ ಸೆಕೆಂಡುಗಳಲ್ಲಿ +೨.೦೦ ಅಂಕ ಬಾಚಿಕೊಳ್ಳುತ್ತಾರೆ.'
            : 'Average aspirants panic when they see an unfamiliar dynasty or committee name and skip the question. Toppers look for the examiner’s linguistic fingerprint—extreme qualifiers, swapped river pairs, and broken causal links—to turn a blind guess into a +2.00 certainty.'}
        </p>
      </div>

      {/* Weapon Selector Cards (Interactive Segmented Buttons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {ELIMINATION_WEAPONS.map((weapon, index) => {
          const isSelected = selectedWeaponId === weapon.id;
          const isCompleted = completedWeaponIds.includes(weapon.id);
          return (
            <button
              key={weapon.id}
              onClick={() => handleWeaponSelect(weapon.id)}
              className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 shadow-lg'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 tabular-nums">
                <span className={isSelected ? 'text-amber-400 font-bold' : ''}>
                  0{index + 1} · Weapon
                </span>
                <span className="flex items-center gap-1.5">
                  {isCompleted && (
                    <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ARMED
                    </span>
                  )}
                  <span className="text-slate-400">{weapon.successRate.split(' ')[0]}</span>
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1.5">
                {language === 'kn' ? weapon.nameKn : weapon.nameEn}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {language === 'kn' ? weapon.painHookKn : weapon.painHookEn}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Demonstration Arena */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left: Pain-Agitate-Solve Teaching Rule */}
          <div className="lg:w-1/2 space-y-5">
            <div className="text-xs font-mono text-amber-400">
              {activeWeapon.successRate} · Zero-Formula Execution
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">
                {language === 'kn' ? activeWeapon.painHookKn : activeWeapon.painHookEn}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                {language === 'kn' ? activeWeapon.nameKn : activeWeapon.nameEn}
              </h3>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-sm leading-relaxed text-slate-200">
              <p className="font-semibold text-amber-300 mb-1">
                {language === 'kn' ? 'ಟಾಪರ್ ಎಲಿಮಿನೇಷನ್ ನಿಯಮ:' : 'The Examiner’s Tell:'}
              </p>
              <p>{language === 'kn' ? activeWeapon.ruleKn : activeWeapon.ruleEn}</p>
            </div>

            <div className="p-4 bg-amber-950/20 rounded-xl border border-amber-500/30 text-xs leading-relaxed text-amber-200">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                <Lightbulb className="w-4 h-4" />
                <span>{language === 'kn' ? 'ಇದು ಏಕೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ:' : 'Why This Works Under Exam Pressure:'}</span>
              </div>
              <p>{language === 'kn' ? activeWeapon.exampleKn : activeWeapon.exampleEn}</p>
            </div>

            {/* Interactive Step Button */}
            <div className="pt-2">
              <button
                onClick={handleStepAction}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>
                  {interactiveStep === 1 
                    ? (language === 'kn' ? 'ಈ ಪ್ರಶ್ನೆಯಲ್ಲೇ ಸುಳ್ಳು ಹೇಳಿಕೆ ಕತ್ತರಿಸಿ ನೋಡಿ' : 'Expose the Lie & Kill Wrong Options Now') 
                    : (language === 'kn' ? 'ಮತ್ತೊಮ್ಮೆ ಪ್ರಯೋಗಿಸಿ' : 'Reset Question Simulation')}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Live Interactive Question Canvas */}
          <div className="lg:w-1/2 w-full bg-slate-950 p-6 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800 mb-4 font-mono tabular-nums">
              <span>REAL KPSC PATTERN PROOF</span>
              <span className="text-amber-400 font-bold">
                {interactiveStep === 1 ? 'Step 1 · Raw Question' : 'Step 2 · Distractors Destroyed'}
              </span>
            </div>

            {/* Simulated Question Text */}
            {selectedWeaponId === 'extreme_words' && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-200">
                  {language === 'kn'
                    ? 'ಬನವಾಸಿಯ ಕದಂಬ ರಾಜವಂಶಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ಈ ಕೆಳಗಿನ ಹೇಳಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ:'
                    : 'Consider the following statements regarding the Kadamba dynasty of Banavasi:'}
                </p>
                <div className="space-y-2 text-xs font-mono bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                  <div className="text-slate-300">1. Mayurasharma was the founder of the dynasty.</div>
                  <div className="text-slate-300">2. Halmidi inscription (c. 450 CE) belongs to this era.</div>
                  <div className={`p-1.5 rounded transition-colors ${
                    interactiveStep === 2 ? 'bg-red-950/70 text-red-300 border border-red-500/50 line-through' : 'text-slate-300'
                  }`}>
                    3. They declared Prakrit as the <strong className="text-amber-400">sole</strong> language, <strong className="text-amber-400">rejecting</strong> Sanskrit completely.
                  </div>
                </div>

                {/* Options List with strike-through */}
                <div className="space-y-2 pt-2">
                  {[
                    { label: 'A. 1 and 2 only', isCorrect: true },
                    { label: 'B. 2 and 3 only', isCorrect: false },
                    { label: 'C. 1 and 3 only', isCorrect: false },
                    { label: 'D. 1, 2 and 3', isCorrect: false },
                  ].map((opt, i) => {
                    const isEliminated = interactiveStep === 2 && !opt.isCorrect;
                    const isWinner = interactiveStep === 2 && opt.isCorrect;
                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                          isWinner
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold'
                            : isEliminated
                            ? 'bg-red-950/20 border-red-900 text-red-400/50 line-through'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isWinner && <span className="text-emerald-400 font-bold">+2.00 LOCKED IN 12s</span>}
                        {isEliminated && <span className="text-red-500 text-[10px]">KILLED BY STATEMENT 3</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedWeaponId === 'anchor_match' && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-200">
                  {language === 'kn'
                    ? 'ಕರ್ನಾಟಕದ ಜಲಪಾತಗಳು (ಪಟ್ಟಿ-I) ಮತ್ತು ನದಿಗಳು (ಪಟ್ಟಿ-II) ಹೊಂದಿಸಿ:'
                    : 'Match the Waterfalls (List-I) with their respective Rivers (List-II):'}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                  <div className="space-y-1">
                    <div className="text-amber-400 font-bold">A. Jog Falls</div>
                    <div>B. Shivanasamudra</div>
                    <div>C. Gokak Falls</div>
                    <div>D. Magod Falls</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-emerald-400 font-bold">1. Sharavathi River (ANCHOR)</div>
                    <div>2. Cauvery River</div>
                    <div>3. Ghataprabha River</div>
                    <div>4. Bedti River</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    { label: 'Option A: A-1, B-2, C-3, D-4', hasAnchor: true, isCorrect: true },
                    { label: 'Option B: A-2, B-1, C-4, D-3', hasAnchor: false, isCorrect: false },
                    { label: 'Option C: A-1, B-3, C-2, D-4', hasAnchor: true, isCorrect: false },
                    { label: 'Option D: A-3, B-2, C-1, D-4', hasAnchor: false, isCorrect: false },
                  ].map((opt, i) => {
                    const isEliminated = interactiveStep === 2 && !opt.hasAnchor;
                    const isCandidate = interactiveStep === 2 && opt.hasAnchor;
                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                          interactiveStep === 2 && opt.isCorrect
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold'
                            : isCandidate
                            ? 'bg-amber-950/30 border-amber-500/60 text-amber-200'
                            : isEliminated
                            ? 'bg-red-950/20 border-red-900 text-red-400/50 line-through'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isEliminated && <span className="text-red-500 text-[10px]">KILLED (Lacks A-1)</span>}
                        {isCandidate && <span className="text-amber-400 text-[10px]">Anchor A-1 Verified</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {(selectedWeaponId === 'causal_reason' || selectedWeaponId === 'csat_reverse') && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-200">
                  {selectedWeaponId === 'causal_reason' 
                    ? 'Assertion (A): Article 371(J) empowers the Governor with special responsibility for Kalyana Karnataka.'
                    : 'CSAT Question: Two trains start toward each other at 60 km/h and 90 km/h over 300 km. When do they meet?'}
                </p>
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                  {selectedWeaponId === 'causal_reason'
                    ? 'Reason (R): 98th Amendment mandated constitutional executive oversight for backward district quotas.'
                    : 'Options: A) 1.5 hrs · B) 2.0 hrs · C) 2.5 hrs · D) 3.0 hrs'}
                </div>

                <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/40 rounded-lg text-xs font-mono text-emerald-300">
                  {interactiveStep === 2 ? (
                    <div>
                      <span className="font-bold">Result:</span>{' '}
                      {selectedWeaponId === 'causal_reason'
                        ? 'Insert "BECAUSE" -> (R) directly explains "WHY" powers were entrusted to the Governor rather than generic cabinet decree. Lock Option A.'
                        : 'Reverse Test Option B (2 hrs): 2 × (60 + 90) = 2 × 150 = 300 km (Exact Match!). Solved in 12 seconds without equations.'}
                    </div>
                  ) : (
                    <span className="text-slate-400">Click the button on the left to trigger the shortcut.</span>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </section>
  );
};
