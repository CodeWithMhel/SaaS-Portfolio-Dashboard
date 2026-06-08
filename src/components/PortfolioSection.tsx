/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Filter, 
  Code, 
  Share2, 
  Copy, 
  Check, 
  X,
  Server,
  Layers,
  Cpu
} from 'lucide-react';
import { PROJECTS } from '../data';
import { TRANSLATIONS, LanguageType } from '../utils/i18n';

const TABS = [
  'All Workspace',
  'AI Projects',
  'Web Development',
  'Automation Systems',
  'Case Studies'
] as const;

interface PortfolioSectionProps {
  lang?: LanguageType;
}

export default function PortfolioSection({ lang = 'en' }: PortfolioSectionProps) {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('All Workspace');
  const [selectedTag, setSelectedTag] = useState<'All' | 'AI' | 'Full Stack' | 'Frontend' | 'Systems'>('All');
  const [sharingProject, setSharingProject] = useState<any | null>(null);
  const [copiedType, setCopiedType] = useState<'linkedin' | 'twitter' | 'email' | null>(null);

  const dict = TRANSLATIONS[lang];

  useEffect(() => {
    const handleSetTab = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      const data = customEvent.detail;
      
      let tabToSet = '';
      let projectToHighlight = '';
      
      if (typeof data === 'string') {
        tabToSet = data;
      } else if (data && typeof data === 'object') {
        tabToSet = data.tab;
        projectToHighlight = data.projectId;
      }

      if (tabToSet && TABS.includes(tabToSet as any)) {
        setActiveTab(tabToSet as any);
      }

      if (projectToHighlight) {
        setTimeout(() => {
          const card = document.getElementById(projectToHighlight);
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add prominent class highlight
            card.classList.add('ring-2', 'ring-blue-500', 'scale-[1.02]', 'shadow-2xl', 'dark:shadow-blue-550/20');
            setTimeout(() => {
              card.classList.remove('ring-2', 'ring-blue-500', 'scale-[1.02]', 'shadow-2xl', 'dark:shadow-blue-550/20');
            }, 2500);
          }
        }, 300);
      }
    };
    window.addEventListener('set-portfolio-tab', handleSetTab);
    return () => window.removeEventListener('set-portfolio-tab', handleSetTab);
  }, []);

  // Run double filtering: first by Category Tab, then by interactive custom Tag filters
  const categoryFiltered = activeTab === 'All Workspace' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === activeTab);

  const finalFilteredProjects = categoryFiltered.filter(project => {
    if (selectedTag === 'All') return true;
    
    const stackLower = project.techStack.map(s => s.toLowerCase());
    const descLower = project.description.toLowerCase();
    
    if (selectedTag === 'AI') {
      return project.category === 'AI Projects' || stackLower.some(s => s.includes('gemini') || s.includes('ai') || s.includes('intelligence'));
    }
    
    if (selectedTag === 'Full Stack') {
      return stackLower.some(s => s.includes('node') || s.includes('express') || s.includes('firebase') || s.includes('php') || s.includes('sql') || s.includes('server'));
    }
    
    if (selectedTag === 'Frontend') {
      return stackLower.some(s => s.includes('react') || s.includes('tailwind') || s.includes('three') || s.includes('motion') || s.includes('css'));
    }
    
    if (selectedTag === 'Systems') {
      return stackLower.some(s => s.includes('express') || s.includes('firebase') || s.includes('rest') || s.includes('auth')) || descLower.includes('infrastructure') || descLower.includes('subnet');
    }
    
    return true;
  });

  // Share template generator
  const getShareTemplate = (type: 'linkedin' | 'twitter' | 'email') => {
    if (!sharingProject) return '';
    const shareUrl = sharingProject.liveLink || 'https://romelmontiagodo.dev';
    const techStr = sharingProject.techStack.slice(0, 3).join(', ');
    
    if (type === 'linkedin') {
      return `🚀 Impressed by this engineering project built by Romel B. Montiagodo: "${sharingProject.name}"!\n\nIt features state-of-the-art implementation using ${techStr}. Romel is an incredibly versatile full-stack software engineer based in Antipolo, PH.\n\nCheck out the deployment here: ${shareUrl}\n\n#FullStack #SoftwareEngineering #DeveloperPortfolio`;
    }
    if (type === 'twitter') {
      return `Just inspected "${sharingProject.name}" by Romel Montiagodo! Powered by ${techStr}. Super clean UX, check it out here: ${shareUrl} 💻📈 #Web3 #AI #100DaysOfCode @google_ai`;
    }
    return `Subject: Shipped Project Showcase: ${sharingProject.name}\n\nHello, check out Romel B. Montiagodo's production-ready project: "${sharingProject.name}" built with ${sharingProject.techStack.join(', ')}.\n\nDescription: ${sharingProject.description}\n\nLive Sandbox: ${shareUrl}`;
  };

  const handleCopyShare = (type: 'linkedin' | 'twitter' | 'email') => {
    const text = getShareTemplate(type);
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section 
      id="portfolio-section"
      className="p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/10 space-y-8 select-none relative"
    >
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <FolderGit2 size={20} className="text-blue-500" />
            {dict.portfolio_title}
          </h2>
          <p className="text-xs text-zinc-550 dark:text-zinc-500">
            {dict.portfolio_subtitle}
          </p>
        </div>

        {/* Filter Indicator count */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-850 rounded-lg text-zinc-500 select-none shrink-0 shadow-sm">
          <Filter size={10} className="text-blue-500" />
          <span>{lang === 'fil' ? 'IPINAPAKITA' : 'SHOWING'}:</span>
          <span className="text-blue-500 font-bold">{finalFilteredProjects.length} {lang === 'fil' ? 'MODULE' : 'MODULES'}</span>
        </div>
      </div>

      {/* Primary Categories Tabs */}
      <div className="flex overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 gap-4">
        <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl space-x-1 shrink-0">
          {TABS.map((tab) => {
            let label = tab === 'All Workspace' ? dict.cat_all : tab;
            if (lang === 'fil') {
              if (tab === 'AI Projects') label = dict.cat_ai;
              if (tab === 'Web Development') label = dict.cat_web;
              if (tab === 'Automation Systems') label = dict.cat_auto;
              if (tab === 'Case Studies') label = dict.cat_cases;
            }
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedTag('All'); // Reset tag deep-filter on tab change
                }}
                className={`
                  px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer shrink-0
                  ${activeTab === tab
                    ? 'bg-white dark:bg-zinc-950 text-blue-500 shadow-sm border border-zinc-200/60 dark:border-zinc-800' 
                    : 'text-zinc-600 dark:text-zinc-450 hover:text-zinc-950 dark:hover:text-zinc-200'
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Sub-Tag Toggles (without full-page refresh) */}
      <div className="space-y-2.5 bg-zinc-50/50 dark:bg-zinc-900/10 p-4 border border-zinc-200/60 dark:border-zinc-850 rounded-2xl">
        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-550 block uppercase">
          {dict.filter_tags}
        </span>
        <div className="flex flex-wrap gap-2">
          {(['All', 'AI', 'Full Stack', 'Frontend', 'Systems'] as const).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border flex items-center gap-1.5
                ${selectedTag === tag
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-500 font-bold'
                  : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-850 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }
              `}
            >
              {tag === 'All' && <Layers size={11} />}
              {tag === 'AI' && <Cpu size={11} />}
              {tag === 'Full Stack' && <Server size={11} />}
              {tag === 'Frontend' && <Code size={11} />}
              {tag === 'Systems' && <Filter size={11} />}
              <span>{tag === 'All' ? 'All Tags' : tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finalFilteredProjects.map((project) => (
          <div 
            key={project.id}
            id={project.id}
            className="flex flex-col bg-white dark:bg-zinc-900/20 border border-zinc-200/70 dark:border-zinc-850 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-zinc-950/60 hover:-translate-y-1 transition duration-200 group"
          >
            {/* Project Image */}
            <div className="relative h-48 bg-zinc-100 dark:bg-zinc-950 overflow-hidden shrink-0 border-b border-zinc-150 dark:border-zinc-900">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded font-mono text-[9px] uppercase font-bold text-blue-400 border border-zinc-800">
                {lang === 'fil' && project.category === 'AI Projects' ? dict.cat_ai : (lang === 'fil' && project.category === 'Web Development' ? dict.cat_web : project.category)}
              </div>
              {project.featured && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-blue-500/90 text-white rounded font-mono text-[9px] uppercase font-bold flex items-center gap-1 shadow">
                  <Sparkles size={8} /> {lang === 'fil' ? 'TAMPOK' : 'FEATURED'}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed line-clamp-3 font-sans">
                  {project.description}
                </p>
              </div>

              {/* Stack & Links */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9.5px] font-mono px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-455 border border-zinc-200/50 dark:border-zinc-800 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-900">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-center font-mono text-[10px] font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{lang === 'fil' ? 'Subukan ang Demo' : 'Live Demo Link'}</span> <ExternalLink size={10} />
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 rounded-lg text-zinc-650 dark:text-zinc-450 hover:text-blue-500 dark:hover:text-blue-400 transition cursor-pointer"
                      title="View GitHub Source Repository"
                    >
                      <Github size={13} />
                    </a>
                  )}

                  {/* Share button on project card */}
                  <button
                    onClick={() => setSharingProject(project)}
                    className="p-1.5 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 rounded-lg text-zinc-650 dark:text-zinc-450 hover:text-blue-500 dark:hover:text-blue-400 transition cursor-pointer"
                    title={dict.share_btn}
                  >
                    <Share2 size={13} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ---------------- SHARE PREGEN OVERLAY MODAL ---------------- */}
      {sharingProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-900 pb-3">
              <div className="flex items-center gap-2">
                <Share2 size={16} className="text-blue-500" />
                <h3 className="font-bold text-sm text-zinc-950 dark:text-white">
                  {dict.share_templates}
                </h3>
              </div>
              <button 
                onClick={() => setSharingProject(null)}
                className="p-1.5 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Sub-details */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-850 rounded-xl text-xs font-mono">
              <span className="text-[10px] text-zinc-400 block tracking-widest font-bold">SHARING_MODULE</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-bold block">{sharingProject.name}</span>
            </div>

            {/* Templates Copy-Ready Blocks */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              
              {/* 1. LinkedIn */}
              <div className="space-y-2 border border-zinc-150 dark:border-zinc-900 p-3.5 rounded-xl">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span className="font-bold text-blue-500">LINKEDIN POST TEMPLATE</span>
                  <button
                    onClick={() => handleCopyShare('linkedin')}
                    className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 px-1.5 rounded text-zinc-650 dark:text-zinc-350 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition cursor-pointer font-bold"
                  >
                    {copiedType === 'linkedin' ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                    <span>{copiedType === 'linkedin' ? dict.copy_success : dict.copy_clipboard}</span>
                  </button>
                </div>
                <p className="text-[10.5px] text-zinc-650 dark:text-zinc-350 bg-zinc-50 dark:bg-zinc-900/10 p-2.5 rounded font-mono leading-relaxed max-h-[100px] overflow-y-auto whitespace-pre-wrap">
                  {getShareTemplate('linkedin')}
                </p>
              </div>

              {/* 2. Twitter / X */}
              <div className="space-y-2 border border-zinc-150 dark:border-zinc-900 p-3.5 rounded-xl">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span className="font-bold text-sky-500">TWITTER / X PRE-GENERATED PRESSET</span>
                  <button
                    onClick={() => handleCopyShare('twitter')}
                    className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 px-1.5 rounded text-zinc-650 dark:text-zinc-350 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition cursor-pointer font-bold"
                  >
                    {copiedType === 'twitter' ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                    <span>{copiedType === 'twitter' ? dict.copy_success : dict.copy_clipboard}</span>
                  </button>
                </div>
                <p className="text-[10.5px] text-zinc-650 dark:text-zinc-350 bg-zinc-50 dark:bg-zinc-900/10 p-2.5 rounded font-mono leading-relaxed max-h-[100px] overflow-y-auto whitespace-pre-wrap">
                  {getShareTemplate('twitter')}
                </p>
              </div>

              {/* 3. Email Template */}
              <div className="space-y-2 border border-zinc-150 dark:border-zinc-900 p-3.5 rounded-xl">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span className="font-bold text-emerald-500">DIRECT EMAIL TRANSMISSION</span>
                  <button
                    onClick={() => handleCopyShare('email')}
                    className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 px-1.5 rounded text-zinc-650 dark:text-zinc-350 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition cursor-pointer font-bold"
                  >
                    {copiedType === 'email' ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                    <span>{copiedType === 'email' ? dict.copy_success : dict.copy_clipboard}</span>
                  </button>
                </div>
                <p className="text-[10.5px] text-zinc-650 dark:text-zinc-350 bg-zinc-50 dark:bg-zinc-900/10 p-2.5 rounded font-mono leading-relaxed max-h-[100px] overflow-y-auto whitespace-pre-wrap">
                  {getShareTemplate('email')}
                </p>
              </div>

            </div>

            {/* Quick action buttons block */}
            <div className="flex gap-2.5 justify-end pt-3 border-t border-zinc-100 dark:border-zinc-900">
              <button
                onClick={() => setSharingProject(null)}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-350 text-xs font-mono rounded-xl font-bold transition cursor-pointer"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
