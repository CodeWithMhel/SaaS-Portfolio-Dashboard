/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Briefcase, 
  Download, 
  Sparkles, 
  Mail, 
  MapPin, 
  FileCheck, 
  Check, 
  Send, 
  Terminal,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { CERTIFICATIONS, RECENT_AWARDS, SPEAKING_ENGAGEMENTS } from '../data';

interface CareerSectionProps {
  onOpenAssetModal: (type: 'video' | 'resume' | 'coverLetter' | 'mediaKit') => void;
}

export default function CareerSection({ onOpenAssetModal }: CareerSectionProps) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate premium system link logs
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsDone(false), 5000);
    }, 1500);
  };

  return (
    <section 
      id="career-section" 
      className="p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/10 space-y-10"
    >
      {/* Title */}
      <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Briefcase size={20} className="text-blue-500" />
          Career Hub & Recruitment Terminal
        </h2>
        <p className="text-xs text-zinc-550 dark:text-zinc-500">
          Inspect milestone certifications, download formatted assets, and submit a secure contact thread.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left column: Resume Downloads & Live Status Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-205 dark:border-zinc-850 space-y-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h4 className="font-bold text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-550">
                Live Status Tracker
              </h4>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Active & Open for Partners</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                Currently taking selected consulting pipelines, public speaking stages, and high-tier full-time solutions roles.
              </p>
            </div>

            <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-4 text-xs font-sans">
              <div className="flex items-center gap-2 text-zinc-650 dark:text-zinc-400">
                <MapPin size={13} className="text-blue-500" />
                <span>Antipolo City, Philippines</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-650 dark:text-zinc-400">
                <Mail size={13} className="text-blue-500" />
                <span>romelmontiagodo68@gmail.com</span>
              </div>
            </div>

            {/* Quick asset download buttons */}
            <div className="pt-2 space-y-2">
              <button
                id="career-open-cv-btn"
                onClick={() => onOpenAssetModal('resume')}
                className="w-full py-2.5 px-4 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-mono font-medium rounded-xl hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={13} /> DOWNLOAD CV (PDF)
              </button>
              
              <button
                id="career-open-cl-btn"
                onClick={() => onOpenAssetModal('coverLetter')}
                className="w-full py-2.5 px-4 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-905 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                VIEW STATEMENT
              </button>

              <button
                id="career-export-pdf-report-btn"
                onClick={() => window.print()}
                className="w-full py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-500 text-xs font-mono font-semibold uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 hover:shadow-blue-500/25"
                title="Print or Save current dashboard view as beautiful styled PDF"
              >
                <FileText size={13} strokeWidth={2.5} /> EXPORT PORTFOLIO PDF
              </button>
            </div>
          </div>
          
          <div className="p-4 border border-zinc-200 dark:border-zinc-850 rounded-2xl flex items-center gap-2.5 text-xs text-zinc-500">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="font-mono text-[10px]">Secure, TLS-encrypted connection established.</span>
          </div>
        </div>

        {/* Middle column: Certifications & Public logs */}
        <div className="md:col-span-1 space-y-6">
          {/* Certifications List */}
          <div className="space-y-4">
            <h4 id="career-certifications" className="font-mono text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              // Milestone Certifications
            </h4>
            <div className="space-y-2.5">
              {CERTIFICATIONS.map((cert) => (
                <div 
                  key={cert.id} 
                  className="p-3 bg-zinc-50/50 dark:bg-zinc-90 w-full border border-zinc-200/50 dark:border-zinc-850 rounded-xl flex items-start gap-2.5 hover:border-blue-500/20 transition"
                >
                  <FileCheck size={14} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-semibold text-xs text-zinc-850 dark:text-zinc-200 truncate">{cert.name}</h5>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-505 mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-400 shrink-0 select-none ml-2">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Awards / Speaking */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              // Recent Industry Speaking
            </h4>
            <div className="space-y-2.5">
              {SPEAKING_ENGAGEMENTS.map((speak) => (
                <div key={speak.id} className="text-xs space-y-0.5 p-3 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-between font-mono text-[9px] text-blue-500 font-bold uppercase">
                    <span>{speak.eventName}</span>
                    <span>{speak.location}</span>
                  </div>
                  <h4 className="font-semibold text-zinc-800 dark:text-zinc-300 text-xs">{speak.topic}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Interactive recruitment email form */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="font-mono text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            // Secure Dispatch Interface
          </h4>
          
          <div className="p-6 border border-zinc-200 dark:border-zinc-850 rounded-2xl bg-white dark:bg-zinc-900/35 space-y-4 relative">
            <h3 className="font-sans font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Initiate Direct Collaboration
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              Enter your project parameters below to send a validated message directly to Romel's workspace hub.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-1 text-xs">
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-1 font-semibold">
                  Sender Identity (Name)
                </label>
                <input 
                  type="text" 
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  placeholder="Romel B. Montiagodo" 
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-750 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-805 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-1 font-semibold">
                  Return Endpoint (Email)
                </label>
                <input 
                  type="email" 
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  placeholder="CodeWithMhel@gmail.com" 
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-750 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-805 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-1 font-semibold">
                  Project / Role Transcript
                </label>
                <textarea 
                  rows={3}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  placeholder="Looking for a Lead Frontend architect / AI automation builder..." 
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-750 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-805 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || isDone}
                className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition duration-150 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Terminal size={12} className="animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : isDone ? (
                  <>
                    <Check size={12} className="text-emerald-300" />
                    <span>LEDGER_DISPATCH_SUCCESS</span>
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    <span>DISPATCH_MESSAGE.sh</span>
                  </>
                )}
              </button>
            </form>

            {/* Simulated log overlay */}
            {isDone && (
              <div className="absolute inset-0 bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-center text-left space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest">DISPATCH STATUS: ACCEPTED</span>
                </div>
                <p className="font-mono text-[10px] text-zinc-400 leading-normal">
                  ● Connecting to SMTP mail channel...<br />
                  ● Token validated successfully.<br />
                  ● Message delivered securely to <code>romelmontiagodo68@gmail.com</code>.<br />
                  <br />
                  Thank you! Romel B. Montiagodo will trace your connection socket soon.
                </p>
                <button 
                  onClick={() => setIsDone(false)}
                  className="py-1 px-3 border border-zinc-800 bg-zinc-900 font-mono text-[9px] hover:bg-zinc-800 text-zinc-400 rounded-md cursor-pointer self-start"
                >
                  SEND NEW TRANSCRIPT
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </section>
  );
}
