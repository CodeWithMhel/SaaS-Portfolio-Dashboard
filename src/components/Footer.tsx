/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Youtube, Facebook, Linkedin, Instagram, Smartphone, Mail, Globe, MapPin, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface FooterProps {
  onScrollToElement: (id: string) => void;
}

export default function Footer({ onScrollToElement }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-applet-footer"
      className="p-8 md:p-12 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 rounded-b-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1 Brand details */}
        <div className="space-y-4 md:col-span-1.5Col">
          <div className="flex items-center gap-2 select-none">
            <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold font-mono">
              S
            </div>
            <span className="font-sans font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
              CODE_WITH_MHEL_WORKSPACE
            </span>
          </div>
          <p className="text-xs text-zinc-505 dark:text-zinc-450 leading-relaxed font-sans">
            A premium full-stack portfolio constructed to simulate a personal operating system. Aligned with secure database ledgers and modular container nodes.
          </p>
          <div className="font-mono text-[10px] text-zinc-400 dark:text-zinc-505 uppercase">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </div>
        </div>

        {/* Col 2 Quick Navigation links */}
        <div className="space-y-3">
          <h5 className="font-mono text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
            Workspace Navigation
          </h5>
          <ul className="text-xs space-y-2 text-zinc-505 dark:text-zinc-450 font-sans">
            <li>
              <button 
                onClick={() => onScrollToElement('about-section')}
                className="hover:text-blue-500 cursor-pointer"
              >
                About Core System
              </button>
            </li>
            <li>
              <button 
                onClick={() => onScrollToElement('experience-section')}
                className="hover:text-blue-500 cursor-pointer"
              >
                Experience Grid
              </button>
            </li>
            <li>
              <button 
                onClick={() => onScrollToElement('portfolio-section')}
                className="hover:text-blue-500 cursor-pointer"
              >
                Portfolio Artifacts
              </button>
            </li>
            <li>
              <button 
                onClick={() => onScrollToElement('mission-section')}
                className="hover:text-blue-500 cursor-pointer"
              >
                The Manifesto Statement
              </button>
            </li>
            <li>
              <button 
                onClick={() => onScrollToElement('career-section')}
                className="hover:text-blue-500 cursor-pointer"
              >
                Active Careers & CV
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3 Connect Socials */}
        <div className="space-y-3">
          <h5 className="font-mono text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-555 tracking-wider">
            Connected Channels
          </h5>
          <div className="flex flex-wrap gap-2 pt-0.5">
            <a 
              href={PERSONAL_INFO.socials.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-red-500 text-zinc-500 hover:text-red-500 transition"
              title="YouTube channel link"
            >
              <Youtube size={14} />
            </a>
            <a 
              href={PERSONAL_INFO.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-blue-500 text-zinc-500 hover:text-blue-500 transition"
              title="LinkedIn profile link"
            >
              <Linkedin size={14} />
            </a>
            <a 
              href={PERSONAL_INFO.socials.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-blue-600 text-zinc-500 hover:text-blue-650 transition"
              title="Facebook profile link"
            >
              <Facebook size={14} />
            </a>
            <a 
              href={PERSONAL_INFO.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-pink-500 text-zinc-500 hover:text-pink-500 transition"
              title="Instagram feed link"
            >
              <Instagram size={14} />
            </a>
            <a 
              href={PERSONAL_INFO.socials.tiktok} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-black dark:hover:border-white text-zinc-500 dark:hover:text-white transition"
              title="TikTok feed link"
            >
              <Smartphone size={14} />
            </a>
          </div>
          <div className="text-[10px] text-zinc-400 dark:text-zinc-505 font-mono">
            // STATUS: CHANNELS CONNECTED
          </div>
        </div>

        {/* Col 4 Coordinate Details and Scroll Up */}
        <div className="space-y-3">
          <h5 className="font-mono text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
            Operational Location
          </h5>
          <div className="text-xs space-y-2 text-zinc-505 dark:text-zinc-450 leading-relaxed font-sans">
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-blue-500 shrink-0" />
              <span>Brgy San Jose, Antipolo City. Rizal. Philippines</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-blue-500 shrink-0" />
              <span>romelmontiagodo2@gmail.com</span>
            </div>
          </div>
          <button 
            id="scroll-to-top-btn"
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs font-mono text-zinc-500 hover:text-blue-500 dark:hover:text-blue-400 transition cursor-pointer"
          >
            <ArrowUp size={12} /> Return_To_Top.sh
          </button>
        </div>

      </div>
    </footer>
  );
}
