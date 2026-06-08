/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Flame, GitCommit, Sparkles, Terminal } from 'lucide-react';

interface CommitBlock {
  date: string;
  count: number;
  category: 'ai' | 'web' | 'automation';
}

export default function CommitHeatmap() {
  const [selectedFeed, setSelectedFeed] = useState<'all' | 'ai' | 'web'>('all');
  const [hoveredBlock, setHoveredBlock] = useState<CommitBlock | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  // Let's generate seed data for 15 weeks (105 days total) representing a realistic sequence
  // leading up to the current date: 2026-06-08
  const baseDate = new Date('2026-02-24');
  
  const generateData = (): CommitBlock[] => {
    const list: CommitBlock[] = [];
    for (let i = 0; i < 105; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      
      // Seed consistent commit density with weekend spikes and focus periods
      const dayOfWeek = d.getDay();
      let factor = (i % 7 === 0 || i % 13 === 0) ? 0 : 1; 
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        factor = 1.6; // High weekend focus
      }
      
      // Random generation weighted by index trends
      const count = Math.floor(Math.max(0, (Math.sin(i / 5) * 4 + 3) * factor));
      
      // Distribute core categories
      let category: 'ai' | 'web' | 'automation' = 'web';
      if (i % 3 === 0) category = 'ai';
      else if (i % 5 === 0) category = 'automation';

      list.push({
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        count,
        category
      });
    }
    return list;
  };

  const blocks = generateData();

  // Filter based on selected feed
  const filteredBlocks = blocks.map(b => {
    if (selectedFeed === 'all') return b;
    if (selectedFeed === 'ai' && b.category === 'ai') return b;
    if (selectedFeed === 'web' && b.category === 'web') return b;
    // Return mock zero block for visual representation of specific category activity
    return { ...b, count: 0 };
  });

  // Calculate sum of activity
  const totalContributions = filteredBlocks.reduce((acc, curr) => acc + curr.count, 0);
  const activeDays = filteredBlocks.filter(b => b.count > 0).length;
  const maxDayCount = Math.max(...filteredBlocks.map(b => b.count));

  // Determine standard GitHub-style color grade class
  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/20 dark:border-zinc-800/20';
    if (count <= 2) return 'bg-emerald-250 dark:bg-emerald-950/40 border border-emerald-500/10 text-emerald-100';
    if (count <= 4) return 'bg-emerald-400/40 dark:bg-emerald-800/40 border border-emerald-500/20 text-emerald-200';
    if (count <= 6) return 'bg-emerald-500/70 dark:bg-emerald-600/60 border border-emerald-500/30 text-emerald-200';
    return 'bg-emerald-600 dark:bg-emerald-400 border border-emerald-500/50 text-white';
  };

  // Group into columns of 7 weeks
  const weeks: CommitBlock[][] = [];
  for (let i = 0; i < filteredBlocks.length; i += 7) {
    weeks.push(filteredBlocks.slice(i, i + 7));
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const parentRect = e.currentTarget.getBoundingClientRect();
    // Position tooltip nicely relative to the grid container
    setHoverPos({
      x: e.clientX - parentRect.left + 15,
      y: e.clientY - parentRect.top - 40
    });
  };

  return (
    <div className="p-6 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/20 space-y-6 select-none relative">
      {/* Heatmap header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-150 dark:border-zinc-800/80 pb-4 gap-4">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <GitCommit size={17} className="text-emerald-500 animate-pulse" />
            GitHub-Style Activity Contribution Heatmap
          </h3>
          <p className="text-xs text-zinc-550 dark:text-zinc-450">
            Real-time visualization of development velocity and repository check-ins.
          </p>
        </div>

        {/* Dynamic Category Activity Toggles */}
        <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-lg shrink-0">
          <button
            onClick={() => setSelectedFeed('all')}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase font-semibold rounded-md transition-all cursor-pointer ${selectedFeed === 'all' ? 'bg-white dark:bg-zinc-950 text-emerald-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            All Tracks
          </button>
          <button
            onClick={() => setSelectedFeed('ai')}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase font-semibold rounded-md transition-all cursor-pointer ${selectedFeed === 'ai' ? 'bg-white dark:bg-zinc-950 text-emerald-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            <span className="flex items-center gap-1">
              <Sparkles size={8} /> AI Core
            </span>
          </button>
          <button
            onClick={() => setSelectedFeed('web')}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase font-semibold rounded-md transition-all cursor-pointer ${selectedFeed === 'web' ? 'bg-white dark:bg-zinc-950 text-emerald-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            <span className="flex items-center gap-1">
              <Terminal size={8} /> Web Apps
            </span>
          </button>
        </div>
      </div>

      {/* Grid view containing tooltip coordinates parent */}
      <div 
        className="relative overflow-x-auto pb-2 focus:outline-none"
        onMouseMove={handleMouseMove}
      >
        <div className="flex items-start gap-4 min-w-[500px] justify-between">
          
          {/* Calendar Heatmap Grid */}
          <div className="flex-1 flex gap-1.5">
            {/* Days Column Labels */}
            <div className="flex flex-col justify-between text-[9px] font-mono text-zinc-400 dark:text-zinc-650 h-[106px] pt-1 shrink-0 select-none">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Weeks Columns */}
            <div className="flex-1 flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((block, dayIdx) => (
                    <div
                      key={dayIdx}
                      className={`
                        w-3.5 h-3.5 rounded-[3px] cursor-crosshair transition-all duration-150
                        ${getColorClass(block.count)}
                        hover:scale-125 hover:z-20 hover:shadow-md hover:shadow-emerald-500/20
                      `}
                      onMouseEnter={() => setHoveredBlock(block)}
                      onMouseLeave={() => setHoveredBlock(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Operational Health Panel Side metrics */}
          <div className="w-48 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-850 rounded-2xl flex flex-col justify-between shrink-0 h-[118px] md:h-auto">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-550 block uppercase tracking-widest font-bold">TELEMETRY_LOGS</span>
              <span className="text-xl font-extrabold text-zinc-900 dark:text-white block font-mono">
                {totalContributions} total
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-450 block">
                Contributions checked in
              </span>
            </div>
            
            <div className="flex items-center gap-1 mt-2 md:mt-4">
              <span className="flex items-center gap-1 font-mono text-[9px] bg-orange-500/10 text-orange-500 px-1.5 py-0.5 rounded font-bold uppercase animate-pulse">
                <Flame size={9} /> {activeDays} Days Active
              </span>
              <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-650">
                Streak: 28d
              </span>
            </div>
          </div>

        </div>

        {/* Dynamic Canvas-relative Floating Tooltip Node */}
        {hoveredBlock && (
          <div 
            style={{ left: hoverPos.x, top: hoverPos.y }}
            className="absolute z-30 bg-zinc-950 border border-zinc-800 text-white p-2.5 rounded-xl shadow-xl space-y-1 pointer-events-none text-left w-48 text-[10px] font-mono animate-fadeIn"
          >
            <div className="flex justify-between items-center text-zinc-400 text-[8.5px] border-b border-zinc-850 pb-1 mb-1">
              <span>CONTRIBUTION_EVENT</span>
              <span className="text-emerald-400 font-bold">OK</span>
            </div>
            <p className="text-white font-sans font-semibold">
              {hoveredBlock.count === 0 ? 'No contributions' : `${hoveredBlock.count} contributions`}
            </p>
            <p className="text-zinc-500 text-[9px]">
              {hoveredBlock.date}
            </p>
            {hoveredBlock.count > 0 && (
              <span className="inline-block mt-1 font-mono text-[8px] px-1.5 py-0.2 bg-zinc-900 border border-zinc-800 rounded uppercase font-semibold text-emerald-400 tracking-wide text-center">
                track: {hoveredBlock.category}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer color index legend */}
      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        <div>
          <span>Recent timeline span: Feb 2026 - Jun 2026 (Operational period)</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/20" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-250 dark:bg-emerald-950" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-400/40 dark:bg-emerald-800/40" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-500/70 dark:bg-emerald-600/60" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-600 dark:bg-emerald-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
