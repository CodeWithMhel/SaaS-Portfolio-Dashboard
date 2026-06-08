/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  Users, 
  FolderGit2, 
  Briefcase, 
  Video, 
  ArrowUpRight, 
  CheckCircle2, 
  ExternalLink,
  Github,
  Star,
  Flame,
  Rocket,
  Mic,
  Award,
  Terminal,
  Activity,
  UserPlus
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  KPIS, 
  TRAFFIC_DATA, 
  SOCIAL_GROWTH_DATA, 
  PORTFOLIO_VIEWS_DATA, 
  PROJECTS, 
  TIMELINE_EVENTS 
} from '../data';
import CommitHeatmap from './CommitHeatmap';
import { TRANSLATIONS, LanguageType } from '../utils/i18n';

interface DashboardHomeProps {
  onScrollToElement: (id: string) => void;
  onOpenAssetModal: (type: 'video' | 'resume' | 'coverLetter' | 'mediaKit') => void;
  theme: 'light' | 'dark';
  lang?: LanguageType;
}

export default function DashboardHome({ onScrollToElement, onOpenAssetModal, theme, lang = 'en' }: DashboardHomeProps) {
  // Chart tab state
  const [activeChartTab, setActiveChartTab] = useState<'traffic' | 'social' | 'portfolio'>('traffic');
  
  // Geolocation & Time of day greeting telemetry state setup
  const [geoData, setGeoData] = useState<{ lat?: number; lon?: number; error?: string; timezone: string }>({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  });

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoData(prev => ({
            ...prev,
            lat: parseFloat(position.coords.latitude.toFixed(4)),
            lon: parseFloat(position.coords.longitude.toFixed(4))
          }));
        },
        (err) => {
          setGeoData(prev => ({
            ...prev,
            error: err.code === 1 ? 'Permission Denied' : 'Unavailable'
          }));
        }
      );
    } else {
      setGeoData(prev => ({ ...prev, error: 'Not Supported' }));
    }
  }, []);

  // Compute Greeting base index on local hour of day
  const currentHour = new Date().getHours();
  let greetEnglish = "Good Day";
  let greetFilipino = "Magandang Araw";
  
  if (currentHour >= 5 && currentHour < 12) {
    greetEnglish = "Good Morning";
    greetFilipino = "Magandang Umaga";
  } else if (currentHour >= 12 && currentHour < 17) {
    greetEnglish = "Good Afternoon";
    greetFilipino = "Magandang Hapon";
  } else if (currentHour >= 17 && currentHour < 22) {
    greetEnglish = "Good Evening";
    greetFilipino = "Magandang Gabi";
  } else {
    greetEnglish = "Good Night";
    greetFilipino = "Magandang Gabi";
  }

  // Confetti triggering telemetry status state
  const [lastConfettiTime, setLastConfettiTime] = useState<number>(0);

  const handleTriggerMilestoneConfetti = (e: React.MouseEvent, type: 'click' | 'hover') => {
    const now = Date.now();
    if (type === 'hover' && now - lastConfettiTime < 1300) {
      return;
    }
    setLastConfettiTime(now);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || (rect.left + rect.width / 2);
    const y = e.clientY || (rect.top + rect.height / 2);
    
    // Play celebratory haptic audio chime node
    if (type === 'click') {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
          osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.12); // B5
          gain.gain.setValueAtTime(0.015, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        }
      } catch (err) {
        // Safe bypass
      }
    }

    const event = new CustomEvent('trigger-confetti', {
      detail: { x, y }
    });
    window.dispatchEvent(event);
  };

  const dict = TRANSLATIONS[lang];
  
  // Featured projects
  const featuredProjects = PROJECTS.filter(p => p.featured);

  // Recharts text colors based on themes
  const axisColor = theme === 'dark' ? '#71717a' : '#a1a1aa';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f4f4f5';
  const tooltipBg = theme === 'dark' ? '#0E0E10' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#e4e4e7';

  return (
    <div className="space-y-12">
      
      {/* 1. PROFILE BANNER HERO (Minimalist Premium Glassmorphic Overlay) */}
      <section 
        id="dashboard-hero"
        className="relative rounded-3xl overflow-hidden border border-zinc-200/65 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6 md:p-10"
      >
        {/* Futuristic Grid / Tech Wave Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute -right-1/4 -top-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute left-10 bottom-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-2xl"></div>
        </div>

        <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start z-10">
          
            {/* Avatar frame */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl group">
              <img 
                src={PERSONAL_INFO.avatar} 
                alt={PERSONAL_INFO.name} 
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Pulsing state badge */}
            <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-500 text-white dark:text-zinc-950 font-mono text-[9px] font-bold rounded-full border-2 border-white dark:border-zinc-950 shadow-md animate-pulse">
              {dict.active_dev}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left space-y-3.5">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                {dict.system_access}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {PERSONAL_INFO.name}
              </h1>
            </div>

            {/* Title Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {PERSONAL_INFO.titles.map((title, i) => {
                const displayTitle = lang === 'fil' && title.includes('Junior') 
                  ? "Junior Full-Stack na Tagabuo" 
                  : (lang === 'fil' && title.includes('Strategy') ? "Espesyalista sa UI/UX at Diskarte" : title);
                return (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 text-[11px] font-semibold tracking-wider font-mono uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 rounded"
                  >
                    {displayTitle}
                  </span>
                );
              })}
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-350 max-w-xl leading-relaxed">
              {lang === 'fil' ? dict.bio_intro : PERSONAL_INFO.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <button
                id="hero-view-portfolio-btn"
                onClick={() => onScrollToElement('portfolio-section')}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold font-sans tracking-wide transition shadow-md shadow-blue-500/10 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{dict.view_workspace}</span>
                <ArrowUpRight size={14} />
              </button>
              
              <button
                id="hero-contact-btn"
                onClick={() => onScrollToElement('career-section')}
                className="px-5 py-2.5 border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-150 rounded-xl text-xs font-semibold font-sans tracking-wide hover:bg-zinc-50 dark:hover:bg-zinc-850 transition cursor-pointer"
              >
                {dict.connect_me}
              </button>

              <button
                id="hero-video-pitch-btn"
                onClick={() => onOpenAssetModal('video')}
                className="px-5 py-2.5 border border-dashed border-blue-300 dark:border-blue-900/80 bg-blue-500/5 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-mono tracking-wider hover:bg-blue-500/10 dark:hover:bg-blue-950/40 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Terminal size={12} strokeWidth={2.5} />
                <span>Play_Demo.sh</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DASHBOARD HOME WRAPPER & WELCOME CARD */}
      <section className="space-y-6">
        
        {/* Welcome Card Section */}
        <div className="p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Flame size={18} className="text-orange-500" />
              <span>{lang === 'fil' ? greetFilipino : greetEnglish}, Visitor!</span>
            </h2>
            <p className="text-xs text-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
              {lang === 'fil'
                ? `Maligayang pagdating sa aking Digital na Headquarters. Operational mula sa zone na ${geoData.timezone}.`
                : `Welcome to my Digital Headquarters. Running live telemetry synchronized with your timezone: ${geoData.timezone}.`
              }
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 font-mono text-[9px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>GEOLOCATION:</span>
              <span className="text-blue-500 font-bold shrink-0">
                {geoData.lat && geoData.lon ? `${geoData.lat}° N, ${geoData.lon}° E` : geoData.error ? `GPS_${geoData.error.toUpperCase()}` : 'RESOLVING_GPS...'}
              </span>
            </div>
            <div className="text-[8px] text-zinc-400 uppercase tracking-widest shrink-0 font-semibold mt-0.5">
              ZONE: {geoData.timezone}
            </div>
          </div>
        </div>

        {/* 3. KPI CARDS (Four beautiful metric nodes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS.map((kpi) => {
            let label = kpi.label;
            let value = kpi.value;
            let change = kpi.change;

            if (lang === 'fil') {
              if (kpi.id === 'followers') label = dict.audience_reach;
              if (kpi.id === 'projects') {
                label = dict.finished_modules;
                value = value.replace('Shipped Modules', 'Naihatid na Modulo');
                change = change.replace('this Q', dict.this_q);
              }
              if (kpi.id === 'clients') label = dict.system_status;
              if (kpi.id === 'videos') label = dict.platform_ingress;
            }

            return (
              <div 
                key={kpi.id} 
                className="p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/30 hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all duration-200 group relative overflow-hidden"
              >
                <div className="absolute right-3 top-3 opacity-10 font-mono text-[5rem] translate-y-2 select-none select-all text-zinc-500 pointer-events-none font-bold">
                  {kpi.id === 'followers' && 'A'}
                  {kpi.id === 'projects' && 'P'}
                  {kpi.id === 'clients' && 'C'}
                  {kpi.id === 'videos' && 'V'}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider">
                    {label}
                  </span>
                  <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-250/30 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-blue-500/10 group-hover:text-blue-500 dark:group-hover:text-blue-400 dark:group-hover:bg-blue-950/20 transition-colors">
                    {kpi.id === 'followers' && <Users size={15} />}
                    {kpi.id === 'projects' && <FolderGit2 size={15} />}
                    {kpi.id === 'clients' && <Briefcase size={15} />}
                    {kpi.id === 'videos' && <Video size={15} />}
                  </div>
                </div>

                <div className="space-y-1 relative z-10">
                  <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {value}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <span className="text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">
                      {change}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-550">{kpi.id === 'followers' && lang === 'fil' ? 'kumpara nakaraan' : dict.vs_last_month}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Git Commit Activities Heatmap Widget */}
        <CommitHeatmap />

        {/* 4. ANALYTICS DIAGRAM SECTION */}
        <div className="p-6 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/20 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-150 dark:border-zinc-800/80 pb-4 gap-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Activity size={16} className="text-blue-500" />
                Operational Telemetry & Traffic Logs
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-450">
                Performance indicators tracked via serverless telemetry caches.
              </p>
            </div>

            {/* Menu controls for chart switches */}
            <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <button
                onClick={() => setActiveChartTab('traffic')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${activeChartTab === 'traffic' ? 'bg-white dark:bg-zinc-950 text-blue-500 shadow-sm font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
              >
                Traffic
              </button>
              <button
                onClick={() => setActiveChartTab('social')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${activeChartTab === 'social' ? 'bg-white dark:bg-zinc-950 text-blue-500 shadow-sm font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}
              >
                Social Networks
              </button>
              <button
                onClick={() => setActiveChartTab('portfolio')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${activeChartTab === 'portfolio' ? 'bg-white dark:bg-zinc-950 text-blue-500 shadow-sm font-semibold' : 'text-zinc-650 dark:text-zinc-400 hover:text-zinc-900'}`}
              >
                Portfolio Views
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeChartTab === 'traffic' ? (
                <AreaChart data={TRAFFIC_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="month" stroke={axisColor} style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  <YAxis stroke={axisColor} style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }} 
                    labelStyle={{ fontWeight: 'bold', fontSize: '11px', color: theme === 'dark' ? '#f4f4f5' : '#18181b' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', fontClassName: 'font-sans' }} />
                  <Area name="Unique Web Visitors" type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
                  <Area name="Dynamic Page Views" type="monotone" dataKey="pageViews" stroke="#6366f1" strokeWidth={1.5} fillOpacity={1} fill="url(#colorPageviews)" strokeDasharray="4 4" />
                </AreaChart>
              ) : activeChartTab === 'social' ? (
                <LineChart data={SOCIAL_GROWTH_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="month" stroke={axisColor} style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  <YAxis stroke={axisColor} style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }}
                    labelStyle={{ fontWeight: 'bold', fontSize: '11px', color: theme === 'dark' ? '#f4f4f5' : '#18181b' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line name="YouTube Subscriptions" type="monotone" dataKey="youtube" stroke="#ef4444" strokeWidth={2.5} activeDot={{ r: 6 }} />
                  <Line name="LinkedIn Connections" type="monotone" dataKey="linkedin" stroke="#0a66c2" strokeWidth={2.5} />
                </LineChart>
              ) : (
                <BarChart data={PORTFOLIO_VIEWS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="week" stroke={axisColor} style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  <YAxis stroke={axisColor} style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }}
                    labelStyle={{ fontWeight: 'bold', fontSize: '11px', color: theme === 'dark' ? '#f4f4f5' : '#18181b' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar name="AI Agents" dataKey="aiProjects" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar name="SaaS Apps" dataKey="webApps" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar name="Webhooks / Integrations" dataKey="automations" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. FEATURED PROJECTS WORKSPACE */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Terminal size={16} className="text-blue-500" />
                Featured Shipped Modules
              </h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-450">
                Pristine open source packages and cloud applications.
              </p>
            </div>
            <button 
              id="dash-view-all-projects-btn"
              onClick={() => onScrollToElement('portfolio-section')}
              className="text-xs font-mono text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              View_All_Work.io <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                className="flex flex-col bg-white dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-850 rounded-2xl overflow-hidden hover:shadow-lg dark:hover:shadow-zinc-950/50 hover:-translate-y-1 transition duration-200 group"
              >
                {/* Thumbnail Image */}
                <div className="relative h-44 bg-zinc-100 dark:bg-zinc-950 overflow-hidden shrink-0 border-b border-zinc-100 dark:border-zinc-900">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur rounded font-mono text-[9px] uppercase font-bold text-blue-400">
                    {project.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-zinc-850 dark:text-zinc-100 line-clamp-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Skills tags and Actions */}
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-400">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 py-1.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-center font-mono text-[10px] font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition flex items-center justify-center gap-1"
                        >
                          <span>Live Demo</span> <ExternalLink size={10} />
                        </a>
                      )}
                      
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
                          title="Open Github repository"
                        >
                          <Github size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. ACTIVITY TIMELINE LEDGER */}
        <div id="dashboard-timeline" className="p-6 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/20 space-y-6">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-500" />
              Recent Achievements & Operations Timeline
            </h3>
            <p className="text-xs text-zinc-550 dark:text-zinc-450">
              Live chronological logs mapping shipped code platforms and milestone credentials.
            </p>
          </div>

          <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 space-y-8 py-2">
            {TIMELINE_EVENTS.map((event) => {
              const isHighImpact = event.category === 'achievement' || event.icon === 'Award';
              return (
                <div 
                  key={event.id} 
                  className={`relative pl-7 group transition-all duration-200 rounded-xl p-2 -m-2 ${
                    isHighImpact 
                      ? 'hover:bg-blue-500/[0.03] dark:hover:bg-blue-400/[0.03] cursor-pointer' 
                      : ''
                  }`}
                  onClick={(e) => {
                    if (isHighImpact) {
                      handleTriggerMilestoneConfetti(e, 'click');
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (isHighImpact) {
                      handleTriggerMilestoneConfetti(e, 'hover');
                    }
                  }}
                  title={isHighImpact ? "Milestone Unlocked! Click or Hover to celebrate!" : undefined}
                >
                  {/* Node icons */}
                  <div className="absolute -left-3.5 top-3.5 w-7 h-7 rounded-full bg-white dark:bg-zinc-950 border-2 border-blue-500 flex items-center justify-center text-blue-500 shadow-sm z-10 transition-transform group-hover:scale-110">
                    {event.icon === 'Rocket' && <Rocket size={12} />}
                    {event.icon === 'Mic' && <Mic size={12} />}
                    {event.icon === 'Award' && <Award size={12} className={isHighImpact ? 'animate-pulse text-amber-550' : 'text-blue-500'} />}
                    {event.icon === 'Briefcase' && <Briefcase size={12} />}
                  </div>
   
                  <div className="space-y-1.5 pl-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        {event.title}
                        {isHighImpact && (
                          <span className="text-[10px] font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded">
                            AWARD
                          </span>
                        )}
                      </h4>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 border border-zinc-200/50 dark:border-zinc-800 rounded">
                        {event.date}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-2xl">
                      {event.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
}
