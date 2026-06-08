/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Share2, 
  Award, 
  FileCode, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  Youtube, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Smartphone,
  Bookmark,
  Calendar,
  Mic,
  Trophy,
  FileText,
  Video,
  FileCheck,
  Megaphone,
  Fingerprint
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface SidebarProps {
  onSelectTab: (tab: 'dashboard' | 'settings') => void;
  activeTab: 'dashboard' | 'settings';
  onOpenAssetModal: (type: 'video' | 'resume' | 'coverLetter' | 'mediaKit') => void;
  onScrollToElement: (id: string) => void;
  isMobileOpen: boolean;
  onToggleMobile: () => void;
}

export default function Sidebar({ 
  onSelectTab, 
  activeTab, 
  onOpenAssetModal, 
  onScrollToElement,
  isMobileOpen,
  onToggleMobile
}: SidebarProps) {
  // Dropdown States
  const [socialOpen, setSocialOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [digitalAssetsOpen, setDigitalAssetsOpen] = useState(false);

  const handleDropdownClick = (type: 'social' | 'achievements' | 'assets') => {
    if (type === 'social') setSocialOpen(!socialOpen);
    if (type === 'achievements') setAchievementsOpen(!achievementsOpen);
    if (type === 'assets') setDigitalAssetsOpen(!digitalAssetsOpen);
  };

  return (
    <aside 
      id="saas-sidebar"
      className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between transition-transform duration-300 md:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Top Section / Brand */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        
        {/* Brand identity */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
          <div 
            onClick={() => { onSelectTab('dashboard'); onScrollToElement('dashboard-hero'); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white ring-2 ring-blue-500/10 group-hover:scale-105 transition-transform">
              <Fingerprint size={18} />
            </div>
            <div>
              <span className="font-sans font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 block">
                STERLING_HQ
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block uppercase tracking-widest">
                SYS v4.14-ACTIVE
              </span>
            </div>
          </div>
          {/* Close button for Mobile screen */}
          <button 
            id="close-sidebar-btn"
            onClick={onToggleMobile}
            className="md:hidden p-1.5 border border-zinc-200 dark:border-zinc-850 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
          >
            <span className="font-mono text-xs">CLOSE</span>
          </button>
        </div>

        {/* Navigation Items list */}
        <div className="px-3 py-6 space-y-1">
          <span className="px-3 font-mono text-[10px] uppercase font-semibold text-zinc-400 dark:text-zinc-650 tracking-wider block mb-2">
            Workspace Panels
          </span>

          {/* Dashboard Home tab */}
          <button
            id="sidebar-tab-dashboard"
            onClick={() => { onSelectTab('dashboard'); onScrollToElement('dashboard-hero'); if(isMobileOpen) onToggleMobile(); }}
            className={`
              w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium font-sans transition-all duration-150 cursor-pointer text-left
              ${activeTab === 'dashboard'
                ? 'bg-zinc-200/60 dark:bg-zinc-900 text-zinc-900 dark:text-white border-l-2 border-blue-500 pl-2.5' 
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200 border-l-2 border-transparent'
              }
            `}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard size={15.5} className={activeTab === 'dashboard' ? 'text-blue-500' : ''} />
              <span>Digital Headquarters</span>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-500 px-1.5 py-0.5 bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300/30 dark:border-zinc-800/80 rounded">
              ⌘D
            </span>
          </button>

          {/* Social Drops */}
          <div className="space-y-1">
            <button
              id="sidebar-social-dropdown-trigger"
              onClick={() => handleDropdownClick('social')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:text-zinc-950 dark:hover:text-zinc-200 font-sans font-medium transition cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Share2 size={15.5} className="text-zinc-550 dark:text-zinc-450" />
                <span>Connected Channels</span>
              </div>
              {socialOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            
            {socialOpen && (
              <div className="pl-6 space-y-0.5 animate-fadeIn">
                <a 
                  href={PERSONAL_INFO.socials.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 font-sans transition-colors rounded-md"
                >
                  <Youtube size={13} /> YouTube Channel
                </a>
                <a 
                  href={PERSONAL_INFO.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 font-sans transition-colors rounded-md"
                >
                  <Linkedin size={13} /> LinkedIn Network
                </a>
                <a 
                  href={PERSONAL_INFO.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-450 font-sans transition-colors rounded-md"
                >
                  <Facebook size={13} /> Facebook Profile
                </a>
                <a 
                  href={PERSONAL_INFO.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-pink-500 dark:hover:text-pink-400 font-sans transition-colors rounded-md"
                >
                  <Instagram size={13} /> Instagram Feed
                </a>
                <a 
                  href={PERSONAL_INFO.socials.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-sans transition-colors rounded-md"
                >
                  <Smartphone size={13} /> TikTok Stream
                </a>
              </div>
            )}
          </div>

          {/* Achievements Drop */}
          <div className="space-y-1">
            <button
              id="sidebar-achievements-dropdown-trigger"
              onClick={() => handleDropdownClick('achievements')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:text-zinc-950 dark:hover:text-zinc-200 font-sans font-medium transition cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Award size={15.5} className="text-zinc-550 dark:text-zinc-450" />
                <span>Achievements Log</span>
              </div>
              {achievementsOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            
            {achievementsOpen && (
              <div className="pl-6 space-y-0.5 animate-[fadeIn_0.2s_ease-out]">
                <button 
                  onClick={() => { onSelectTab('dashboard'); onScrollToElement('career-section'); if(isMobileOpen) onToggleMobile(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 font-sans text-left transition"
                >
                  <FileCheck size={13} /> Certifications
                </button>
                <button 
                  onClick={() => { onSelectTab('dashboard'); onScrollToElement('about-section'); if(isMobileOpen) onToggleMobile(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 font-sans text-left transition"
                >
                  <Trophy size={13} /> Industry Awards
                </button>
                <button 
                  onClick={() => { onSelectTab('dashboard'); onScrollToElement('dashboard-timeline'); if(isMobileOpen) onToggleMobile(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 font-sans text-left transition"
                >
                  <Bookmark size={13} /> Major Milestones
                </button>
                <button 
                  onClick={() => { onSelectTab('dashboard'); onScrollToElement('career-section'); if(isMobileOpen) onToggleMobile(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 font-sans text-left transition"
                >
                  <Mic size={13} /> Public Speaking
                </button>
              </div>
            )}
          </div>

          {/* Digital Assets Drop */}
          <div className="space-y-1">
            <button
              id="sidebar-assets-dropdown-trigger"
              onClick={() => handleDropdownClick('assets')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:text-zinc-950 dark:hover:text-zinc-200 font-sans font-medium transition cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <FileCode size={15.5} className="text-zinc-550 dark:text-zinc-450" />
                <span>Vault Assets</span>
              </div>
              {digitalAssetsOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            
            {digitalAssetsOpen && (
              <div className="pl-6 space-y-0.5 animate-fadeIn">
                <button 
                  onClick={() => { onOpenAssetModal('resume'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 font-sans text-left transition"
                >
                  <FileText size={13} /> Operational CV (PDF)
                </button>
                <button 
                  onClick={() => { onOpenAssetModal('video'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 font-sans text-left transition"
                >
                  <Video size={13} /> Intro Pitch Video
                </button>
                <button 
                  onClick={() => { onOpenAssetModal('coverLetter'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 font-sans text-left transition"
                >
                  <FileCheck size={13} /> Intent Cover Letter
                </button>
                <button 
                  onClick={() => { onOpenAssetModal('mediaKit'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 font-sans text-left transition"
                >
                  <Megaphone size={13} /> Speaker Media Kit
                </button>
              </div>
            )}
          </div>

          {/* Settings Tab */}
          <button
            id="sidebar-tab-settings"
            onClick={() => { onSelectTab('settings'); if(isMobileOpen) onToggleMobile(); }}
            className={`
              w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium font-sans transition-all duration-150 cursor-pointer text-left
              ${activeTab === 'settings'
                ? 'bg-zinc-200/60 dark:bg-zinc-900 text-zinc-900 dark:text-white border-l-2 border-blue-500 pl-2.5' 
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200 border-l-2 border-transparent'
              }
            `}
          >
            <div className="flex items-center gap-2.5">
              <Settings size={15.5} className={activeTab === 'settings' ? 'text-blue-500' : ''} />
              <span>Developer Settings</span>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-500 px-1.5 py-0.5 bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300/30 dark:border-zinc-800/80 rounded">
              ⌘S
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-100/50 dark:bg-zinc-900/20">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-850 p-0.5 shrink-0">
            <img 
              src={PERSONAL_INFO.avatar} 
              alt={PERSONAL_INFO.name} 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-950"></div>
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-sans font-semibold text-xs text-zinc-805 dark:text-zinc-100 block truncate">
              {PERSONAL_INFO.name}
            </span>
            <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 block uppercase tracking-wider truncate">
              AI_DEV / OWNER
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
