/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Settings, 
  Terminal, 
  ShieldCheck, 
  HardDriveDownload, 
  RotateCw, 
  Check, 
  Activity, 
  Palette, 
  Cpu, 
  SlidersHorizontal 
} from 'lucide-react';
import { isAudioEnabled, setAudioEnabled } from '../utils/audioFeedback';
import { LanguageType, TRANSLATIONS } from '../utils/i18n';

interface SettingsPanelProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  accentAccent: 'blue' | 'green' | 'red';
  onChangeAccent: (accent: 'blue' | 'green' | 'red') => void;
  lang: LanguageType;
  onChangeLanguage: (lang: LanguageType) => void;
}

export default function SettingsPanel({ 
  theme, 
  onToggleTheme, 
  accentAccent, 
  onChangeAccent,
  lang,
  onChangeLanguage
}: SettingsPanelProps) {
  // Local state configurations
  const [metricToggles, setMetricToggles] = useState({
    followers: true,
    projects: true,
    clients: true,
    videos: true
  });
  
  const [refreshInterval, setRefreshInterval] = useState<number>(3);
  const [telemetryState, setTelemetryState] = useState<'SANDBOX_SIM' | 'CLOUD_INGRESS'>('SANDBOX_SIM');
  
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);

  // Sound preference state
  const [audioEnabled, setAudioSetting] = useState(isAudioEnabled());

  const handleMetricToggle = (key: keyof typeof metricToggles) => {
    setMetricToggles({
      ...metricToggles,
      [key]: !metricToggles[key]
    });
  };

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupSuccess(true);
      setTimeout(() => setBackupSuccess(false), 4000);
    }, 2000);
  };

  const handleToggleAudioSetting = () => {
    const nextVal = !audioEnabled;
    setAudioSetting(nextVal);
    setAudioEnabled(nextVal);
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/10 space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Settings size={20} className="text-blue-500" />
          Secure Developer Settings Workspace
        </h2>
        <p className="text-xs text-zinc-550 dark:text-zinc-500">
          Personalize metrics, modify client-side latency intervals, and backing up local parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Card: Theme & Palette Tweak */}
        <div className="space-y-6">
          <div className="p-5 border border-zinc-200 dark:border-zinc-850 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/25 space-y-4">
            <h4 className="font-sans font-bold text-xs text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <Palette size={14} className="text-blue-500" /> Theme Configuration
            </h4>
            
            {/* Theme Toggle Button */}
            <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-900/50">
              <div>
                <span className="text-xs font-semibold text-zinc-750 dark:text-zinc-300 block">Visual Tone Mode</span>
                <span className="text-[10px] text-zinc-400 block font-mono">Current mode: {theme.toUpperCase()}</span>
              </div>
              <button 
                id="settings-theme-toggle-btn"
                onClick={onToggleTheme}
                className="px-3 py-1.5 border border-zinc-250 dark:border-zinc-750 bg-white dark:bg-zinc-950 font-mono text-[10px] uppercase font-bold text-zinc-650 dark:text-zinc-300 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer"
              >
                TOGGLE_SHADE
              </button>
            </div>

            {/* Audio Toggle Button */}
            <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-900/50">
              <div>
                <span className="text-xs font-semibold text-zinc-750 dark:text-zinc-300 block">Ambient Audio & Haptics</span>
                <span className="text-[10px] text-zinc-400 block font-mono">Subtle audio click/hover responses</span>
              </div>
              <button 
                onClick={handleToggleAudioSetting}
                className={`px-3 py-1.5 border font-mono text-[10px] uppercase font-bold rounded transition-all cursor-pointer ${audioEnabled ? 'bg-blue-500/10 border-blue-500/40 text-blue-500' : 'bg-transparent border-zinc-250 dark:border-zinc-750 text-zinc-400'}`}
              >
                {audioEnabled ? 'MUTED: FALSE' : 'MUTED: TRUE'}
              </button>
            </div>

            {/* Language Switcher Button (i18n) */}
            <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-900/50">
              <div>
                <span className="text-xs font-semibold text-zinc-750 dark:text-zinc-300 block">System Language / Wika</span>
                <span className="text-[10px] text-zinc-400 block font-mono">Toggle contents between ENG and FIL</span>
              </div>
              <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <button
                  onClick={() => onChangeLanguage('en')}
                  className={`px-2 py-1 text-[9px] font-mono font-bold rounded transition-all cursor-pointer ${lang === 'en' ? 'bg-blue-500 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-700'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => onChangeLanguage('fil')}
                  className={`px-2 py-1 text-[9px] font-mono font-bold rounded transition-all cursor-pointer ${lang === 'fil' ? 'bg-blue-500 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-700'}`}
                >
                  FIL
                </button>
              </div>
            </div>

            {/* Accent Accent Palette Select */}
            <div className="space-y-2">
              <div>
                <span className="text-xs font-semibold text-zinc-750 dark:text-zinc-300 block">Accent Palette Highlights</span>
                <span className="text-[10px] text-zinc-400 block font-mono">Changes active UI borders and details</span>
              </div>
              <div className="flex gap-2 pt-1.5">
                <button
                  onClick={() => onChangeAccent('blue')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition duration-150 cursor-pointer ${accentAccent === 'blue' ? 'bg-blue-500/15 border-blue-500 text-blue-500' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}
                >
                  ELECTRIC_BLUE
                </button>
                <button
                  onClick={() => onChangeAccent('green')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition duration-150 cursor-pointer ${accentAccent === 'green' ? 'bg-emerald-500/15 border-emerald-500 text-emerald-500' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}
                >
                  NEON_EMERALD
                </button>
                <button
                  onClick={() => onChangeAccent('red')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition duration-150 cursor-pointer ${accentAccent === 'red' ? 'bg-rose-500/15 border-rose-500 text-rose-500' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}
                >
                  SOLAR_RUBY
                </button>
              </div>
            </div>
          </div>

          {/* Backup Database */}
          <div className="p-5 border border-zinc-200 dark:border-zinc-850 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/25 space-y-4">
            <h4 className="font-sans font-bold text-xs text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <Cpu size={14} className="text-blue-500" /> Database & Ledger Administration
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed font-sans">
              Download localized cookie logs, clear session storage caches, or trigger a full cryptographic system backup.
            </p>

            <button
              onClick={handleBackup}
              disabled={isBackingUp || backupSuccess}
              className="py-2.5 px-4 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-xl font-mono text-xs font-bold w-full hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isBackingUp ? (
                <>
                  <RotateCw size={12} className="animate-spin" />
                  <span>EXECUTING BACKUP...</span>
                </>
              ) : backupSuccess ? (
                <>
                  <Check size={12} className="text-emerald-300" />
                  <span>BACKUP_ARCHIVE_SECURED</span>
                </>
              ) : (
                <>
                  <HardDriveDownload size={12} />
                  <span>EXECUTE_SYSTEM_BACKUP.sh</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Card: Dynamic Telemetry Controls */}
        <div className="p-5 border border-zinc-200 dark:border-zinc-850 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/25 space-y-6">
          <h4 className="font-sans font-bold text-xs text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-blue-500" /> Telemetry Tuning
          </h4>

          {/* Slider for telemetry refresh rate */}
          <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900/50 pb-4">
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-zinc-750 dark:text-zinc-300 block">KPI Ref-Interval State</span>
              <span className="font-mono text-[10px] text-blue-500 font-bold">{refreshInterval} seconds</span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={10} 
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="w-full highlight-blue scale-y-110 accent-blue-500 cursor-pointer"
            />
            <p className="text-[10px] text-zinc-400 font-mono">Governs rate of automated dashboard updates.</p>
          </div>

          {/* Dropdown for mock API endpoint type */}
          <div className="space-y-2 pb-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-zinc-750 dark:text-zinc-300 block">Telemetry Ingress Endpoint</span>
              <span className="font-mono text-[9px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded">CONNECTED</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setTelemetryState('SANDBOX_SIM')}
                className={`flex-1 py-2 text-xs font-mono font-bold rounded border transition ${telemetryState === 'SANDBOX_SIM' ? 'bg-zinc-100 dark:bg-zinc-900 text-blue-500 border-zinc-300 dark:border-zinc-750' : 'text-zinc-400 border-transparent'}`}
              >
                SANDBOX_SIM
              </button>
              <button 
                onClick={() => setTelemetryState('CLOUD_INGRESS')}
                className={`flex-1 py-2 text-xs font-mono font-bold rounded border transition ${telemetryState === 'CLOUD_INGRESS' ? 'bg-zinc-100 dark:bg-zinc-900 text-blue-500 border-zinc-300 dark:border-zinc-750' : 'text-zinc-400 border-transparent'}`}
              >
                CLOUD_INGRESS
              </button>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">Configure where metrics queries execute: localized cookies sandbox or serverless Run container streams.</p>
          </div>

          {/* Connected state ticker */}
          <div className="p-3 bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-850 rounded-xl flex items-center justify-between text-[11px] font-mono text-zinc-550 select-none">
            <div className="flex items-center gap-1.5">
              <Activity size={13} className="text-blue-500 animate-pulse" />
              <span>TLS HANDSHAKE ENCRYPT:</span>
            </div>
            <span className="text-emerald-500 font-bold">SHA-256 STATE STABLE</span>
          </div>
        </div>

      </div>

    </div>
  );
}
