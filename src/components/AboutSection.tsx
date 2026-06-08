/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Cpu, Sparkles, BookOpen, Layers, Star, Compass, ArrowUpRight } from 'lucide-react';
import { SKILLS } from '../data';

// Highly-configured dictionary linking operational skills with descriptions & demonstration projects
const SKILL_DETAILS: Record<string, { description: string, project?: { name: string, id: string, tab: string } }> = {
  "React (Hooks, Setup, Router)": {
    description: "Built complex custom hook state machines for industrial feedback simulators.",
    project: { name: "Steel Rolling Mill Simulator", id: "project-1", tab: "AI Projects" }
  },
  "TypeScript & State Engines": {
    description: "Engineered strict custom types and robust state routers to avoid browser race conditions.",
    project: { name: "DevLogix Command Center", id: "project-2", tab: "Web Development" }
  },
  "Tailwind CSS & Glassmorphism": {
    description: "Designed stunning high-contrast panels with custom backing overlays and seamless modern gradients.",
    project: { name: "DevLogix Command Center", id: "project-2", tab: "Web Development" }
  },
  "HTML5 / CSS3 Grid Layouts": {
    description: "Drafted high-converting fluid layouts and grid bento systems featuring absolute desktop precision.",
    project: { name: "ArchitectAI: 3D House Designer", id: "project-4", tab: "Web Development" }
  },
  "Node.js & Express Servers": {
    description: "Constructed low-latency custom route servers with API middleware routes and secure payload processors.",
    project: { name: "Dental Management & Patient Portal", id: "project-3", tab: "AI Projects" }
  },
  "Python Scripting & Logics": {
    description: "Developed automated terminal solvers and background validation threads for logical schema matching.",
    project: { name: "Bible Trivia Challenge", id: "project-5", tab: "AI Projects" }
  },
  "PHP Base Rendering": {
    description: "Authored secure server-side templates with session caches and form request handlers for promotional systems.",
    project: { name: "Lead Funnel & Relational CRM", id: "project-7", tab: "Automation Systems" }
  },
  "RDBMS Database Layouts (SQL)": {
    description: "Modeled normalized database structures and transactional query pipelines storing active entries.",
    project: { name: "Lead Funnel & Relational CRM", id: "project-7", tab: "Automation Systems" }
  },
  "Logic Formulation": {
    description: "Formulated rigorous algorithmic check gates for heating, QA check pipelines, and math formulas.",
    project: { name: "Steel Rolling Mill Simulator", id: "project-1", tab: "AI Projects" }
  },
  "Gemini Chatbot Integrations": {
    description: "Integrated @google/genai SDK to analyze metallurgical files and answer dental clinic policies 24/7.",
    project: { name: "Dental Management & Patient Portal", id: "project-3", tab: "AI Projects" }
  },
  "API Architectures (Resend, Maps)": {
    description: "Configured secure third-party server endpoints with token authorization and direct transaction webhooks.",
    project: { name: "Dental Management & Patient Portal", id: "project-3", tab: "AI Projects" }
  },
  "AI-Powered Shopping Setup": {
    description: "Designed comparative matrices and automated coupon resolution checking frameworks for digital collectibles.",
    project: { name: "DevLogix E-commerce - Collectibles", id: "project-6", tab: "Web Development" }
  },
  "Git / GitHub & Security": {
    description: "Maintained package security integrity, resolved locks, and audited branch conflicts.",
    project: { name: "Case Study: Packages & Dependency Triage", id: "project-8", tab: "Case Studies" }
  },
  "Network Config & SysOps": {
    description: "Analyzed local office subnet parameters and automated network hygiene troubleshooting guides.",
    project: { name: "Associate Degree / Teksquad", id: "event-1", tab: "All Workspace" }
  },
  "Canva Prototyping & Layout": {
    description: "Prototyped full-fidelity mockups of user flows and promotional graphical banners before deployment.",
    project: { name: "Lead Funnel & Relational CRM", id: "project-7", tab: "Automation Systems" }
  },
  "Lead Generation & SEO": {
    description: "Developed semantic content outlines and meta tag structures yielding superior organic crawl ratios.",
    project: { name: "Lead Funnel & Relational CRM", id: "project-7", tab: "Automation Systems" }
  }
};

export default function AboutSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const skillCategories = ['All', 'AI & Machine Learning', 'Frontend', 'Backend & System', 'Tools & Workflows'];
  
  const filteredSkills = selectedCategory === 'All' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === selectedCategory);

  const handleProjectLinkClick = (projectId: string, tab: string) => {
    // Select the appropriate portfolio tab
    window.dispatchEvent(new CustomEvent('set-portfolio-tab', { detail: { tab, projectId } }));
    
    // Smoothly scroll down
    const section = document.getElementById('portfolio-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="about-section" 
      className="p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/10 space-y-12"
    >
      {/* Title */}
      <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <User size={20} className="text-blue-500" />
          Intellectual Core: Personal Story & Expertise
        </h2>
        <p className="text-xs text-zinc-550 dark:text-zinc-500">
          Professional bio-history, operational philosophies, and detailed technical skills directory.
        </p>
      </div>

      {/* Grid: Personal Bio & AI Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Story */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono tracking-widest text-zinc-400 dark:text-zinc-550 uppercase font-semibold">
            ● 01 // Biography
          </h3>
          <h4 className="text-lg font-bold text-zinc-805 dark:text-zinc-100">
            A Builder Engaged in Shifting Paradigms
          </h4>
          <div className="text-xs text-zinc-650 dark:text-zinc-400 space-y-4 leading-relaxed font-sans">
            <p>
              My journey as a software developer didn't start with models; it started with a profound obsession with elegant interfaces. Watching users interact with complex software taught me that a feature is only as valuable as its mental friction is low. 
            </p>
            <p>
              When LLM intelligence emerged, I recognized a unique opportunity. By binding natural-language reasoning with rigorous, responsive frontend dashboards, we can create interfaces that feel completely intuitive—websites and utilities that adapt to the human, rather than forcing the human to write code.
            </p>
            <p>
              Under my agency, <strong>Automations Incubator</strong>, I build workflows, coordinate multi-agent nodes, and secure database schemas for rapid full-stack operations. Grounded in my Software Engineering degree from UC Berkeley, I build systems that scale cleanly, perform fast, and look stunning.
            </p>
          </div>
        </div>

        {/* AI Philosophy & Timeline Card */}
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-850 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-mono tracking-widest text-zinc-400 dark:text-zinc-550 uppercase font-semibold">
              ● 02 // Generative Core
            </h3>
            <h4 className="text-base font-bold text-zinc-850 dark:text-zinc-100 flex items-center gap-2">
              <Cpu size={16} className="text-blue-500" /> My AI Journey Timelog
            </h4>
            
            <div className="space-y-4 text-xs font-sans">
              <div className="flex gap-3">
                <span className="font-mono text-[10px] text-blue-500 font-bold shrink-0 mt-0.5">2023</span>
                <div>
                  <h5 className="font-semibold text-zinc-800 dark:text-zinc-200">System Exploration</h5>
                  <p className="text-zinc-500 dark:text-zinc-450 mt-0.5">Integrated early OpenAPI embeddings for semantic workspace queries.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[10px] text-blue-500 font-bold shrink-0 mt-0.5">2024</span>
                <div>
                  <h5 className="font-semibold text-zinc-800 dark:text-zinc-200">The Autonomous Leap</h5>
                  <p className="text-zinc-500 dark:text-zinc-450 mt-0.5">Shipped first custom agent loops in python utilizing memory vector recall grids.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[10px] text-blue-500 font-bold shrink-0 mt-0.5">2025</span>
                <div>
                  <h5 className="font-semibold text-zinc-800 dark:text-zinc-200">Enterprise Orchestrators</h5>
                  <p className="text-zinc-505 dark:text-zinc-450 mt-0.5">Deployed custom routers managing high volume serverless API spend safely.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-850 rounded-lg flex items-center gap-2.5 font-mono text-[10px] text-zinc-500 select-none">
            <Compass size={14} className="text-blue-500 animate-spin-slow" />
            <span>AI ENGINE CURRENT STATE:</span>
            <span className="text-emerald-500 font-bold animate-pulse">OPTIMIZED (99.4% ACC)</span>
          </div>
        </div>

      </div>

      {/* Interactive Skills Matrix Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-zinc-150 dark:border-zinc-800/80 pt-6 gap-4">
          <div className="space-y-0.5">
            <h4 className="font-bold text-sm text-zinc-850 dark:text-zinc-100 flex items-center gap-2">
              <Layers size={14} strokeWidth={2.5} className="text-blue-500" />
              Technical Competence Map
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-450">
              Evaluated using active operational hours, commits, and production shipping logs.
            </p>
          </div>

          {/* Filtering Categories slider */}
          <div className="flex flex-wrap gap-1 p-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            {skillCategories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-2.5 py-1 text-[10px] font-medium rounded-md transition-all cursor-pointer
                  ${selectedCategory === cat 
                    ? 'bg-white dark:bg-zinc-950 text-blue-500 shadow-sm font-semibold' 
                    : 'text-zinc-600 dark:text-zinc-450 hover:text-zinc-950 dark:hover:text-zinc-250'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Competence meters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {filteredSkills.map((skill, i) => {
            const details = SKILL_DETAILS[skill.name];
            const isHovered = hoveredSkill === skill.name;

            return (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onFocus={() => setHoveredSkill(skill.name)}
                onBlur={() => setHoveredSkill(null)}
                tabIndex={0}
                className="relative p-4 border border-zinc-200/50 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-xl space-y-2.5 hover:border-blue-500/20 transition-all duration-200 group cursor-help select-none focus:outline-none focus:ring-1 focus:ring-blue-500/40"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-sans font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded font-bold">
                    {skill.level}%
                  </span>
                </div>
                
                {/* Animated Progress Meter */}
                <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-zinc-400 block">
                  {skill.category}
                </span>

                {/* ---------------- HOVER TOOLTIP CARD ---------------- */}
                {isHovered && details && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-64 p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl dark:shadow-zinc-950/80 space-y-2.5 z-40 pointer-events-auto animate-fadeIn text-left border-zinc-200 dark:border-zinc-800">
                    <p className="text-[10px] font-mono leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {details.description}
                    </p>
                    
                    {details.project && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectLinkClick(details.project!.id, details.project!.tab);
                        }}
                        className="w-full flex items-center justify-between gap-1 mt-1 pt-1.5 border-t border-zinc-100 dark:border-zinc-900/60 font-mono text-[9px] text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-bold transition-all cursor-pointer group/link"
                      >
                        <span className="truncate">DEMO: {details.project.name}</span>
                        <ArrowUpRight size={10} className="shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </button>
                    )}

                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white dark:border-t-zinc-950 z-41" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-200 dark:border-t-zinc-800 z-40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
