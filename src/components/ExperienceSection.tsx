/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Briefcase, ArrowUpRight, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { EXPERIENCE_HISTORY } from '../data';

export default function ExperienceSection() {
  return (
    <section 
      id="experience-section"
      className="p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/10 space-y-10"
    >
      {/* Title */}
      <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Briefcase size={20} className="text-blue-500" />
          Operational Ledger: Professional Timeline
        </h2>
        <p className="text-xs text-zinc-550 dark:text-zinc-500">
          Professional timeline representing technical leading coordinates, key deliverables, and organizational achievements.
        </p>
      </div>

      {/* Timeline core columns */}
      <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-6 space-y-12 py-3">
        {EXPERIENCE_HISTORY.map((exp) => (
          <div key={exp.id} className="relative pl-8 md:pl-10 group">
            
            {/* Timeline node marker badge */}
            <div className={`absolute -left-4 top-1.5 w-8 h-8 rounded-xl ${exp.logoBg} flex items-center justify-center text-white shadow-md ring-4 ring-white dark:ring-zinc-950 z-10 group-hover:scale-110 transition-transform duration-200`}>
              <Terminal size={14} />
            </div>

            {/* Exp header */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {exp.position}
                  </h3>
                  <p className="text-xs font-mono font-medium text-blue-500 dark:text-blue-400 mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold text-zinc-650 dark:text-zinc-400 select-none">
                  {exp.duration}
                </span>
              </div>

              {/* Descriptions & Achievements Bullet lists */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
                
                {/* Visual statistics badge card summary of achievement */}
                <div className="md:col-span-1 p-4 rounded-xl border border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 block font-semibold">
                      // Node Metrics Tracker
                    </span>
                    <h5 className="font-sans font-bold text-xs text-zinc-800 dark:text-zinc-200">
                      Core Operations Delivs
                    </h5>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed font-sans">
                      Responsible for deploying container structures, resolving architectural blockages, and writing pristine code reviews.
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-blue-500 font-bold bg-blue-500/5 dark:bg-blue-950/20 px-2 py-1.5 rounded-lg border border-blue-500/10">
                    <Sparkles size={11} />
                    <span>DELIVERY RECORD OPTIMAL</span>
                  </div>
                </div>

                {/* Bullets lists detail */}
                <div className="md:col-span-2 space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 block font-semibold">
                    // Key Project Objectives
                  </span>
                  <ul className="space-y-2.5 pl-1">
                    {exp.description.map((bullet, index) => (
                      <li key={index} className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                        <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
