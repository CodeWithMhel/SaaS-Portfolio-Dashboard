/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardHome from './components/DashboardHome';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import PortfolioSection from './components/PortfolioSection';
import MissionSection from './components/MissionSection';
import CareerSection from './components/CareerSection';
import SettingsPanel from './components/SettingsPanel';
import Footer from './components/Footer';
import AssetModals from './components/AssetModals';
import CommandPalette from './components/CommandPalette';
import BuyMeCoffee from './components/BuyMeCoffee';
import ShortcutsModal from './components/ShortcutsModal';
import ConfettiCanvas from './components/ConfettiCanvas';
import { playHoverSound, playClickSound } from './utils/audioFeedback';
import { LanguageType } from './utils/i18n';

export default function App() {
  // Theme state: default 'dark' for premium tech dashboard design
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // System Language (i18n state persistence on localStorage)
  const [lang, setLang] = useState<LanguageType>(() => {
    return (localStorage.getItem('sys-lang') as LanguageType) || 'en';
  });

  const handleSetLang = (newLang: LanguageType) => {
    setLang(newLang);
    localStorage.setItem('sys-lang', newLang);
  };
  
  // Custom theme accent accent
  const [accent, setAccent] = useState<'blue' | 'green' | 'red'>('blue');
  
  // Navigation panel selector: 'dashboard' is primary headquarters workspace
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  
  // Sidebar collapsible trigger on mobile sizes
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Vault asset modals configurations
  const [modalType, setModalType] = useState<'video' | 'resume' | 'coverLetter' | 'mediaKit' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reading scroll progress percentage state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync theme with DOM document Element classList
  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === 'dark') {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }, [theme]);

  // Monitor document scrolling to calculate the core progress bar fill ratio
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 105; // Slightly overshoot for pristine visual coverage
        setScrollProgress(Math.min(progress, 100));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global browser-delegate event listeners for premium click and hover haptics
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest('button, a, [role="button"], .project-card, .timeline-event, .interactive-badge');
      if (interactiveEl && !interactiveEl.classList.contains('sound-hovered')) {
        interactiveEl.classList.add('sound-hovered');
        playHoverSound();

        const handleMouseLeave = () => {
          interactiveEl.classList.remove('sound-hovered');
          interactiveEl.removeEventListener('mouseleave', handleMouseLeave);
        };
        interactiveEl.addEventListener('mouseleave', handleMouseLeave);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest('button, a, [role="button"], .project-card');
      if (interactiveEl) {
        playClickSound();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleOpenAssetModal = (type: 'video' | 'resume' | 'coverLetter' | 'mediaKit') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseAssetModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  // Smooth scroll handler which supports navbar active spyers and dashboard button redirects
  const handleScrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Setup accent outline color utility mapper
  const getAccentBorderClass = () => {
    if (accent === 'green') return 'border-emerald-500/20 hover:border-emerald-500/40';
    if (accent === 'red') return 'border-rose-500/20 hover:border-rose-500/40';
    return 'border-blue-500/20 hover:border-blue-500/40';
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      
      {/* 1. Global Reading Progress Indicator Bar */}
      <div 
        id="global-reading-progress"
        className="fixed top-0 left-0 h-[3.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 z-[100] transition-all duration-75 ease-out shadow-lg shadow-blue-500/20"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 3. Left permanent SaaS Sidebar (mobile collapsible) */}
      <Sidebar 
        onSelectTab={setActiveTab}
        activeTab={activeTab}
        onOpenAssetModal={handleOpenAssetModal}
        onScrollToElement={handleScrollToElement}
        isMobileOpen={isMobileSidebarOpen}
        onToggleMobile={handleToggleMobileSidebar}
      />

      {/* Main viewport area pushed right on desktop (64 width sidebar offset) */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        
        {/* 2. Top Navigation sticky glass bar */}
        <Navbar 
          onToggleSidebar={handleToggleMobileSidebar}
          onScrollToElement={handleScrollToElement}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        {/* Central Dashboard & Core Sections Container */}
        <main className="flex-1 p-4 md:p-8 space-y-12 max-w-7xl w-full mx-auto">
          
          {activeTab === 'dashboard' ? (
            <>
              {/* 4. Dashboard Headquarters: Welcome, KPI cards, Recharts, Timeline */}
              <DashboardHome 
                onScrollToElement={handleScrollToElement}
                onOpenAssetModal={handleOpenAssetModal}
                theme={theme}
                lang={lang}
              />

              {/* 5. Personal Bio & Journey Core */}
              <AboutSection />

              {/* 6. Vertical Work History Grid */}
              <ExperienceSection />

              {/* 7. Gallery workspace (interactive tabs) */}
              <PortfolioSection lang={lang} />

              {/* 8. Modern Storytelling Mission Statements */}
              <MissionSection />

              {/* 9. Career parameters and downloadable assets */}
              <CareerSection onOpenAssetModal={handleOpenAssetModal} />
            </>
          ) : (
            /* Settings administration panel workspace override */
            <SettingsPanel 
              theme={theme}
              onToggleTheme={handleToggleTheme}
              accentAccent={accent}
              onChangeAccent={setAccent}
              lang={lang}
              onChangeLanguage={handleSetLang}
            />
          )}

          {/* 10. Core Applet Footer (Socials, Contacts, Nav Links) */}
          <Footer onScrollToElement={handleScrollToElement} />

        </main>

      </div>

      {/* Vault overlay modals wrapper */}
      <AssetModals 
        isOpen={isModalOpen}
        onClose={handleCloseAssetModal}
        type={modalType}
      />

      {/* Global Command Search Palette */}
      <CommandPalette 
        onSelectTab={setActiveTab}
        onOpenAssetModal={handleOpenAssetModal}
        onScrollToElement={handleScrollToElement}
        onToggleTheme={handleToggleTheme}
        theme={theme}
      />

      {/* Floating Coffee / Support Handshake Component */}
      <BuyMeCoffee theme={theme} />

      {/* Global Particle Confetti Emitting Layer */}
      <ConfettiCanvas />

      {/* Persistent '?' Keyboard Shortcuts Panel Overlay */}
      <ShortcutsModal theme={theme} />

    </div>
  );
}
