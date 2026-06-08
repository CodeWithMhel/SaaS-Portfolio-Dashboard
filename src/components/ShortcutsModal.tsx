/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Keyboard, Command, CornerDownLeft, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audioFeedback';

interface ShortcutsModalProps {
  theme?: 'light' | 'dark';
}

export default function ShortcutsModal({ theme = 'dark' }: ShortcutsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl && 
        (activeEl.tagName === 'INPUT' || 
         activeEl.tagName === 'TEXTAREA' || 
         (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      // Check if '?' is pressed (Shift + / produces '?')
      if (e.key === '?') {
        e.preventDefault();
        playClickSound();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    playClickSound();
    setIsOpen(false);
  };

  const shortcuts = [
    { keys: ['?'], description: 'Show / hide shortcuts directory panel', badge: 'Global' },
    { keys: ['Ctrl', 'K'], description: 'Toggle command search palette console', badge: 'Command' },
    { keys: ['Esc'], description: 'Dismiss active overlays, dialogs, and modals', badge: 'Control' },
  ];

  return (
    <>
      {/* Small subtle visual hint in the corner or footer */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            playClickSound();
            setIsOpen(true);
          }}
          className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95"
          title="Keyboard Shortcuts Guide (Press '?')"
        >
          <Keyboard size={15} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[180] flex items-center justify-center p-4">
            
            {/* Backdrop helper to dismiss */}
            <div className="absolute inset-0 cursor-default" onClick={handleClose} />

            {/* Main Modal body */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl relative z-10 text-left select-none"
            >
              <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-900 pb-3">
                <div className="flex items-center gap-2">
                  <Keyboard size={16} className="text-blue-500 animate-pulse" />
                  <h3 className="font-bold text-sm text-zinc-950 dark:text-white font-sans">
                    Command Keybind Map
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1 text-zinc-455 hover:text-zinc-650 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-3.5">
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans leading-normal">
                  Execute quick viewport jumps, interface search bars, and state overlays utilizing zero-latency key signals.
                </p>

                {/* Shortcuts List */}
                <div className="space-y-2.5">
                  {shortcuts.map((shortcut, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-850"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold text-zinc-800 dark:text-zinc-200 block">
                          {shortcut.description}
                        </span>
                        <span className="font-mono text-[8px] bg-zinc-150/70 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 px-1 py-0.2 rounded uppercase tracking-wider font-extrabold scale-90 origin-left inline-block">
                          {shortcut.badge}
                        </span>
                      </div>

                      {/* Display of Keys */}
                      <div className="flex items-center gap-1 shrink-0">
                        {shortcut.keys.map((k, kIdx) => (
                          <React.Fragment key={kIdx}>
                            {kIdx > 0 && <span className="text-[10px] text-zinc-400 font-mono">+</span>}
                            <kbd className="px-2 py-1 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 border border-zinc-250 dark:border-zinc-800 rounded-lg shadow-sm font-mono text-[10px] font-extrabold min-w-[20px] text-center">
                              {k}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Operational Footer line */}
              <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-[9px] font-mono text-zinc-400 dark:text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={9} className="text-amber-500" />
                  <span>HQ TELEMETRY KEY DIRECTORY</span>
                </div>
                <span>ESC TO DISMISS</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
