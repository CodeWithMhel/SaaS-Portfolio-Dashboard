/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  Terminal, 
  User, 
  FileText, 
  Briefcase, 
  Sparkles, 
  FolderOpen,
  Bell,
  BellRing,
  X,
  Check,
  CheckCheck,
  AlertCircle,
  Star,
  Trash2,
  Cpu
} from 'lucide-react';
import { playNotificationSound, playClickSound } from '../utils/audioFeedback';

interface NavbarProps {
  onToggleSidebar: () => void;
  onScrollToElement: (id: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

interface AlertItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'star';
}

interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'star';
}

const MOCK_ALERT_SEEDS = [
  { title: "High Traffic Spike", message: "Digital HQ ingress rate spiked by +142% on API route", type: "warning" },
  { title: "New GitHub Star", message: "User 'dev-crux-99' starred Steel Rolling Mill Simulator!", type: "star" },
  { title: "Task Pipeline Sync", message: "Database schemas and custom templates successfully backed up", type: "success" },
  { title: "Direct Transmission", message: "Encrypted direct contact handshake received at PROD node", type: "info" },
  { title: "Memory Buffer Pruned", message: "Unused local buffer cache pruned. Cleared up 14.8MB space", type: "success" },
  { title: "Portfolio Starred", message: "Another developer star checked on Romel's primary portfolio hub!", type: "star" },
  { title: "Recruiter Download", message: "Founder's licensed resume and certification package downloaded", type: "info" },
  { title: "Security Gateway check", message: "Firewall verified. All ports listening securely on host 0.0.0.0", type: "success" }
];

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: "alert-1",
    title: "System Online Check",
    message: "Digital Headquarters dashboard has successfully initialized port listener on 3000",
    timestamp: "2 mins ago",
    read: false,
    type: "success"
  },
  {
    id: "alert-2",
    title: "Vite Asset Route Setup",
    message: "Subtle haptic chimes and reactive dynamic UI telemetry parameters loaded safely",
    timestamp: "12 mins ago",
    read: true,
    type: "info"
  }
];


const MENU_ITEMS = [
  { id: 'about-section', label: 'About', icon: User },
  { id: 'experience-section', label: 'Experience', icon: FileText },
  { id: 'portfolio-section', label: 'Portfolio', icon: FolderOpen },
  { id: 'mission-section', label: 'Mission', icon: Sparkles },
  { id: 'career-section', label: 'Career', icon: Briefcase }
];

export default function Navbar({ onToggleSidebar, onScrollToElement, theme, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Dashboard alerts states
  const [alerts, setAlerts] = useState<AlertItem[]>(() => INITIAL_ALERTS);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle Scroll states
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      // Simple scroll spy logic
      const scrollPosition = window.scrollY + 120; // offset
      for (const item of MENU_ITEMS) {
        const borderElement = document.getElementById(item.id);
        if (borderElement) {
          const top = borderElement.offsetTop;
          const height = borderElement.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Periodic simulated fetching of telemetry & GitHub alerts
  useEffect(() => {
    const generateAlert = () => {
      const idx = Math.floor(Math.random() * MOCK_ALERT_SEEDS.length);
      const seed = MOCK_ALERT_SEEDS[idx];
      
      const newAlert: AlertItem = {
        id: `alert-${Date.now()}`,
        title: seed.title,
        message: seed.message,
        timestamp: "Just now",
        read: false,
        type: seed.type as any
      };

      const newToast: ToastItem = {
        id: `toast-${Date.now()}`,
        title: seed.title,
        message: seed.message,
        type: seed.type as any
      };

      setAlerts(prev => [newAlert, ...prev]);
      setToasts(prev => [...prev, newToast]);
      playNotificationSound();

      // Automatically prune the toast from screen after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 5000);
    };

    // Trigger first dynamic background update after 12 seconds
    const initialTimeout = setTimeout(() => {
      generateAlert();
    }, 12000);

    // Continue periodic check-ins every 26 seconds
    const interval = setInterval(() => {
      generateAlert();
    }, 26000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Handle dropdown mouse overlay focus click outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  // Dropdown interactivity metrics
  const unreadCount = alerts.filter(a => !a.read).length;

  const handleMarkAllRead = () => {
    playClickSound();
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const handleClearAll = () => {
    playClickSound();
    setAlerts([]);
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: !a.read } : a));
  };

  const handleDeleteAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleManualTriggerAlert = () => {
    const idx = Math.floor(Math.random() * MOCK_ALERT_SEEDS.length);
    const seed = MOCK_ALERT_SEEDS[idx];
    
    const newAlert: AlertItem = {
      id: `alert-${Date.now()}`,
      title: `${seed.title} (Manual Probe)`,
      message: seed.message,
      timestamp: "Just now",
      read: false,
      type: seed.type as any
    };

    const newToast: ToastItem = {
      id: `toast-${Date.now()}`,
      title: `${seed.title} (Manual)`,
      message: seed.message,
      type: seed.type as any
    };

    setAlerts(prev => [newAlert, ...prev]);
    setToasts(prev => [...prev, newToast]);
    playNotificationSound();

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 5000);
  };


  return (
    <header 
      id="top-sticky-navbar"
      className={`
        sticky top-0 z-30 transition-all duration-300 border-b md:left-64 md:w-[calc(100%-16rem)] w-full
        ${isScrolled 
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800 shadow-sm' 
          : 'bg-transparent border-transparent'
        }
      `}
    >
      <div className="mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Hamburg Menu on Mobile, Search/Indicator on Desktop */}
        <div className="flex items-center gap-3">
          <button 
            id="mobile-sidebar-toggle-btn"
            onClick={onToggleSidebar}
            className="md:hidden p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-650 dark:text-zinc-350 cursor-pointer"
          >
            <Menu size={16} />
          </button>
          
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-zinc-400 dark:text-zinc-550 border border-zinc-200/50 dark:border-zinc-900 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 select-none">
            <Terminal size={11} className="text-blue-500 animate-pulse" />
            <span>OPERATIONAL PORTAL LOGS:</span>
            <span className="text-green-500 font-bold">READY</span>
          </div>

          {/* Interactive Command Search Launcher */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' }))}
            className="flex items-center gap-2 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 rounded-xl text-xs font-mono transition shadow-sm cursor-pointer"
            title="Open system search (Ctrl+K)"
          >
            <span className="font-sans text-zinc-400 dark:text-zinc-500 font-medium">Search portfolio...</span>
            <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-805 rounded font-bold text-[9px] text-blue-500 leading-none">Ctrl+K</kbd>
          </button>
        </div>

        {/* Mid: Scroll spy premium menu (Glassmorphic design) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-zinc-100/60 dark:bg-zinc-900/45 border border-zinc-250/30 dark:border-zinc-800/80 rounded-full">
          {MENU_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onScrollToElement(item.id)}
                className={`
                  flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer
                  ${isActive 
                    ? 'bg-white dark:bg-zinc-950 text-blue-500 shadow-sm font-semibold border border-zinc-150 dark:border-zinc-800' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                  }
                `}
              >
                <IconComponent size={13} className={isActive ? 'text-blue-500' : 'text-zinc-400 dark:text-zinc-500'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Notification Bell, Theme Switcher & Dashboard Shortcut status */}
        <div className="flex items-center gap-2.5">
          
          {/* Notification Bell Dropdown Panel */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                playClickSound();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="p-2 w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-650 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all shadow-sm relative cursor-pointer"
              title="View Telegram & Operational Alerts"
            >
              {unreadCount > 0 ? (
                <BellRing size={15} className="text-blue-500 animate-pulse" />
              ) : (
                <Bell size={15} />
              )}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[8px] font-mono font-bold text-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded-2xl shadow-xl z-50 animate-fadeIn p-4 space-y-3.5 text-left border-zinc-200 dark:border-zinc-805">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2.5">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Cpu size={13} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-150 uppercase tracking-wider">Operational Alerts Portal</span>
                  </div>
                  {alerts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[10px] font-mono text-blue-500 hover:text-blue-600 transition cursor-pointer font-bold"
                        title="Mark all as read"
                      >
                        Read All
                      </button>
                      <span className="text-zinc-300">|</span>
                      <button
                        onClick={handleClearAll}
                        className="text-[10px] font-mono text-zinc-400 hover:text-red-500 transition cursor-pointer"
                        title="Clear all alerts"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>

                {/* Alerts List */}
                <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                  {alerts.length === 0 ? (
                    <div className="py-8 text-center space-y-2">
                      <span className="text-lg">🌌</span>
                      <p className="text-xs text-zinc-400 font-mono">No telemetry events surfaced.</p>
                      <button
                        onClick={handleManualTriggerAlert}
                        className="mt-2 px-2.5 py-1 text-[9px] font-mono bg-zinc-100 dark:bg-zinc-900 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500/10 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-650 transition cursor-pointer font-bold"
                      >
                        + Trigger Test Event
                      </button>
                    </div>
                  ) : (
                    alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-xl border transition-all text-xs flex gap-2.5 relative group ${
                          alert.read 
                            ? 'bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-150 dark:border-zinc-900 text-zinc-600' 
                            : 'bg-blue-50/20 dark:bg-blue-950/10 border-blue-100/40 dark:border-blue-900/40 text-blue-950 dark:text-blue-100'
                        }`}
                      >
                        {/* Custom type icon decorations */}
                        <div className="mt-0.5 shrink-0">
                          {alert.type === 'success' && <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><Check size={11} /></div>}
                          {alert.type === 'warning' && <div className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center"><AlertCircle size={11} /></div>}
                          {alert.type === 'star' && <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center"><Star size={11} /></div>}
                          {alert.type === 'info' && <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center"><Terminal size={11} /></div>}
                        </div>

                        {/* Text */}
                        <div className="flex-1 space-y-1 pr-6 text-left">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`font-semibold text-[11px] ${alert.read ? 'text-zinc-700 dark:text-zinc-350' : 'text-zinc-900 dark:text-white font-bold'}`}>
                              {alert.title}
                            </span>
                            {!alert.read && (
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans mt-0.5">
                            {alert.message}
                          </p>
                          <span className="text-[9px] text-zinc-450 dark:text-zinc-550 font-mono block">
                            {alert.timestamp}
                          </span>
                        </div>

                        {/* Actions Overlay */}
                        <div className="absolute right-2 top-2 flex items-center gap-1 opacity-100 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleToggleRead(alert.id, e)}
                            className="p-1 hover:bg-zinc-200/50 dark:hover:bg-zinc-900 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded cursor-pointer"
                            title={alert.read ? "Mark as unread" : "Mark as read"}
                          >
                            {alert.read ? <Check size={10} className="text-zinc-400" /> : <CheckCheck size={10} className="text-blue-500" />}
                          </button>
                          <button
                            onClick={(e) => handleDeleteAlert(alert.id, e)}
                            className="p-1 hover:bg-zinc-200/50 dark:hover:bg-zinc-900 text-zinc-400 hover:text-red-500 rounded cursor-pointer"
                            title="Remove log entry"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer trigger demo */}
                {alerts.length > 0 && (
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-[9px] font-mono">
                    <span className="text-zinc-450 uppercase font-semibold">Auto-Sync Activity Logs</span>
                    <button
                      onClick={handleManualTriggerAlert}
                      className="text-blue-500 hover:text-blue-600 font-bold cursor-pointer"
                    >
                      + Fire Probe Check
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Quick theme toggler */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-650 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-sm cursor-pointer"
            title={theme === 'dark' ? 'Change to light theme' : 'Change to dark theme'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Core Indicator Status */}
          <div className="flex items-center h-9 gap-1.5 font-mono text-[11px] px-3 py-2 border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 rounded-xl shadow-sm text-zinc-500 dark:text-zinc-400 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>PING 14MS</span>
          </div>
        </div>

      </div>

      {/* ---------------- DEEP TELEMETRY DYNAMIC TOASTS PORTAL ---------------- */}
      <div className="fixed bottom-6 right-6 z-[250] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-zinc-950/95 dark:bg-zinc-950/95 border border-zinc-800 text-white p-4 rounded-2xl shadow-2xl flex gap-3 items-start animate-fadeIn text-left w-full select-none"
          >
            {/* Custom state decoration */}
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <div className="w-5.5 h-5.5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center"><Check size={11} /></div>}
              {toast.type === 'warning' && <div className="w-5.5 h-5.5 rounded-full bg-orange-500/15 text-orange-400 flex items-center justify-center"><AlertCircle size={11} /></div>}
              {toast.type === 'star' && <div className="w-5.5 h-5.5 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center"><Star size={11} /></div>}
              {toast.type === 'info' && <div className="w-5.5 h-5.5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center"><Terminal size={11} /></div>}
            </div>

            <div className="flex-1 space-y-1">
              <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-widest font-extrabold">TELEMETRY_ALERT</span>
              <p className="text-xs font-extrabold text-zinc-100">{toast.title}</p>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => {
                playClickSound();
                setToasts(prev => prev.filter(t => t.id !== toast.id));
              }}
              className="p-1 -mr-1 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-white transition cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

    </header>
  );
}

