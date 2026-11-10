import React, { useState } from 'react';
import { Check, Layers, Compass, Gauge, SplitSquareVertical } from 'lucide-react';
import { Language } from '../types/kas';

interface MentalAbilitySolverProps {
  language: Language;
}

export const MentalAbilitySolver: React.FC<MentalAbilitySolverProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'series' | 'syllogism' | 'direction' | 'speed'>('series');

  // Series Solver State
  const [seriesResult] = useState<{
    next: number;
    rule: string;
    steps: string[];
    differences: number[];
  }>({
    next: 342,
    rule: 'n³ - 1 pattern for n = 2, 3, 4, 5, 6, 7',
    steps: [
      'Term 1: 2³ - 1 = 8 - 1 = 7',
      'Term 2: 3³ - 1 = 27 - 1 = 26',
      'Term 3: 4³ - 1 = 64 - 1 = 63',
      'Term 4: 5³ - 1 = 125 - 1 = 124',
      'Term 5: 6³ - 1 = 216 - 1 = 215',
      'Term 6 (Answer): 7³ - 1 = 343 - 1 = 342'
    ],
    differences: [19, 37, 61, 91]
  });

  // Speed Time Distance State
  const [trainSpeedA, setTrainSpeedA] = useState(60);
  const [trainSpeedB, setTrainSpeedB] = useState(90);
  const [distance] = useState(300);

  const relativeSpeed = trainSpeedA + trainSpeedB;
  const timeToMeetHours = (distance / relativeSpeed).toFixed(2);
  const meetDistanceA = ((distance / relativeSpeed) * trainSpeedA).toFixed(1);

  return (
    <section id="mental-ability" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header with Effort Paradox Hook */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-xs font-mono text-amber-400 mb-3 tracking-wide">
          03 · Paper II CSAT Visual Lab · 30-Second Bypass
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-serif">
          {language === 'kn'
            ? 'ಪತ್ರಿಕೆ ೨ ರಲ್ಲಿ ಬೀಜಗಣಿತದ ಸಮೀಕರಣಗಳನ್ನು ಬರೆಯುತ್ತಿದ್ದರೆ, ನೀವು ಈಗಾಗಲೇ ೨೫ ನಿಮಿಷ ಕಳೆದುಕೊಂಡಿದ್ದೀರಿ.'
            : 'If You’re Writing Algebra Equations in Paper II, You’ve Already Lost 25 Minutes.'}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {language === 'kn'
            ? 'ಕೆಪಿಎಸ್‌ಸಿ ಸಿಎಸ್‌ಎಟಿ ಗಣಿತದ ಪಾಂಡಿತ್ಯ ಪರೀಕ್ಷಿಸುವುದಿಲ್ಲ—ನಿಮ್ಮ ವೇಗವನ್ನು ಪರೀಕ್ಷಿಸುತ್ತದೆ. ಸಂಖ್ಯಾ ಸರಣಿ, ವೆನ್ ನಕ್ಷೆ ಮತ್ತು ಪೈಥಾಗೊರಸ್ ದೃಶ್ಯ ಸೂತ್ರಗಳಿಂದ ೬೦+ ಅಂಕಗಳನ್ನು ಸುಲಭವಾಗಿ ಜೇಬಿಗಿಳಿಸಿ.'
            : 'CSAT isn’t a university math exam—it’s a speed filter designed to exhaust arts and humanities students. Use visual difference trees, minimal Venn overlaps, and Pythagorean triplets to bank 60+ marks without formula anxiety.'}
        </p>
      </div>

      {/* Solver Navigation Tabs (Functional Segmented Controls) */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { id: 'series', labelEn: 'Number Series (n³-1)', labelKn: 'ಸಂಖ್ಯಾ ಸರಣಿ', icon: Layers },
          { id: 'syllogism', labelEn: 'Syllogism Venn Logic', labelKn: 'ಸಿಲಾಜಿಜಂ ವೆನ್', icon: SplitSquareVertical },
          { id: 'direction', labelEn: 'Direction & Displacement', labelKn: 'ದಿಕ್ಕು ಗ್ರಹಿಕೆ', icon: Compass },
          { id: 'speed', labelEn: 'Speed, Time & Relative Motion', labelKn: 'ವೇಗ, ದೂರ & ಸಮಯ', icon: Gauge },
        ].map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'series' | 'syllogism' | 'direction' | 'speed')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-lg font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{language === 'kn' ? tab.labelKn : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Solver Container Box */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* TAB 1: Number Series Visualizer */}
        {activeTab === 'series' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-mono text-amber-400 mb-2">
                Pattern Recognition · Saves 75 Seconds
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">
                {language === 'kn' ? 'ಸಂಖ್ಯಾ ವಿನ್ಯಾಸ ಹಾಗೂ ಘನ ಸೂತ್ರ: 26, 63, 124 ಕಂಡ ತಕ್ಷಣ ಗುರುತಿಸಿ' : 'Spot "Cube Minus One" Numbers (26, 63, 124) in 3 Seconds'}
              </h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {language === 'kn'
                  ? 'ಸಾಮಾನ್ಯ ವಿದ್ಯಾರ್ಥಿಗಳು ಸಂಖ್ಯೆಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸ ಕಳೆಯುತ್ತಾ ಕುಳಿತುಕೊಳ್ಳುತ್ತಾರೆ. ಟಾಪರ್‌ಗಳು ೨೬ (೨೭-೧), ೬೩ (೬೪-೧), ೧೨೪ (೧೨೫-೧) ನೋಡಿದ ತಕ್ಷಣ ಇದು n³ - 1 ಸರಣಿ ಎಂದು ಗುರುತಿಸುತ್ತಾರೆ.'
                  : 'While average students waste 2 minutes subtracting numbers by hand, rankers recognize 26, 63, and 124 as neighbors of perfect cubes (27, 64, 125). Beware the examiner’s trap: Option B (343) is 7³, whereas 7³ - 1 = 342.'}
              </p>

              {/* Step Sequence Breakdown */}
              <div className="space-y-2 font-mono text-xs sm:text-sm tabular-nums">
                {seriesResult.steps.map((st, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                      i === seriesResult.steps.length - 1
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="text-amber-400">0{i + 1}.</span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Difference Tree Graphics */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center">
              <span className="text-xs font-mono text-slate-400 mb-6">Visual Difference Tree Verification</span>
              
              {/* Row 1: Series Numbers */}
              <div className="flex items-center gap-2 sm:gap-3 mb-6 tabular-nums">
                {[7, 26, 63, 124, 215, 342].map((num, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center w-11 sm:w-14 h-12 sm:h-14 rounded-xl border font-mono text-xs sm:text-sm font-bold shadow-sm ${
                      idx === 5
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black scale-105'
                        : 'bg-slate-900 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{num}</span>
                    <span className="text-[9px] opacity-75 font-normal">n={idx + 2}</span>
                  </div>
                ))}
              </div>

              {/* Row 2: 1st Level Differences */}
              <div className="flex items-center gap-2 sm:gap-4 mb-4 text-xs font-mono text-sky-400 tabular-nums">
                <span className="text-slate-500 text-[10px]">Δ1:</span>
                {[19, 37, 61, 91, 127].map((diff, idx) => (
                  <div key={idx} className="px-2 py-1 bg-slate-900/80 rounded border border-slate-800">
                    +{diff}
                  </div>
                ))}
              </div>

              {/* Row 3: 2nd Level Constant Differences */}
              <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 tabular-nums">
                <span className="text-slate-500 text-[10px]">Δ2:</span>
                {[18, 24, 30, 36].map((diff2, idx) => (
                  <div key={idx} className="px-2 py-0.5 bg-emerald-950/40 rounded border border-emerald-500/30 font-bold">
                    +{diff2}
                  </div>
                ))}
                <span className="text-[10px] text-slate-400">(+6 Step)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Syllogism Venn Diagram Visualizer */}
        {activeTab === 'syllogism' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-mono text-sky-400 mb-2">
                Deductive Set Theory · Zero Over-Inference
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">
                {language === 'kn' ? 'ಕೇವಲ ಒಂದು ಸಾಧ್ಯತೆಯನ್ನು ಖಚಿತ ತೀರ್ಮಾನವೆಂದು ಭಾವಿಸಿ ಅಂಕ ಕಳೆದುಕೊಳ್ಳಬೇಡಿ' : 'Stop Falling for the "Possible vs. Definite" Venn Trap'}
              </h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                {language === 'kn'
                  ? 'ತೀರ್ಮಾನವು ೧೦೦% ಕಡ್ಡಾಯವಾಗಿರಬೇಕಾದರೆ, ಎರಡು ವೃತ್ತಗಳು ಒಂದನ್ನೊಂದು ಸ್ಪರ್ಶಿಸದಿದ್ದರೂ ಅದು ಸತ್ಯವಾಗಿರಬೇಕು. ನೇರ ಸಂಬಂಧವಿಲ್ಲದ ಎರಡು ಗುಂಪುಗಳ ನಡುವೆ ತೀರ್ಮಾನ ಎಳೆಯಬೇಡಿ.'
                  : '80% of CSAT syllogism mistakes happen because students draw overlapping circles in their head and assume "Some A are C". If two circles do NOT have to touch, any definite conclusion between them is 100% FALSE.'}
              </p>

              <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-amber-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Premise 1:</strong> All Civil Servants ⊂ Administrators.</span>
                </div>
                <div className="flex items-center gap-2 text-sky-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Premise 2:</strong> Some Administrators ∩ Policy Makers ≠ ∅.</span>
                </div>
                <div className="flex items-center gap-2 text-red-300">
                  <span className="font-mono font-bold text-red-400">✕</span>
                  <span><strong>The -0.50 Trap:</strong> Concluding "Some Civil Servants are Policy Makers" (No mandatory touch!).</span>
                </div>
              </div>
            </div>

            {/* Interactive SVG Venn Diagram */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <svg viewBox="0 0 360 220" className="w-full max-w-[340px] h-auto">
                <ellipse cx="180" cy="110" rx="140" ry="85" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                <text x="180" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Administrators (B)</text>

                <circle cx="120" cy="115" r="45" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="120" y="115" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Civil Servants (A)</text>
                <text x="120" y="130" fill="#fde68a" fontSize="9" textAnchor="middle">100% inside B</text>

                <circle cx="240" cy="115" r="45" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2.5" />
                <text x="250" y="115" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Policy Makers (C)</text>

                <text x="180" y="125" fill="#94a3b8" fontSize="18" textAnchor="middle">?</text>
              </svg>
              <span className="text-[11px] font-mono text-slate-400 mt-2">
                Circles A and C have zero mandatory intersection → Conclusion 1 is False.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: Direction & Displacement Vector Solver */}
        {activeTab === 'direction' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-mono text-emerald-400 mb-2">
                Pythagorean Triplets · 5-Second Shortcut
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">
                {language === 'kn' ? 'ವರ್ಗಮೂಲ ಲೆಕ್ಕ ಮಾಡಬೇಡಿ: (10, 24, 26) ಪೈಥಾಗೊರಸ್ ಜೋಡಿ ನೆನಪಿಡಿ' : 'Never Calculate Square Roots by Hand: Memorize (5-12-13) & (10-24-26)'}
              </h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                {language === 'kn'
                  ? 'ದಿಕ್ಕುಗಳ ಪ್ರಶ್ನೆಯಲ್ಲಿ ೧೦ ಕಿ.ಮೀ ಉತ್ತರ ಮತ್ತು ೨೪ ಕಿ.ಮೀ ಪೂರ್ವ ಎಂದಾಗ ೨೪×೨೪ ಗುಣಿಸುತ್ತಾ ಸಮಯ ವ್ಯರ್ಥ ಮಾಡಬೇಡಿ. ಇದು (5, 12, 13) ರ ದುಪ್ಪಟ್ಟು ಅಂದರೆ ನೇರ ಉತ್ತರ ೨೬ ಕಿ.ಮೀ!'
                  : 'KPSC direction questions almost exclusively use scaled Pythagorean triplets: (3,4,5), (5,12,13), (8,15,17), and (10,24,26). Spot 10 km North + 24 km East = 26 km instantaneously.'}
              </p>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs sm:text-sm font-mono space-y-2 tabular-nums">
                <div className="text-slate-300">North Vector (y) = 10 km (2 × 5)</div>
                <div className="text-slate-300">East Vector (x) = 24 km (2 × 12)</div>
                <div className="text-amber-400 font-bold">
                  Direct Displacement = 2 × 13 = <span className="text-emerald-400 text-base">26 km</span>
                </div>
                <div className="text-slate-400 text-xs">
                  Bearing from Origin: <span className="text-sky-300 font-bold">North-East (ಈಶಾನ್ಯ)</span>
                </div>
              </div>
            </div>

            {/* 2D Coordinate Grid Visualizer */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center">
              <svg viewBox="0 0 280 200" className="w-full max-w-[280px] h-auto">
                <line x1="40" y1="160" x2="260" y2="160" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="20" x2="60" y2="180" stroke="#334155" strokeWidth="1" />

                <circle cx="60" cy="160" r="5" fill="#f97316" />
                <text x="50" y="175" fill="#94a3b8" fontSize="10">Origin (0,0)</text>

                <line x1="60" y1="160" x2="60" y2="70" stroke="#38bdf8" strokeWidth="3" />
                <text x="18" y="115" fill="#38bdf8" fontSize="10" fontWeight="bold">10 km N</text>

                <line x1="60" y1="70" x2="220" y2="70" stroke="#10b981" strokeWidth="3" />
                <text x="135" y="60" fill="#10b981" fontSize="10" fontWeight="bold">24 km E</text>

                <line x1="60" y1="160" x2="220" y2="70" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" />
                <circle cx="220" cy="70" r="5" fill="#f59e0b" />
                <text x="150" y="125" fill="#f59e0b" fontSize="11" fontWeight="bold">26 km (Triplet)</text>
              </svg>
            </div>
          </div>
        )}

        {/* TAB 4: Speed Time Distance Relative Motion Solver */}
        {activeTab === 'speed' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-mono text-amber-400 mb-2">
                Relative Velocity · Ratio Split Method
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">
                {language === 'kn' ? 'ಸಾಪೇಕ್ಷ ವೇಗ: ಒಂದೇ ಸಾಲಿನಲ್ಲಿ ರೈಲುಗಳ ಭೇಟಿ ಸಮಯ ಕಂಡುಹಿಡಿಯಿರಿ' : 'Solve Train Collision Questions in 10 Seconds With Speed Ratios'}
              </h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {language === 'kn'
                  ? 'ಪರಸ್ಪರ ಎದುರಾಗಿ ಬರುವ ಎರಡು ರೈಲುಗಳ ವೇಗವನ್ನು ನೇರವಾಗಿ ಕೂಡಿಸಿ (V1 + V2). ಒಟ್ಟು ದೂರವನ್ನು ಅದರಿಂದ ಭಾಗಿಸಿದರೆ ಕ್ಷಣಾರ್ಧದಲ್ಲಿ ಸಮಯ ಸಿಗುತ್ತದೆ.'
                  : 'When two trains travel toward each other, their speeds combine (V1 + V2). Better yet, the distance covered by each train is directly proportional to their speed ratio.'}
              </p>

              {/* Sliders */}
              <div className="space-y-4 mb-6 text-xs font-mono tabular-nums">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Train A Velocity (Bengaluru):</span>
                    <span className="text-amber-400 font-bold">{trainSpeedA} km/h</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="120"
                    value={trainSpeedA}
                    onChange={(e) => setTrainSpeedA(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Train B Velocity (Belagavi):</span>
                    <span className="text-sky-400 font-bold">{trainSpeedB} km/h</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="120"
                    value={trainSpeedB}
                    onChange={(e) => setTrainSpeedB(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Result Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono tabular-nums">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Time to Meet:</span>
                  <span className="text-emerald-400 text-base font-bold">{timeToMeetHours} hrs</span>
                </div>
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Meeting Point from A:</span>
                  <span className="text-amber-400 text-base font-bold">{meetDistanceA} km</span>
                </div>
              </div>
            </div>

            {/* Visual Railway Track Animation Bar */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-center">
              <span className="text-xs font-mono text-slate-400 mb-4 text-center tabular-nums">
                300 km Corridor · Combined Speed: {relativeSpeed} km/h
              </span>
              
              <div className="relative w-full h-9 bg-slate-900 rounded-xl border border-slate-800 flex items-center px-3 mb-4">
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-500"
                  style={{ left: `${(Number(meetDistanceA) / distance) * 100}%` }}
                />
                
                <div className="absolute left-3 text-xs font-mono font-bold text-amber-400">
                  Train A ({trainSpeedA} km/h) →
                </div>

                <div className="absolute right-3 text-xs font-mono font-bold text-sky-400">
                  ← Train B ({trainSpeedB} km/h)
                </div>
              </div>

              <div className="text-center text-xs font-mono text-slate-300 tabular-nums">
                Collision point locks at <span className="text-amber-400 font-bold">{meetDistanceA} km</span> from Station A in {timeToMeetHours} hours.
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
