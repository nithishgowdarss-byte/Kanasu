/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ThreeCanvas } from './components/ThreeCanvas';
import { ThreeDock } from './components/ThreeDock';
import { EliminationMasterclass } from './components/EliminationMasterclass';
import { ConceptAcademy } from './components/ConceptAcademy';
import { ScoreCalculator } from './components/ScoreCalculator';
import { SyllabusTrends } from './components/SyllabusTrends';
import { HindsightDashboard } from './components/HindsightDashboard';
import { MentalAbilitySolver } from './components/MentalAbilitySolver';
import { ExamReadiness } from './components/ExamReadiness';
import { Footer } from './components/Footer';
import { MockTestSimulator } from './components/MockTestSimulator';
import { Language, MockTestResult } from './types/kas';
import { HindsightStorage } from './services/hindsightStorage';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [explodedView, setExplodedView] = useState(0);
  const [is120Hz, setIs120Hz] = useState(true);
  const [theme3D, setTheme3D] = useState<'midnight' | 'amber' | 'granite'>('amber');
  const [fps, setFps] = useState(120);
  const [frameTimeMs, setFrameTimeMs] = useState(8.3);
  const [rendererName, setRendererName] = useState('Hardware GPU Accelerated');
  const [showMockTest, setShowMockTest] = useState(false);

  // Load preferences
  useEffect(() => {
    const prefs = HindsightStorage.getPreferences();
    setLanguage(prefs.language);
    setIs120Hz(prefs.fpsTarget === 120);
    setTheme3D(prefs.theme3D);
  }, []);

  // Track scroll position for 120fps Three.js scene interpolation
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const current = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          const clamped = Math.max(0, Math.min(1, current));
          setScrollProgress(clamped);

          // Calculate current 3D stage based on scroll
          const stageIdx = Math.min(4, Math.floor(clamped * 5));
          setCurrentStage(stageIdx);

          // Active section spy
          const scrollY = window.scrollY;
          const sections = ['hero', 'masterclass', 'concepts', 'mental-ability', 'strategy-calculator', 'syllabus', 'hindsight', 'readiness'];
          for (const sId of sections) {
            const el = document.getElementById(sId);
            if (el) {
              const top = el.offsetTop - 140;
              const height = el.offsetHeight;
              if (scrollY >= top && scrollY < top + height) {
                setActiveSection(sId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener ('h' for dock, 'm' for mock)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'm' || e.key === 'M') {
        setShowMockTest(prev => !prev);
      }
      if (e.key === 'Escape' && showMockTest) {
        setShowMockTest(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMockTest]);

  const handleStageSelect = (stageIdx: number) => {
    setCurrentStage(stageIdx);
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = (stageIdx / 4) * totalHeight;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    HindsightStorage.savePreferences({ language: newLang });
  };

  const handleToggle120Hz = () => {
    const newTarget = !is120Hz;
    setIs120Hz(newTarget);
    HindsightStorage.savePreferences({ fpsTarget: newTarget ? 120 : 60 });
  };

  const handleTheme3DChange = (newTheme: 'midnight' | 'amber' | 'granite') => {
    setTheme3D(newTheme);
    HindsightStorage.savePreferences({ theme3D: newTheme });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0d14] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 3D Scene Viewport Layer (120 FPS Background Canvas) */}
      <ThreeCanvas
        scrollProgress={scrollProgress}
        activeStage={currentStage}
        theme={theme3D}
        explodedView={explodedView}
        onFpsUpdate={(curFps, curFrameTime, curRenderer) => {
          setFps(curFps);
          setFrameTimeMs(curFrameTime);
          setRendererName(curRenderer);
        }}
      />

      {/* Sticky Header */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        activeSection={activeSection}
        onNavigate={handleNavigateSection}
        onStartMockTest={() => setShowMockTest(true)}
      />

      {/* Teaching Curriculum Foreground Content Stack */}
      <main className="relative z-10">
        <HeroSection
          language={language}
          onStartMock={() => setShowMockTest(true)}
          onOpenMasterclass={() => handleNavigateSection('masterclass')}
          onOpenConcepts={() => handleNavigateSection('concepts')}
          onOpenCalculator={() => handleNavigateSection('strategy-calculator')}
          onOpenHindsight={() => handleNavigateSection('hindsight')}
        />

        {/* Pillar 2: Elimination Tactics Masterclass */}
        <EliminationMasterclass language={language} />

        {/* Pillar 1: High-Yield Karnataka Concept Academy */}
        <ConceptAcademy language={language} />

        {/* CSAT Paper II Visual Lab */}
        <MentalAbilitySolver language={language} />

        {/* Pillar 4: Cutoff Math & Safe Attempt Calculator */}
        <ScoreCalculator language={language} />

        {/* Official Syllabus Decryption & Trends */}
        <SyllabusTrends language={language} />

        {/* Pillar 3: Hindsight Spaced Memory Matrix */}
        <HindsightDashboard
          language={language}
          onReviewTopic={() => setShowMockTest(true)}
        />

        {/* Exam Day Protocol & Hall Ticket Verification */}
        <ExamReadiness language={language} />
      </main>

      {/* Non-overlapping Footer */}
      <Footer language={language} />

      {/* 3D Ergonomic Collapsible Bottom Dock (Zero Viewport Occlusion) */}
      <ThreeDock
        currentStage={currentStage}
        onSelectStage={handleStageSelect}
        explodedView={explodedView}
        onExplodedChange={setExplodedView}
        fps={fps}
        frameTimeMs={frameTimeMs}
        rendererName={rendererName}
        is120Hz={is120Hz}
        onToggle120Hz={handleToggle120Hz}
        theme={theme3D}
        onThemeChange={handleTheme3DChange}
      />

      {/* Full Official Prelims Mock Test Simulator Modal */}
      {showMockTest && (
        <MockTestSimulator
          language={language}
          onClose={() => setShowMockTest(false)}
          onSaveResult={() => {
            // Persisted in Hindsight
          }}
          onJumpToHindsight={() => {
            setShowMockTest(false);
            handleNavigateSection('hindsight');
          }}
        />
      )}

    </div>
  );
}
