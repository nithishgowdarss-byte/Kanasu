import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Layers, Zap, Gauge, Palette } from 'lucide-react';

interface ThreeDockProps {
  currentStage: number;
  onSelectStage: (stage: number) => void;
  explodedView: number;
  onExplodedChange: (val: number) => void;
  fps: number;
  frameTimeMs: number;
  rendererName: string;
  is120Hz: boolean;
  onToggle120Hz: () => void;
  theme: 'midnight' | 'amber' | 'granite';
  onThemeChange: (theme: 'midnight' | 'amber' | 'granite') => void;
}

export const ThreeDock: React.FC<ThreeDockProps> = ({
  currentStage,
  onSelectStage,
  explodedView,
  onExplodedChange,
  fps,
  frameTimeMs,
  rendererName,
  is120Hz,
  onToggle120Hz,
  theme,
  onThemeChange,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Wire Hotkey 'H' to toggle 3D Dock as promised in tooltip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const stages = [
    { id: 0, label: 'Monument', sub: 'Heritage' },
    { id: 1, label: 'Syllabus', sub: 'Paper I & II' },
    { id: 2, label: 'Cortex', sub: 'Hindsight' },
    { id: 3, label: 'Crucible', sub: 'Chrono Test' },
    { id: 4, label: 'Crest', sub: 'KAS Honor' },
  ];

  const themes: { id: 'amber' | 'midnight' | 'granite'; label: string }[] = [
    { id: 'amber', label: 'Hampi Gold' },
    { id: 'midnight', label: 'Midnight' },
    { id: 'granite', label: 'Granite' },
  ];

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 ease-out ${
        collapsed ? 'bottom-2 translate-y-[calc(100%-2.5rem)]' : 'bottom-6 translate-y-0'
      } max-w-[min(980px,95vw)] w-full`}
    >
      {/* Collapse/Expand Toggle Tab */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-700 border-b-0 rounded-t-lg text-xs font-mono text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors shadow-lg cursor-pointer tabular-nums"
          title="Toggle 3D Viewport Controls (Hotkey: H)"
        >
          {collapsed ? (
            <ChevronUp className="w-3.5 h-3.5 text-amber-500" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-amber-500" />
          )}
          <span>{collapsed ? '3D Spatial Controls [H]' : 'Hide 3D Dock [H]'}</span>
          <span className="ml-1 px-1.5 py-0.2 bg-slate-800 text-[10px] text-amber-300 rounded font-bold">
            {fps} FPS
          </span>
        </button>
      </div>

      {/* Main Solid Dock Surface (No backdrop-filter over active canvas as per skill rule) */}
      <div className="bg-[#0f172a] border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl text-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Stage Navigator */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            {stages.map((stg) => {
              const isActive = currentStage === stg.id;
              return (
                <button
                  key={stg.id}
                  onClick={() => onSelectStage(stg.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="block text-[11px] font-semibold">{stg.label}</span>
                  <span className="block text-[9px] text-slate-400 opacity-80">{stg.sub}</span>
                </button>
              );
            })}
          </div>

          {/* Exploded View Slider */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 rounded-xl border border-slate-800 tabular-nums">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs text-slate-300 font-mono whitespace-nowrap">Explode:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={explodedView}
              onChange={(e) => onExplodedChange(parseFloat(e.target.value))}
              className="w-16 sm:w-24 accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              title="Disassemble 3D layers"
            />
            <span className="text-[11px] font-mono text-amber-400 w-8 text-right">
              {Math.round(explodedView * 100)}%
            </span>
          </div>

          {/* 3D Lighting Theme Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <Palette className="w-3.5 h-3.5 text-amber-400 ml-1.5 mr-0.5" />
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                  theme === t.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 120FPS & Hardware Status Display */}
          <div className="flex items-center gap-2 tabular-nums">
            <button
              onClick={onToggle120Hz}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono font-medium border cursor-pointer transition-all ${
                is120Hz
                  ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle target 120Hz high-refresh mode"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>{is120Hz ? '120Hz' : '60Hz'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-[11px] font-mono">
              <Gauge className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-emerald-400 font-bold">{fps} FPS</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{frameTimeMs}ms</span>
            </div>
          </div>
        </div>

        {/* Small Hardware Footer Info */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <div className="truncate max-w-[320px] md:max-w-md">
            <span className="text-slate-400">GPU:</span>{' '}
            {rendererName.replace(/^ANGLE \((.*)\)$/, '$1')}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400/90 font-medium">Scroll-linked 3D telemetry</span>
            <span className="text-slate-400">•</span>
            <span>Keys: [H] Dock · [M] Mock Test</span>
          </div>
        </div>
      </div>
    </div>
  );
};
