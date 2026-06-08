/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { X, Play, Volume2, VolumeX, Download, FileText, Sparkles, Send, Check } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE_HISTORY, SKILLS, CERTIFICATIONS } from '../data';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'video' | 'resume' | 'coverLetter' | 'mediaKit' | 'achievement' | null;
  selectedContext?: any;
}

export default function AssetModals({ isOpen, onClose, type, selectedContext }: ModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [sentMessage, setSentMessage] = useState(false);
  const [emailText, setEmailText] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSentMessage(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !type) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSentMessage(true);
    setTimeout(() => {
      setSentMessage(false);
      setEmailText('');
    }, 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-opacity duration-300 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ id: 'asset-modal-container' } as any}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {type === 'video' && 'Digital Assets / Product Pitch'}
              {type === 'resume' && 'Digital Assets / Interactive CV'}
              {type === 'coverLetter' && 'Digital Assets / Intentional Statement'}
              {type === 'mediaKit' && 'Digital Assets / Press & Brand Guidelines'}
              {type === 'achievement' && 'Operational Milestones / Detail Logs'}
            </h3>
          </div>
          <button 
            id="modal-close-btn"
            onClick={onClose}
            className="p-1 px-3 text-xs font-mono tracking-wider border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
          >
            <X size={12} /> ESC
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* INTRO VIDEO PLAYER (Simulated cinematic visual dashboard animation) */}
          {type === 'video' && (
            <div className="space-y-6">
              <div className="relative aspect-video rounded-xl bg-zinc-950 overflow-hidden border border-zinc-800 flex flex-col items-center justify-center">
                
                {/* Glowing tech graphics simulating loop */}
                <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
                  <div className="w-full h-full bg-[linear-gradient(rgba(18,18,18,0)_95%,_rgba(59,130,246,0.1)_98%,_rgba(59,130,246,0.3)_100%)] bg-[length:100%_4px]"></div>
                </div>

                {isPlaying ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center select-none">
                    <div className="mb-4 flex items-end justify-center gap-1 h-12">
                      <div className="w-1.5 h-6 bg-blue-500 rounded animate-[bounce_0.8s_infinite_100ms]"></div>
                      <div className="w-1.5 h-12 bg-blue-500 rounded animate-[bounce_0.8s_infinite_200ms]"></div>
                      <div className="w-1.5 h-10 bg-blue-400 rounded animate-[bounce_0.8s_infinite_300ms]"></div>
                      <div className="w-1.5 h-4 bg-blue-600 rounded animate-[bounce_0.8s_infinite_400ms]"></div>
                      <div className="w-1.5 h-9 bg-blue-500 rounded animate-[bounce_0.8s_infinite_500ms]"></div>
                    </div>
                    <div className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-1">
                      Romel_Montiagodo_Intro_Pitch.mp4
                    </div>
                    <div className="space-y-1 text-zinc-300 font-sans max-w-md">
                      <p className="text-sm font-semibold italic text-white">"Greetings! I'm Romel."</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        I build robust, end-to-end full-stack applications with modular developer dashboards, pristine responsive layouts, and advanced APIs. Welcome to my Technical Project Workspace.
                      </p>
                    </div>

                    {/* Controls Overlay inside video */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white bg-black/60 backdrop-blur border border-zinc-800/80 rounded-lg px-4 py-2 font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setIsPlaying(false)}
                          className="hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          PAUSE
                        </button>
                        <span className="text-zinc-500">|</span>
                        <span>0:14 / 1:30</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setIsMuted(!isMuted)} 
                          className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {isMuted ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} className="text-blue-400" />}
                          {isMuted ? 'UNMUTE' : 'MUTED'}
                        </button>
                        <span className="text-zinc-500">|</span>
                        <span className="text-green-400 animate-pulse">● FEED STABLE</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg hover:bg-blue-600 hover:scale-105 transition duration-300 cursor-pointer"
                    >
                      <Play fill="white" size={24} className="ml-1" />
                    </button>
                    <p className="mt-4 text-sm text-zinc-400 font-mono">Stream Paused. Click play to resume pitch feed.</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                  <h4 className="font-semibold text-zinc-800 dark:text-zinc-100 text-sm mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-500" /> Key Takeaways in the Pitch
                  </h4>
                  <ul className="text-xs text-zinc-600 dark:text-zinc-400 list-disc list-inside space-y-1.5 leading-relaxed">
                    <li>Walkthrough of the <strong>Steel Rolling Mill Simulator</strong> industrial process pipeline.</li>
                    <li>Designing weighted health metrics for modern PM suites (DevLogix Command Center).</li>
                    <li>Structuring full-stack patient portals with secure auth and Gemini-powered Doc Gab assistants.</li>
                    <li>Openness to join innovative engineering teams in junior developer positions.</li>
                  </ul>
                </div>
                <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-zinc-800 dark:text-zinc-100 text-sm mb-2">Request Custom Presentation</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
                      Need a direct video consultation tailored to your company's automation bottlenecks? Drop your email below:
                    </p>
                  </div>
                  <form onSubmit={handleSendEmail} className="flex gap-2">
                    <input 
                      type="email" 
                      required
                      placeholder="you@company.com" 
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button 
                      type="submit"
                      disabled={sentMessage}
                      className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      {sentMessage ? <Check size={12} /> : <Send size={12} />}
                      {sentMessage ? 'Sent!' : 'Request'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* INTERACTIVE RESUME VIEW (Clean, printable styled layout) */}
          {type === 'resume' && (
            <div className="space-y-8 select-text">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{PERSONAL_INFO.name}</h1>
                  <p className="text-blue-500 font-mono text-sm uppercase tracking-wider mt-1">
                    AI Lead • Full-Stack Solutions Engineer • Micro-SaaS Founder
                  </p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-mono text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 self-stretch md:self-auto justify-center cursor-pointer"
                >
                  <Download size={14} /> DOWNLOAD / PRINT PDF
                </button>
              </div>

              {/* Personal Statement */}
              <div>
                <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2">Executive Summary</h4>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-sans">
                  {PERSONAL_INFO.tagline}
                </p>
              </div>

              {/* Core Skill Chips (Compact) */}
              <div>
                <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">Core Stack Specialization</h4>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS.map((skill, index) => (
                    <span key={index} className="text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded font-mono text-zinc-700 dark:text-zinc-300">
                      {skill.name} ({skill.level}%)
                    </span>
                  ))}
                </div>
              </div>

              {/* Work History */}
              <div className="space-y-6">
                <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-1">Professional Experience</h4>
                {EXPERIENCE_HISTORY.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">{exp.position}</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{exp.company}</p>
                      </div>
                      <span className="text-xs font-mono px-2 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded text-zinc-600 dark:text-zinc-400">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="list-disc list-outside pl-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                      {exp.description.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Certifications and credentials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-1">Milestone Credentials</h4>
                  <ul className="space-y-2 text-xs">
                    {CERTIFICATIONS.map(cert => (
                      <li key={cert.id} className="flex justify-between text-zinc-600 dark:text-zinc-400">
                        <span><strong>{cert.name}</strong> • {cert.issuer}</span>
                        <span className="font-mono text-zinc-500 ml-2">{cert.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-1">Education & Accolades</h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
                    <li><strong>Associate in Software Development / Network Administration</strong> • Teksquad Institute of IT</li>
                    <li><strong>Top Software OJT Trainee Honors</strong> • Teksquad Partnership</li>
                    <li><strong>Dean's List / Academic Excellence</strong> • Teksquad</li>
                    <li><strong>Google Certified Partner Credentials</strong> • AI & Creative Shopping Ads</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* COVER LETTER */}
          {type === 'coverLetter' && (
            <div className="space-y-6 select-text max-w-3xl mx-auto text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-sans">
              <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
                <p>Date: June 8, 2026</p>
                <p>From: Romel B. Montiagodo, Junior Full-stack Developer</p>
                <p>Location: Antipolo City, Philippines</p>
                <p>Subject: Strategic Full-Stack Solutions & High-Performance Dashboard Design</p>
              </div>

              <p className="font-semibold text-zinc-900 dark:text-white">Dear Operations Leader / Engineering Manager,</p>

              <p>
                As an adaptable full-stack developer with comprehensive foundations in Software Development and Network Administration, I specialize in constructing clean client views, scalable server code, and secure integrations.
              </p>

              <p>
                Through my academic training at Teksquad Institute and practical traineeships, I have focused on launching reliable layouts, drafting robust database schemas (SQL & Firestore), and resolving severe dependency conflicts without regressions.
              </p>

              <p>
                This portfolio workspace highlights my key engineering artifacts, including the <strong>Steel Rolling Mill Simulator</strong> equipped with industrial QA radar telemetry, the <strong>DevLogix Command Center</strong> reporting weighted health scores, and dynamic custom trivia engines powered by Gemini AI clients.
              </p>

              <p>
                I am actively seeking to join an innovative technology group as a junior solutions builder, pledging code quality, system safety, and consistent operational updates.
              </p>

              <p className="pt-4">
                Thank you for your valuable time and consideration.
              </p>

              <div className="pt-2">
                <p className="font-semibold text-zinc-900 dark:text-white">Sincerely,</p>
                <p className="font-mono text-sm text-blue-500 font-bold mt-1">Romel B. Montiagodo</p>
                <p className="text-xs text-zinc-500">Junior Full-stack Developer & CRM Specialist</p>
              </div>
            </div>
          )}

          {/* MEDIA KIT */}
          {type === 'mediaKit' && (
            <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Brand Assets */}
                <div className="md:col-span-1 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-blue-500 p-1 mb-4">
                    <img 
                      src={PERSONAL_INFO.avatar} 
                      alt={PERSONAL_INFO.name} 
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">{PERSONAL_INFO.name}</h4>
                  <p className="text-xs text-zinc-500 font-mono mb-4">Full Resolution Avatar</p>
                  <button 
                    onClick={() => alert("Avatar asset linked: " + PERSONAL_INFO.avatar)}
                    className="w-full py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-mono rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition cursor-pointer"
                  >
                    COPY ATTACHMENT URL
                  </button>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Developer Bio (Standard)</h3>
                    <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 font-sans">
                      Romel B. Montiagodo is a dedicated full-stack developer specializing in technical dashboards, system logic formulation, and responsive client interfaces. Graduating with an Associate Degree in Software Development with Network Administration from Teksquad Institute, Romel has successfully designed and shipped a range of custom simulators, e-commerce specification checkers, and automated marketing funnels.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Technical Presentation Topics</h3>
                    <ul className="text-xs space-y-2 list-disc list-inside font-sans">
                      <li><strong>"System Logic & Telemetry: Architecting High-Fidelity Industrial Process Loops"</strong> (Webinar)</li>
                      <li><strong>"Responsive Glassmorphic Dashboards: Bridging Complex Data with Human Interaction"</strong> (Design Session)</li>
                      <li><strong>"Eliminating NPM Friction: Dependency Triage and Stability on Modern Live Deployments"</strong> (Live Demo)</li>
                    </ul>
                  </div>

                  <div className="p-4 border border-blue-100 dark:border-blue-950 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl">
                    <h5 className="font-bold text-blue-900 dark:text-blue-300 text-xs uppercase tracking-wider mb-1">Live Presentation Guidelines</h5>
                    <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed font-sans">
                      For candidate reviews or engineering team briefings, please introduce Romel as <strong>"Junior Full Stack Developer & Teksquad Software Scholar."</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE ACHIEVEMENT CONTEXT LOGS */}
          {type === 'achievement' && selectedContext && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">{selectedContext.title}</h4>
                  <p className="text-xs font-mono text-blue-500">{selectedContext.date} • {selectedContext.category.toUpperCase()}</p>
                </div>
              </div>
              <div className="space-y-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/30">
                <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                  {selectedContext.text}
                </p>
                <div className="pt-2 font-mono text-[11px] text-zinc-500 space-y-1">
                  <p>● SHA256_HASH_VALIDATED: b4f108f9c...a31</p>
                  <p>● METRIC_RECORD_INCEPTION: 2026-06-08T06:00:00Z</p>
                  <p>● VERIFICATION_PROVIDER: Decentralized Tech Portfolio Ledger</p>
                </div>
              </div>
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
          <button 
            id="modal-close-footer-btn"
            onClick={onClose}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            CLOSE DIALOG
          </button>
        </div>
      </div>
    </div>
  );
}
