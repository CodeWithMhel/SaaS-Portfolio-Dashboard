/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Heart, X, Sparkles, AlertCircle, Check, CreditCard, Gift } from 'lucide-react';
import { playClickSound } from '../utils/audioFeedback';

interface BuyMeCoffeeProps {
  theme?: 'light' | 'dark';
}

export default function BuyMeCoffee({ theme = 'dark' }: BuyMeCoffeeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<1 | 3 | 5>(3);
  const [customMsg, setCustomMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpen = () => {
    playClickSound();
    setIsOpen(true);
    setIsSuccess(false);
    setCustomMsg('');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    playClickSound();
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setIsSubmitting(true);

    // Simulate standard fast sandboxed payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      playClickSound();
    }, 1500);
  };

  return (
    <>
      {/* Animated Floating Trigger Button using motion */}
      <motion.button
        id="buy-me-coffee-trigger"
        onClick={handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="fixed bottom-6 left-6 md:left-72 z-40 px-4.5 py-3 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border border-zinc-800 dark:border-zinc-200 shadow-2xl flex items-center gap-2.5 cursor-pointer font-sans text-xs font-bold transition-shadow hover:shadow-amber-500/10 dark:hover:shadow-amber-400/25 select-none"
        title="Support my development craft!"
      >
        <Coffee size={15} className="text-amber-500 dark:text-amber-650 animate-bounce" />
        <span>Buy me a coffee</span>
        <span className="flex items-center gap-0.5 text-[9px] font-mono bg-amber-500/20 text-amber-500 dark:text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
          <Heart size={8} className="fill-current text-current" /> SUPPORT
        </span>
      </motion.button>

      {/* Elegant Mock Coffee Donation Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[160] flex items-center justify-center p-4">
            
            {/* Backdrop close overlay click helper */}
            <div className="absolute inset-0 cursor-default" onClick={handleClose} />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 22 }}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative z-10 text-left cursor-default select-none"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-900 pb-3">
                <div className="flex items-center gap-2">
                  <Coffee size={16} className="text-amber-500" />
                  <h3 className="font-bold text-sm text-zinc-950 dark:text-white font-sans">
                    Support Romel's Dev Craft
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {isSuccess ? (
                /* Success Handshake Screen */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-550 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <Check size={26} className="animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500 font-extrabold block">TRANSACTION_SUCCESSFUL</span>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-base">Thanks for the {selectedTier} coffee{selectedTier > 1 ? 's' : ''}! ☕</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[280px] mx-auto leading-relaxed">
                      Your support fuels the continuous operation, telemetry monitoring, and code workspaces inside this Headquarters.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-900 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-mono text-[11px] font-bold rounded-xl transition cursor-pointer"
                  >
                    DISMISS TELEMETRY
                  </button>
                </motion.div>
              ) : (
                /* Interactive Form Screen */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed font-sans">
                      Romel is a full-stack engineer and automation logic builder. Fuel code consistency, deep project sandbox testing, and cloud server uptime:
                    </p>
                  </div>

                  {/* Coffee Cup Tier Selection */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {([1, 3, 5] as const).map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => {
                          playClickSound();
                          setSelectedTier(tier);
                        }}
                        className={`
                          p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col justify-between h-[82px]
                          ${selectedTier === tier
                            ? 'bg-amber-500/5 dark:bg-amber-500/5 border-amber-500 text-amber-550 dark:text-amber-400 font-bold shadow-md shadow-amber-500/5'
                            : 'bg-zinc-50/50 dark:bg-zinc-900/10 border-zinc-200 dark:border-zinc-850 text-zinc-650 dark:text-zinc-450 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                          }
                        `}
                      >
                        <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-zinc-400 block">
                          {tier === 1 ? 'Single' : tier === 3 ? 'Classic' : 'Elite'}
                        </span>
                        <div className="flex items-center justify-center gap-0.5 text-lg my-1.5">
                          {Array.from({ length: Math.min(tier, 3) }).map((_, i) => (
                            <span key={i}>☕</span>
                          ))}
                          {tier > 3 && <span className="text-xs font-bold text-amber-500">+2</span>}
                        </div>
                        <span className="text-xs font-mono font-bold block bg-zinc-100 dark:bg-zinc-950/60 px-1.5 py-0.5 rounded">
                          ${tier * 5}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Message Input Box */}
                  <div className="space-y-1.5">
                    <label className="text-[9.5px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold block">
                      SUPPORT TRANSMISSION MESSAGE (OPTIONAL)
                    </label>
                    <textarea
                      placeholder="Write Romel a short message..."
                      value={customMsg}
                      onChange={(e) => setCustomMsg(e.target.value)}
                      maxLength={140}
                      className="w-full text-xs p-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 rounded-xl text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40 h-16 resize-none font-sans"
                    />
                  </div>

                  {/* Operational Security Gate Alert Info */}
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-850 rounded-xl flex items-start gap-2 text-[10px] font-mono text-zinc-400">
                    <AlertCircle size={12} className="text-blue-500 mt-0.5 shrink-0" />
                    <p className="leading-normal">
                      Secured integration via standard Stripe/PayPal sandboxes. Feel free to execute a test deposit!
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-mono text-xs font-bold rounded-xl transition shadow flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"></span>
                        <span>PROCESSING_HANDSHAKE...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={12} />
                        <span>SEND SUPPORT TRANSMISSION (${selectedTier * 5})</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
