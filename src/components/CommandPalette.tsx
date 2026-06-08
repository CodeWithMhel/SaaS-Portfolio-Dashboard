/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Terminal, 
  User, 
  Briefcase, 
  FolderOpen, 
  Sparkles, 
  Settings, 
  Sun, 
  Moon, 
  Youtube, 
  Linkedin, 
  FileText, 
  Video, 
  Award, 
  ArrowRight, 
  CornerDownLeft, 
  FileCheck,
  Megaphone,
  Layers,
  CircleDot
} from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data';

interface CommandPaletteProps {
  onSelectTab: (tab: 'dashboard' | 'settings') => void;
  onOpenAssetModal: (type: 'video' | 'resume' | 'coverLetter' | 'mediaKit') => void;
  onScrollToElement: (id: string) => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
}

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: 'Workspace' | 'Engineering Projects' | 'Engineering Categories' | 'System Controls & Assets';
  icon: React.ComponentType<{ size: number; className?: string }>;
  handler: () => void;
  badge?: string;
}

export default function CommandPalette({
  onSelectTab,
  onOpenAssetModal,
  onScrollToElement,
  onToggleTheme,
  theme
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor keys for Ctrl+K, Cmd+K, and navigation keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      // Close on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync scroll-lock when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSearch('');
      setSelectedIndex(0);
      // Let dialog render, then focus
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Command handlers
  const handleScrollAndSelect = (elementId: string) => {
    onSelectTab('dashboard');
    setIsOpen(false);
    setTimeout(() => {
      onScrollToElement(elementId);
    }, 100);
  };

  const handleSetCategoryAndScroll = (category: string) => {
    onSelectTab('dashboard');
    setIsOpen(false);
    
    // Dispatch custom event to select portfolio tab automatically
    window.dispatchEvent(new CustomEvent('set-portfolio-tab', { detail: category }));
    
    setTimeout(() => {
      onScrollToElement('portfolio-section');
    }, 150);
  };

  const handleOpenAsset = (type: 'video' | 'resume' | 'coverLetter' | 'mediaKit') => {
    setIsOpen(false);
    setTimeout(() => {
      onOpenAssetModal(type);
    }, 100);
  };

  // Build the complete index of searchable command items
  const commands: CommandItem[] = [
    // ---------------- WORKSPACE NAVIGATION ----------------
    {
      id: 'nav-dashboard',
      title: 'Digital Headquarters Dashboard',
      description: 'Scroll to main operational command stats overview.',
      category: 'Workspace',
      icon: Terminal,
      handler: () => handleScrollAndSelect('dashboard-hero'),
    },
    {
      id: 'nav-about',
      title: 'About Romel / Core Credentials',
      description: 'Learn about Romel\'s software transition pathways and background.',
      category: 'Workspace',
      icon: User,
      handler: () => handleScrollAndSelect('about-section'),
    },
    {
      id: 'nav-experience',
      title: 'Experience Timeline & Logs',
      description: 'View On-the-Job Trainee and lead developer histories.',
      category: 'Workspace',
      icon: Briefcase,
      handler: () => handleScrollAndSelect('experience-section'),
    },
    {
      id: 'nav-portfolio',
      title: 'Engineering Showcase Portfolio',
      description: 'Examine detailed sandbox repositories and deliverables.',
      category: 'Workspace',
      icon: FolderOpen,
      handler: () => handleScrollAndSelect('portfolio-section'),
    },
    {
      id: 'nav-mission',
      title: 'Operational Philosophy / Manifesto',
      description: 'Explore the core mission statements and storytelling panels.',
      category: 'Workspace',
      icon: Sparkles,
      handler: () => handleScrollAndSelect('mission-section'),
    },
    {
      id: 'nav-career',
      title: 'Career & Contact Hub',
      description: 'Send a validated direct email or download licensed products.',
      category: 'Workspace',
      icon: Briefcase,
      handler: () => handleScrollAndSelect('career-section'),
    },
    {
      id: 'nav-settings',
      title: 'Developer Customization Settings',
      description: 'Override custom system accents and fine-tune dashboard options.',
      category: 'Workspace',
      icon: Settings,
      handler: () => {
        onSelectTab('settings');
        setIsOpen(false);
      },
    },

    // ---------------- ENGINEERING PROJECTS ----------------
    ...PROJECTS.map(project => ({
      id: `project-${project.id}`,
      title: project.name,
      description: `${project.description.slice(0, 75)}... [Tech: ${project.techStack.join(', ')}]`,
      category: 'Engineering Projects' as const,
      icon: FolderOpen,
      handler: () => {
        handleSetCategoryAndScroll(project.category);
      },
      badge: project.category
    })),

    // ---------------- LOGICAL PORTFOLIO CATEGORIES ----------------
    {
      id: 'cat-all',
      title: 'Show All Engineering Modules',
      description: 'View all 8 robust shipped modules.',
      category: 'Engineering Categories',
      icon: Layers,
      handler: () => handleSetCategoryAndScroll('All Workspace'),
    },
    {
      id: 'cat-ai',
      title: 'Show AI Projects',
      description: 'Modules powered by automated Google Gemini and LLMs.',
      category: 'Engineering Categories',
      icon: Sparkles,
      handler: () => handleSetCategoryAndScroll('AI Projects'),
      badge: 'AI Projects'
    },
    {
      id: 'cat-web',
      title: 'Show Web Development',
      description: 'Custom React & full-stack core interfaces.',
      category: 'Engineering Categories',
      icon: FolderOpen,
      handler: () => handleSetCategoryAndScroll('Web Development'),
      badge: 'Web Development'
    },
    {
      id: 'cat-auto',
      title: 'Show Automation Systems',
      description: 'Automated notification pipelines and SQL architectures.',
      category: 'Engineering Categories',
      icon: Terminal,
      handler: () => handleSetCategoryAndScroll('Automation Systems'),
      badge: 'Automation Systems'
    },
    {
      id: 'cat-cases',
      title: 'Show Case Studies',
      description: 'In-depth analytical digests of severe engineering blockages solver.',
      category: 'Engineering Categories',
      icon: FileListIcon(), // Return generic standard icon below
      handler: () => handleSetCategoryAndScroll('Case Studies'),
      badge: 'Case Studies'
    },

    // ---------------- ACTIONS & SYSTEM SECURE ASSETS ----------------
    {
      id: 'action-theme',
      title: `Toggle System Theme (Ambient ${theme === 'dark' ? 'Light' : 'Dark'} Mode)`,
      description: `Switch aesthetics to a responsive high-contrast client view.`,
      category: 'System Controls & Assets',
      icon: theme === 'dark' ? Sun : Moon,
      handler: () => {
        onToggleTheme();
        setIsOpen(false);
      }
    },
    {
      id: 'asset-resume',
      title: 'Open Operational CV / Resume',
      description: 'Printable HTML/PDF curriculum credentials overview.',
      category: 'System Controls & Assets',
      icon: FileText,
      handler: () => handleOpenAsset('resume'),
      badge: 'PDF'
    },
    {
      id: 'asset-video',
      title: 'Watch Product Pitch Video',
      description: 'Simulated high-latency interactive pitch loop introducing Romel\'s skills.',
      category: 'System Controls & Assets',
      icon: Video,
      handler: () => handleOpenAsset('video'),
      badge: 'Pitch'
    },
    {
      id: 'asset-coverletter',
      title: 'Read Intent Cover Letter',
      description: 'A structured letter emphasizing Romel\'s core engineering goals.',
      category: 'System Controls & Assets',
      icon: FileCheck,
      handler: () => handleOpenAsset('coverLetter'),
    },
    {
      id: 'asset-mediakit',
      title: 'View Speaker Media Kit',
      description: 'Comprehensive biographical cards and technical panel speaking setups.',
      category: 'System Controls & Assets',
      icon: Megaphone,
      handler: () => handleOpenAsset('mediaKit'),
    },
    {
      id: 'social-linkedin',
      title: 'Navigate to LinkedIn Professional Network',
      description: 'Review Romel\'s endorsements and connect online.',
      category: 'System Controls & Assets',
      icon: Linkedin,
      handler: () => {
        window.open(PERSONAL_INFO.socials.linkedin, '_blank', 'noopener,noreferrer');
        setIsOpen(false);
      }
    },
    {
      id: 'social-youtube',
      title: 'Navigate to YouTube Channel',
      description: 'Watch visual programming and educational developer guidelines.',
      category: 'System Controls & Assets',
      icon: Youtube,
      handler: () => {
        window.open(PERSONAL_INFO.socials.youtube, '_blank', 'noopener,noreferrer');
        setIsOpen(false);
      }
    }
  ];

  // Helper function to return filelist icon safely
  function FileListIcon() {
    return FileText;
  }

  // Filter commands on query matching title or description or category
  const filteredCommands = commands.filter(cmd => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    return cmd.title.toLowerCase().includes(query) || 
           cmd.description.toLowerCase().includes(query) || 
           cmd.category.toLowerCase().includes(query) ||
           (cmd.badge && cmd.badge.toLowerCase().includes(query));
  });

  // Handle keyboard navigation within the results list
  useEffect(() => {
    if (filteredCommands.length === 0) {
      setSelectedIndex(0);
      return;
    }
    // Safeguard index boundaries
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(0);
    }
  }, [search, filteredCommands.length, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].handler();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  if (!isOpen) return null;

  // Group filtered results by their Category
  const categories: { [key: string]: CommandItem[] } = {};
  filteredCommands.forEach(cmd => {
    if (!categories[cmd.category]) {
      categories[cmd.category] = [];
    }
    categories[cmd.category].push(cmd);
  });

  // To map global linear index to categories, we keep a flat array
  const flatFilteredList = filteredCommands;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/70 backdrop-blur-md p-4 pt-[12vh] md:pt-[15vh] select-none animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] shadow-blue-500/5"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-150 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900/40 shrink-0">
          <Search size={18} className="text-zinc-400 dark:text-zinc-500" />
          <input 
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-sm font-sans placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-900 dark:text-white focus:outline-none border-none p-0"
            placeholder="Type a project, section name, or command system shortcut..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="font-mono text-[9px] px-2 py-1 bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300/30 dark:border-zinc-800 rounded text-zinc-500 select-none uppercase tracking-widest leading-none">
            ESC
          </span>
        </div>

        {/* Results Stream Panel */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {flatFilteredList.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 dark:text-zinc-500 animate-fadeIn">
              <Terminal size={24} className="mx-auto mb-2 text-zinc-300 dark:text-zinc-700" />
              <p className="text-xs font-mono">No matching system logs or commands found.</p>
              <p className="text-[10px] text-zinc-550 dark:text-zinc-650 mt-1">Try searching "steel", "pdf", "dashboard", or "about"</p>
            </div>
          ) : (
            Object.keys(categories).map((catName) => (
              <div key={catName} className="space-y-1">
                {/* Category Header Label */}
                <h4 className="px-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                  {catName}
                </h4>

                <div className="space-y-0.5">
                  {categories[catName].map((cmd) => {
                    // Find actual flat list index for accurate selection state rendering
                    const listIndex = flatFilteredList.findIndex(item => item.id === cmd.id);
                    const isSelected = listIndex === selectedIndex;
                    const IconComponent = cmd.icon;

                    return (
                      <div
                        key={cmd.id}
                        onClick={() => cmd.handler()}
                        className={`
                          w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left cursor-pointer transition-all duration-150 group
                          ${isSelected 
                            ? 'bg-blue-500 text-white shadow-md shadow-blue-505/10' 
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-4">
                          <div className={`
                            p-1.5 rounded-lg shrink-0 transition-colors
                            ${isSelected 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800'
                            }
                          `}>
                            <IconComponent size={14} />
                          </div>
                          <div className="min-w-0">
                            <span className={`
                              font-sans text-xs font-semibold block leading-tight
                              ${isSelected ? 'text-white' : 'text-zinc-900 dark:text-white'}
                            `}>
                              {cmd.title}
                            </span>
                            <span className={`
                              font-mono text-[9.5px] leading-relaxed block truncate mt-0.5
                              ${isSelected ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-450'}
                            `}>
                              {cmd.description}
                            </span>
                          </div>
                        </div>

                        {/* Action hints and badges */}
                        <div className="flex items-center gap-2 shrink-0">
                          {cmd.badge && (
                            <span className={`
                              font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-medium leading-none tracking-wider
                              ${isSelected 
                                ? 'bg-blue-600/60 text-blue-100 border border-blue-400/20' 
                                : 'bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500'
                              }
                            `}>
                              {cmd.badge}
                            </span>
                          )}

                          {isSelected ? (
                            <div className="flex items-center gap-1 font-mono text-[9px] text-blue-100 animate-pulse">
                              <span>ENTER</span>
                              <CornerDownLeft size={8} />
                            </div>
                          ) : (
                            <ArrowRight size={10} className="text-zinc-350 dark:text-zinc-650 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Global Keyboard Navigation Guides Footer */}
        <div className="px-5 py-3 border-t border-zinc-150 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between text-[10px] font-mono text-zinc-400 dark:text-zinc-550 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-900 rounded font-bold border border-zinc-350/40 dark:border-zinc-800">↑↓</span>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-900 rounded font-bold border border-zinc-350/40 dark:border-zinc-800">↵</span>
              <span>to select</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-900 rounded font-bold border border-zinc-350/40 dark:border-zinc-800">esc</span>
              <span>to leave</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <span>SYSTEM_PALETTE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
