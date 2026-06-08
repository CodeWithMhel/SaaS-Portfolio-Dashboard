/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Milestone, Lightbulb, Compass, Globe, ShieldAlert } from 'lucide-react';

export default function MissionSection() {
  return (
    <section 
      id="mission-section"
      className="p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/10 space-y-8"
    >
      {/* Title */}
      <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Sparkles size={20} className="text-blue-500" />
          The Manifesto: Personal Mission, Vision, & Goals
        </h2>
        <p className="text-xs text-zinc-550 dark:text-zinc-500">
          Core values driving structural development, technical alignment, and long-term tech projections.
        </p>
      </div>

      {/* Storytelling Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Core Mission */}
        <div className="p-6 rounded-2xl border border-zinc-200/65 dark:border-zinc-850/80 bg-zinc-50/50 dark:bg-zinc-900/20 space-y-4 hover:border-blue-500/20 transition duration-200 group flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 w-fit shrink-0 group-hover:bg-blue-500 group-hover:text-white transition">
              <Compass size={18} />
            </div>
            <h3 className="font-bold text-sm text-zinc-850 dark:text-zinc-150">
              The Mission Command
            </h3>
            <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
              To dismantle operational barriers by engineering high-performance, developer-first autonomous agent networks. I construct visual systems that are not just elegant wrappers, but stable, low-friction assets that execute complex developer cycles with zero manual fatigue.
            </p>
          </div>
          <span className="font-mono text-[9px] text-zinc-400">// STRATEGY_DRIVE_A</span>
        </div>

        {/* AI & Tech Vision */}
        <div className="p-6 rounded-2xl border border-zinc-200/65 dark:border-zinc-850/80 bg-zinc-50/50 dark:bg-zinc-900/20 space-y-4 hover:border-blue-500/20 transition duration-200 group flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 w-fit shrink-0 group-hover:bg-violet-500 group-hover:text-white transition">
              <Globe size={18} />
            </div>
            <h3 className="font-bold text-sm text-zinc-850 dark:text-zinc-150">
              Synthesized Vision
            </h3>
            <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
              I envision an integrated workspace where AI agents are native infrastructure contributors—routinely running syntax linters, resolving webhook bottlenecks, and aggregating telemetry. The future is browser-side visual dashboards driving edge-computing loops seamlessly.
            </p>
          </div>
          <span className="font-mono text-[9px] text-zinc-400">// STRATEGY_DRIVE_B</span>
        </div>

        {/* Long-Term Goals */}
        <div className="p-6 rounded-2xl border border-zinc-200/65 dark:border-zinc-850/80 bg-zinc-50/50 dark:bg-zinc-900/20 space-y-4 hover:border-blue-500/20 transition duration-200 group flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition">
              <Milestone size={18} />
            </div>
            <h3 className="font-bold text-sm text-zinc-850 dark:text-zinc-150">
              Operational Milestones
            </h3>
            <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
              Over the next 18 months, my goal is to open-source two foundational NPM packages for client-side semantic caches, expand the <strong>AetherOps</strong> developer community to 10k stars, and consulted 50 startups on optimizing structural LLM router spend.
            </p>
          </div>
          <span className="font-mono text-[9px] text-zinc-400">// STRATEGY_DRIVE_C</span>
        </div>

      </div>

      {/* Quote Banner */}
      <div className="p-6 rounded-2xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
        <div className="space-y-1 relative z-10">
          <p className="text-sm font-semibold italic">
            "The finest interfaces don't show the machine; they reveal the solution."
          </p>
          <p className="text-[10px] uppercase font-mono text-blue-400 tracking-wider">
            — LEO STERLING, SYSTEM_MAN_PRINCIPLE
          </p>
        </div>
        <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/25 rounded-md text-blue-400 font-mono text-[10px] select-none shrink-0 relative z-10">
          ALIGNED_SYS: TRUE
        </div>
      </div>

    </section>
  );
}
