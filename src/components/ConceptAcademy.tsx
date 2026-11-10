import React, { useState, useEffect } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CONCEPT_FLASHCARDS, ConceptFlashcard } from '../data/teachingData';
import { HindsightStorage, PROGRESS_UPDATED_EVENT } from '../services/hindsightStorage';
import { Language, TopicMastery } from '../types/kas';

interface ConceptAcademyProps {
  language: Language;
}

export const ConceptAcademy: React.FC<ConceptAcademyProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);
  const [masteries, setMasteries] = useState<Record<string, TopicMastery>>(() =>
    HindsightStorage.getTopicMasteries()
  );

  useEffect(() => {
    const syncMasteries = () => {
      setMasteries(HindsightStorage.getTopicMasteries());
    };
    window.addEventListener(PROGRESS_UPDATED_EVENT, syncMasteries);
    window.addEventListener('storage', syncMasteries);
    return () => {
      window.removeEventListener(PROGRESS_UPDATED_EVENT, syncMasteries);
      window.removeEventListener('storage', syncMasteries);
    };
  }, []);

  const categories = [
    'All',
    'Karnataka History',
    'Karnataka Geography',
    'Karnataka Polity',
    'Karnataka Economy',
  ];

  const filteredCards =
    selectedCategory === 'All'
      ? CONCEPT_FLASHCARDS
      : CONCEPT_FLASHCARDS.filter((c) => c.category === selectedCategory);

  const currentCard: ConceptFlashcard = filteredCards[currentIndex] || filteredCards[0];

  // Check if this card has an existing TopicMastery entry
  const getCardMastery = (card: ConceptFlashcard): TopicMastery | undefined => {
    if (masteries[card.titleEn]) return masteries[card.titleEn];
    // Match partial key for seeded entries (e.g. 'Kadambas of Banavasi' or 'Article 371(J)')
    const matchKey = Object.keys(masteries).find(
      (k) =>
        card.titleEn.toLowerCase().includes(k.toLowerCase()) ||
        k.toLowerCase().includes(card.titleEn.split(' ')[0].toLowerCase())
    );
    return matchKey ? masteries[matchKey] : undefined;
  };

  const currentMastery = getCardMastery(currentCard);
  const learnedCardsCount = CONCEPT_FLASHCARDS.filter((c) => !!getCardMastery(c)).length;

  const handleNext = () => {
    setIsFlipped(false);
    setFeedbackGiven(null);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setFeedbackGiven(null);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleRating = (rating: 1 | 3 | 5) => {
    setFeedbackGiven(
      rating === 5 ? 'Mastered (+EF)' : rating === 3 ? 'Reinforced' : 'Scheduled for Re-review'
    );
    HindsightStorage.updateTopicMastery(currentCard.titleEn, rating >= 3, rating);
    setMasteries(HindsightStorage.getTopicMasteries());
    setTimeout(() => {
      handleNext();
    }, 600);
  };

  return (
    <section id="concepts" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Pareto 80/20 & Zeigarnik Curiosity Hook */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="text-xs font-mono text-amber-400 mb-3 tracking-wide tabular-nums">
          02 · High-Yield Active Recall · {learnedCardsCount}/{CONCEPT_FLASHCARDS.length} Concepts
          Tracked in SM-2
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-serif">
          {language === 'kn'
            ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಯ ೪೫% ಅಂಕಗಳು ಕೇವಲ ೫ ಕರ್ನಾಟಕ ವಿಷಯಗಳಲ್ಲಿವೆ. ಪ್ರತಿ ಬಾರಿ ಮರುಕಳಿಸುವ ಪರೀಕ್ಷಾ ಬಲೆಗಳನ್ನು ಭೇದಿಸಿ.'
            : '45% of Your Paper Lives in 5 Karnataka Domains. Master the Traps Examiners Repeat Every Cycle.'}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {language === 'kn'
            ? 'ಪುಸ್ತಕದ ಸಾಲುಗಳಿಗೆ ಬಣ್ಣ ಹಚ್ಚುವುದರಿಂದ ನೆನಪಿನ ಶಕ್ತಿ ಹೆಚ್ಚುವುದಿಲ್ಲ. ಕೆಳಗಿನ ಕಾರ್ಡ್‌ಗಳನ್ನು ತಿರುಗಿಸಿ ಪರೀಕ್ಷಕರು ಹೆಣೆಯುವ ನಿಖರವಾದ ಗೊಂದಲದ ಹೇಳಿಕೆಯನ್ನು ಪತ್ತೆಹಚ್ಚಿ.'
            : 'Passive highlighting creates the illusion of competence. Flip each high-frequency card below to expose the exact distractor statement the commission uses to trip up half-prepared candidates.'}
        </p>

        {/* Functional Category Filter Tabs */}
        <div className="inline-flex flex-wrap justify-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
                setFeedbackGiven(null);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Container */}
      <div className="max-w-2xl mx-auto">
        {/* Quick Card Progress Selector Dots */}
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-1.5">
            {filteredCards.map((c, idx) => {
              const m = getCardMastery(c);
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsFlipped(false);
                    setFeedbackGiven(null);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'w-7 bg-amber-400'
                      : m
                      ? 'w-3 bg-emerald-500/70 hover:bg-emerald-400'
                      : 'w-3 bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={c.titleEn}
                />
              );
            })}
          </div>
          <div className="text-[11px] font-mono tabular-nums text-slate-400">
            {currentMastery ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> SM-2 Ease: {currentMastery.easeFactor}
              </span>
            ) : (
              <span>Unrated · Flip & Rate to Lock</span>
            )}
          </div>
        </div>

        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="min-h-[380px] bg-[#0f172a] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          {/* Top Unboxed Metadata Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs font-mono text-slate-400">
            <span>
              {currentCard.category} · {currentCard.pyqFrequency}
            </span>
            <div className="flex items-center gap-1.5 text-amber-400">
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Flip to Concept' : 'Flip to Reveal Trap'}</span>
            </div>
          </div>

          {/* Flashcard Content: Front vs Back */}
          <div className="py-6">
            {!isFlipped ? (
              // FRONT: Curiosity Gap Hook + Core Concept Overview
              <div className="space-y-4">
                <p className="text-xs sm:text-sm font-mono text-amber-300 leading-relaxed">
                  {language === 'kn' ? currentCard.hookQuestionKn : currentCard.hookQuestionEn}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug font-serif">
                  {language === 'kn' ? currentCard.titleKn : currentCard.titleEn}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {language === 'kn' ? currentCard.summaryKn : currentCard.summaryEn}
                </p>
                <div className="pt-2 text-xs text-slate-400 font-mono">
                  {language === 'kn'
                    ? 'ಕಾರ್ಡ್ ಕ್ಲಿಕ್ ಮಾಡಿ ೩ ಪ್ರಮುಖ ಅಂಶಗಳು ಮತ್ತು ಪರೀಕ್ಷಕರ ಬಲೆಯನ್ನು ನೋಡಿ →'
                    : 'Click card to expose the 3 exam anchors and the question setter’s trap →'}
                </div>
              </div>
            ) : (
              // BACK: Detailed Anchors & Topper Trap
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider font-mono text-amber-400">
                  {language === 'kn'
                    ? 'ನೆನಪಿಡಬೇಕಾದ ೩ ಪ್ರಮುಖ ಸತ್ಯಗಳು:'
                    : '3 Non-Negotiable Exam Facts:'}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {(language === 'kn' ? currentCard.keyPointsKn : currentCard.keyPointsEn).map(
                    (pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-mono font-bold">0{i + 1}.</span>
                        <span>{pt}</span>
                      </li>
                    )
                  )}
                </ul>

                {/* Topper Trap Box */}
                <div className="p-4 bg-red-950/30 border border-red-500/30 rounded-xl text-xs text-red-200 leading-relaxed">
                  <span className="font-bold text-red-400 block mb-1 font-mono">
                    {language === 'kn'
                      ? 'ಕೆಪಿಎಸ್‌ಸಿ ಪರೀಕ್ಷಕರ ನೆಚ್ಚಿನ ಬಲೆ:'
                      : 'THE EXAMINER’S FAVORITE DISTRACTOR:'}
                  </span>
                  <span>
                    {language === 'kn' ? currentCard.topperTrapKn : currentCard.topperTrapEn}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Navigation & Recall Rating */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                title="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                {currentIndex + 1} / {filteredCards.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                title="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Active Recall SM-2 Feedback Buttons */}
            {isFlipped && (
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleRating(1)}
                  className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 border border-red-700/60 text-red-300 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  Missed It
                </button>
                <button
                  onClick={() => handleRating(3)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  Recalled
                </button>
                <button
                  onClick={() => handleRating(5)}
                  className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  Instant Lock
                </button>
              </div>
            )}

            {feedbackGiven && (
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Logged to Hindsight · {feedbackGiven}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
