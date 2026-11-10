import React, { useState } from 'react';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { SYLLABUS_DATA } from '../data/kasData';
import { Language } from '../types/kas';

interface SyllabusTrendsProps {
  language: Language;
}

export const SyllabusTrends: React.FC<SyllabusTrendsProps> = ({ language }) => {
  const [selectedPaper, setSelectedPaper] = useState<'All' | 'Paper I' | 'Paper II'>('All');
  const [expandedSubject, setExpandedSubject] = useState<string | null>('p1_hist');

  const filtered = selectedPaper === 'All' 
    ? SYLLABUS_DATA 
    : SYLLABUS_DATA.filter(s => s.paper === selectedPaper);

  return (
    <section id="syllabus" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header — Signal vs. Noise Pareto Hook */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-400 font-semibold mb-3">
          {language === 'kn'
            ? '05 · ಹಳೆಯ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳ ರಹಸ್ಯ · ೨೦೧೭–೨೦೨೪ ವಿಶ್ಲೇಷಣೆ'
            : '05 · PYQ Reverse-Engineering · 2017–2024 Audit'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-serif">
          {language === 'kn'
            ? 'ಇಡೀ ಪಠ್ಯಕ್ರಮವನ್ನು ಒಂದೇ ರೀತಿ ಓದಬೇಡಿ! ಶೇ. ೭೨ ರಷ್ಟು ಪ್ರಶ್ನೆಗಳು ಕೇವಲ ಶೇ. ೨೮ ರಷ್ಟು ವಿಷಯಗಳಿಂದ ಬರುತ್ತವೆ.'
            : 'Stop Studying the Whole Syllabus Equally. 72% of Questions Come From 28% of the Notification.'}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {language === 'kn'
            ? 'ಕಡಿಮೆ ಅಂಕ ಬರುವ ಅಧ್ಯಾಯಗಳಿಗೆ ತಿಂಗಳುಗಟ್ಟಲೆ ಸಮಯ ವ್ಯರ್ಥ ಮಾಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ. ಪತ್ರಿಕೆ ೧ ಮತ್ತು ೨ ರಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಪ್ರಶ್ನೆಗಳನ್ನು ಆಕರ್ಷಿಸುವ ಹೈ-ಯೀಲ್ಡ್ (High-Yield) ಕ್ಷೇತ್ರಗಳ ನಕ್ಷೆ ಇಲ್ಲಿದೆ.'
            : 'Average aspirants spend 4 months on topics that produce 2 marks. Rankers ruthlessly hunt high-density clusters. Here is the exact weightage audit of Paper I and Paper II.'}
        </p>

        {/* Paper Toggle Filter */}
        <div className="inline-flex bg-slate-900 border border-slate-800 rounded-xl p-1 mt-6">
          {(['All', 'Paper I', 'Paper II'] as const).map(p => (
            <button
              key={p}
              onClick={() => setSelectedPaper(p)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedPaper === p
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Syllabus Cards Grid - Stacks to single column on mobile (Condition 0006) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(sub => {
          const isExpanded = expandedSubject === sub.id;
          return (
            <div
              key={sub.id}
              className="bg-[#0f172a] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Top Metadata — Unboxed Editorial Style */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80 font-mono text-xs tabular-nums">
                  <span className="text-amber-400 font-bold uppercase tracking-wider">
                    {sub.paper}
                  </span>
                  <span className="font-semibold text-emerald-400">
                    Exam Share: ~{sub.weightagePercent}%
                  </span>
                </div>

                {/* Subject Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {language === 'kn' ? sub.subjectKn : sub.subject}
                </h3>

                {/* PYQ Trend Note */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 mb-4 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{language === 'kn' ? sub.pyqTrendKn : sub.pyqTrendEn}</span>
                </div>

                {/* Topics List */}
                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    {language === 'kn' ? 'ಪ್ರಮುಖ ಉಪ-ವಿಭಾಗಗಳು:' : 'High-Yield Sub-Domains:'}
                  </span>
                  <div className="space-y-1.5">
                    {sub.topics.slice(0, isExpanded ? sub.topics.length : 3).map((top, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs"
                      >
                        <span className="text-slate-200 font-medium">
                          {language === 'kn' ? top.nameKn : top.nameEn}
                        </span>
                        {top.highYield && (
                          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-400 shrink-0 ml-2">
                            ★ Priority ROI
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expand / Collapse toggle */}
              {sub.topics.length > 3 && (
                <button
                  onClick={() => setExpandedSubject(isExpanded ? null : sub.id)}
                  className="flex items-center justify-center gap-1 w-full pt-2 text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                >
                  <span>{isExpanded ? 'Show Less' : `Inspect All ${sub.topics.length} Sub-Topics`}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
