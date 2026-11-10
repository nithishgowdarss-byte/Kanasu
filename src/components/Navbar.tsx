import React, { useState, useEffect } from 'react';
import {
  Compass,
  Menu,
  X,
  BookOpen,
  Brain,
  Clock,
  ShieldCheck,
  PlayCircle,
  ShieldAlert,
  Target,
  Layers,
  Flame,
} from 'lucide-react';
import { Language, JourneyProgressSummary } from '../types/kas';
import { HindsightStorage, PROGRESS_UPDATED_EVENT } from '../services/hindsightStorage';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onStartMockTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeSection,
  onNavigate,
  onStartMockTest,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [journey, setJourney] = useState<JourneyProgressSummary>(() =>
    HindsightStorage.getJourneyProgressSummary()
  );

  useEffect(() => {
    const syncProgress = () => {
      setJourney(HindsightStorage.getJourneyProgressSummary());
    };
    window.addEventListener(PROGRESS_UPDATED_EVENT, syncProgress);
    window.addEventListener('storage', syncProgress);
    return () => {
      window.removeEventListener(PROGRESS_UPDATED_EVENT, syncProgress);
      window.removeEventListener('storage', syncProgress);
    };
  }, []);

  const navLinks = [
    { id: 'hero', labelEn: 'Overview', labelKn: 'ಅವಲೋಕನ', icon: Compass },
    { id: 'masterclass', labelEn: '50/50 Lab', labelKn: 'ಎಲಿಮಿನೇಷನ್', icon: ShieldAlert },
    { id: 'concepts', labelEn: 'Flashcards', labelKn: 'ಪರಿಕಲ್ಪನೆಗಳು', icon: BookOpen },
    { id: 'mental-ability', labelEn: 'CSAT Lab', labelKn: 'ಸಿಎಸ್‌ಎಟಿ', icon: Clock },
    { id: 'strategy-calculator', labelEn: 'Cutoff Math', labelKn: 'ಕಟ್‌ಆಫ್ ಲೆಕ್ಕ', icon: Target },
    { id: 'syllabus', labelEn: 'PYQ Audit', labelKn: 'ಪಠ್ಯಕ್ರಮ', icon: Layers },
    { id: 'hindsight', labelEn: 'Hindsight', labelKn: 'ನೆನಪಿನ ಕೋಶ', icon: Brain },
    { id: 'readiness', labelEn: 'Protocol', labelKn: 'ಸಿದ್ಧತಾ ಪಟ್ಟಿ', icon: ShieldCheck },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0d14]/95 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Visible & Clickable on every page (Condition 0002) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('hero')}
              className="group flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1 transition-all cursor-pointer"
              aria-label="KanASu Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30 border border-amber-400/40 group-hover:scale-105 transition-transform">
                <span className="text-white font-extrabold text-lg tracking-wider font-serif">
                  K
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-100 group-hover:text-amber-400 transition-colors font-serif">
                    KanASu
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    KAS
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono tabular-nums tracking-tight">
                  {language === 'kn'
                    ? `${journey.overallReadinessPct}% ಸಿದ್ಧತೆ · ${journey.todayStudyHours}h/${journey.dailyGoalHours}h`
                    : `${journey.overallReadinessPct}% Ready · ${journey.todayStudyHours}h/${journey.dailyGoalHours}h`}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links (All 8 Sections Synchronized) */}
          <nav className="hidden xl:flex items-center space-x-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}
                  />
                  <span>{language === 'kn' ? link.labelKn : link.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: Live Study Telemetry, Language Switcher & Primary CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('hindsight')}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono tabular-nums text-slate-300 transition-colors cursor-pointer"
              title="Jump to Daily Study Hours Tracker"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400 font-bold">{journey.todayStudyHours}h</span>
              <span className="text-slate-500">/</span>
              <span>{journey.dailyGoalHours}h</span>
            </button>

            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('kn')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  language === 'kn'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>

            <button
              onClick={onStartMockTest}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-slate-950" />
              <span>{language === 'kn' ? '೧೦-ನಿಮಿಷ ಮಾಕ್' : '10-Min Mock'}</span>
            </button>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <div className="flex items-center xl:hidden gap-2">
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'kn' : 'en')}
              className="sm:hidden p-1.5 rounded-lg bg-slate-900 text-amber-400 border border-slate-700 text-xs font-bold cursor-pointer"
            >
              {language === 'en' ? 'ಕನ್ನಡ' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Nav Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0d121c] border-b border-slate-800 px-4 pt-2 pb-4 space-y-1.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{language === 'kn' ? link.labelKn : link.labelEn}</span>
                </span>
                {link.id === 'hindsight' && (
                  <span className="font-mono text-[10px] text-amber-400">
                    {journey.todayStudyHours}h / {journey.dailyGoalHours}h
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                onStartMockTest();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{language === 'kn' ? '೧೦-ನಿಮಿಷ ಮಾಕ್ ಪರೀಕ್ಷೆ ನಡೆಸಿ' : 'Launch 10-Min Diagnostic Mock'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
